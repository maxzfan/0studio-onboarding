# Adari
UGC Content Generation Pipeline

A comprehensive toolkit for creating User Generated Content (UGC) style advertisements, from script generation to video production with AI-powered voices and effects.

---

## 🛠️ Tools

### 1. Script Generator (`script_generator.py`)
AI-powered advertisement script generator using Google's Gemini API.

**Features:**
- Generate authentic UGC-style ad scripts
- Customizable duration (default: 24 seconds)
- 3-section script structure optimized for natural speech
- Auto-generates website URLs or uses custom ones
- Saves scripts with timestamps

**Setup:**
```bash
# Create .env file
echo "GEMINI_API_KEY=your-gemini-api-key" > .env

# Install dependencies
pip install google-generativeai python-dotenv
```

**Usage:**
```bash
python3 script_generator.py
```

**Or use as module:**
```python
from script_generator import generate_ad_script

script = generate_ad_script(
    brand_name="Molli Health",
    website="mollihealth.com",
    duration_seconds=24
)
print(script)
```

---

### 2. Voice Cloning (`voice_clone.py`)
Create custom voice models using Fish Audio API for text-to-speech.

**Features:**
- Clone voices from audio samples (MP3)
- Fast training mode
- Batch processing for multiple creators
- Custom tags and descriptions

**Setup:**
```bash
# Set API key
export FISH_API_KEY='your-fish-audio-api-key'

# Place audio samples in creator-videos/
# Files should be named: creator_name_consent.mp3

# Install dependencies
pip install requests
```

**Usage:**
```bash
python3 voice_clone.py
```

**Configuration:**
Edit the `creators` list in `voice_clone.py`:
```python
creators = [
    {
        "title": "Your Name Clone",
        "description": "Voice clone description",
        "file_path": CREATOR_VIDEOS_DIR / "your_audio.mp3",
        "tags": "tag1,tag2",
    },
]
```

---

### 3. MP4 to MP3 Converter (`mp4_mp3_converter.py`)
Extract audio from video files using ffmpeg.

**Features:**
- Single file or batch conversion
- Customizable audio bitrate
- Preserves original filenames
- Supports MP4 and M4V formats

**Setup:**
```bash
# Install ffmpeg
brew install ffmpeg  # macOS
```

**Usage:**
```bash
# Single file
python3 mp4_mp3_converter.py video.mp4 192k

# Batch convert directory
python3 mp4_mp3_converter.py --batch creator-videos 192k
```

**Bitrate options:** `128k`, `192k` (default), `256k`, `320k`

---

### 4. DoP Video Generator (`dop_api.py`)
Generate dynamic videos from static images using Higgsfield AI's DoP (Diffusion of Policies) API.

**Features:**
- Image to video conversion (5-second videos)
- AI-powered motion effects
- Custom prompt-based generation
- Motion template library
- Automatic status polling and download

**Setup:**
```bash
# Get API credentials from cloud.higgsfield.ai
export HIGGSFIELD_API_KEY='your-api-key'
export HIGGSFIELD_API_SECRET='your-api-secret'

# Install dependencies
pip install requests
```

**Usage:**
```bash
# Basic generation
python3 dop_api.py 'https://example.com/image.jpg' 'Camera zooming in' output.mp4

# With motion template
python3 dop_api.py 'image.jpg' 'Cinematic pan' video.mp4 motion-id-here

# List available motions
python3 dop_api.py --list-motions
```

**Python API:**
```python
from dop_api import DoPVideoGenerator

generator = DoPVideoGenerator(api_key, api_secret)
video_path = generator.generate_and_download(
    image_url="image.jpg",
    prompt="Gentle camera movement",
    output_path="output.mp4"
)
```

---

## 📋 Complete UGC Workflow

### Step 1: Generate Script
```bash
# Edit script_generator.py to set your brand
python3 script_generator.py
# Output: generated_scripts/Brand_Name_ad_script_timestamp.txt
```

### Step 2: Extract Audio (if needed)
```bash
# Convert creator video to audio
python3 mp4_mp3_converter.py creator_video.mp4
```

### Step 3: Clone Voice
```bash
# Create voice model from audio sample
python3 voice_clone.py
```

### Step 4: Generate Video
```bash
# Create animated video from static image
python3 dop_api.py 'product_image.jpg' 'Camera slowly zooming in on product' final_video.mp4
```

---

## 📁 Project Structure

```
Adari/
├── script_generator.py      # AI script generation
├── voice_clone.py           # Voice cloning with Fish Audio
├── mp4_mp3_converter.py     # Audio extraction from video
├── dop_api.py              # Video generation with DoP
├── requirements.txt         # Python dependencies
├── .env                    # Environment variables (create this)
├── creator-videos/         # Audio/video samples
├── generated_scripts/      # Generated ad scripts
└── output/                 # Generated videos
```

---

## 🔧 Requirements

### System
- Python 3.8+
- ffmpeg (for MP4 conversion)

### Python Packages
```bash
pip install -r requirements.txt
```

### API Keys
- **Gemini API**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Fish Audio API**: Get from [Fish Audio](https://fish.audio)
- **Higgsfield API**: Get from [Higgsfield Cloud](https://cloud.higgsfield.ai)

---

## 📝 Environment Setup

Create a `.env` file:
```bash
GEMINI_API_KEY=your-gemini-api-key
FISH_API_KEY=your-fish-audio-api-key
HIGGSFIELD_API_KEY=your-higgsfield-api-key
HIGGSFIELD_API_SECRET=your-higgsfield-api-secret
```

---

## 💡 Tips

- **Scripts**: Gemini generates natural, conversational UGC-style scripts
- **Voice samples**: Use clear audio samples (30-60 seconds) for best cloning results
- **Image quality**: Use high-resolution images (1024x1024+) for DoP video generation
- **Motion effects**: Browse Higgsfield's motion library for professional camera movements
- **Batch processing**: Process multiple files efficiently with batch modes

---

## 📄 License

MIT
