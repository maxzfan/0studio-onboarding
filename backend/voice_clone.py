import os
from pathlib import Path

import requests

FISH_API_KEY = os.getenv("FISH_API_KEY")
API_URL = "https://api.fish.audio/model"
HEADERS = {"Authorization": f"Bearer {FISH_API_KEY}"}
print(repr(FISH_API_KEY))
REPO_ROOT = Path(__file__).resolve().parent
CREATOR_VIDEOS_DIR = REPO_ROOT / "creator-videos"

creators = [
    {
        "title": "Christine Test Clone",
        "description": "Internal QA clone for Christine",
        "file_path": CREATOR_VIDEOS_DIR / "christine_consent.mp3",
        "tags": "test,christine",
    },
    {
        "title": "Kailey Test Clone",
        "description": "Internal QA clone for Kailey",
        "file_path": CREATOR_VIDEOS_DIR / "kailey_consent.mp3",
        "tags": "test,kailey",
    },
]

def create_voice_clone(creator):
    file_path = creator["file_path"]
    print(f"\n=== Starting clone for {creator['title']} ===")
    print(f"Using sample file: {file_path}")
    if not file_path.exists():
        raise FileNotFoundError(f"Sample file not found: {file_path}")

    files = {
        "voices": (
            os.path.basename(file_path),
            open(file_path, "rb"),
            "audio/mpeg",
        ),
    }
    payload = {
        "type": "tts",
        "title": creator["title"],
        "description": creator["description"],
        "train_mode": "fast",
        "visibility": "unlist",
        "enhance_audio_quality": False,
    }
    # Tags as separate form fields (multipart arrays)
    if creator.get("tags"):
        payload["tags"] = creator["tags"].split(",")
    print("Payload (sans file):", payload)
    try:
        response = requests.post(
            API_URL, data=payload, files=files, headers=HEADERS, timeout=60
        )
        print(f"API response status: {response.status_code}")
        print("Raw response text:", response.text)
        
        # Try to parse JSON regardless of status code
        try:
            json_data = response.json()
            print(f"{creator['title']} response JSON:", json_data)
        except ValueError:
            print("No JSON in response")
        
        response.raise_for_status()
    finally:
        files["voices"][1].close()

if not FISH_API_KEY:
    raise EnvironmentError("FISH_API_KEY is not set; cannot authenticate with Fish Audio.")

print(f"Found {len(creators)} creator(s) to clone.")
for creator in creators:
    create_voice_clone(creator)