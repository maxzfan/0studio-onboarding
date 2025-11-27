#!/usr/bin/env python3
import os
import sys
import time
import requests
from pathlib import Path


class DoPVideoGenerator:
    def __init__(self, api_key, api_secret):
        self.api_key = api_key
        self.api_secret = api_secret
        self.base_url = "https://platform.higgsfield.ai/v1"
        self.headers = {
            "hf-api-key": api_key,
            "hf-secret": api_secret,
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    
    def get_motions(self):
        url = f"{self.base_url}/motions"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def generate_video(self, image_url, prompt, motion_id=None, motion_strength=0.5, 
                      model="dop-turbo", seed=None, enhance_prompt=True):
        url = f"{self.base_url}/image2video/dop"
        
        payload = {
            "params": {
                "model": model,
                "prompt": prompt,
                "input_images": [
                    {
                        "type": "image_url",
                        "image_url": image_url
                    }
                ],
                "enhance_prompt": enhance_prompt
            }
        }
        
        if motion_id:
            payload["params"]["motions"] = [
                {
                    "id": motion_id,
                    "strength": motion_strength
                }
            ]
        
        if seed is not None:
            payload["params"]["seed"] = seed
        
        print(f"Generating video from image: {image_url}")
        print(f"Prompt: {prompt}")
        if motion_id:
            print(f"Motion ID: {motion_id} (strength: {motion_strength})")
        
        response = requests.post(url, headers=self.headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        job_set_id = result.get("id")
        print(f"Job created: {job_set_id}")
        
        return job_set_id
    
    def get_job_status(self, job_set_id):
        url = f"{self.base_url}/job-sets/{job_set_id}"
        response = requests.get(url, headers=self.headers)
        response.raise_for_status()
        return response.json()
    
    def wait_for_completion(self, job_set_id, poll_interval=5, max_wait=300):
        print(f"\nPolling for results (max wait: {max_wait}s)...")
        start_time = time.time()
        
        while time.time() - start_time < max_wait:
            result = self.get_job_status(job_set_id)
            jobs = result.get("jobs", [])
            
            if not jobs:
                print("No jobs found")
                return None
            
            job = jobs[0]
            status = job.get("status")
            print(f"Status: {status}")
            
            if status == "completed":
                print("✓ Video generation complete!")
                return result
            elif status == "failed":
                print("✗ Video generation failed")
                return result
            
            time.sleep(poll_interval)
        
        print("✗ Timeout waiting for completion")
        return None
    
    def download_video(self, job_result, output_path="output.mp4"):
        jobs = job_result.get("jobs", [])
        if not jobs:
            print("No jobs in result")
            return None
        
        job = jobs[0]
        results = job.get("results", {})
        
        video_url = None
        if "raw" in results and results["raw"].get("url"):
            video_url = results["raw"]["url"]
        elif "min" in results and results["min"].get("url"):
            video_url = results["min"]["url"]
        
        if not video_url:
            print("No video URL found in results")
            return None
        
        print(f"\nDownloading video from: {video_url}")
        response = requests.get(video_url)
        response.raise_for_status()
        
        output_path = Path(output_path)
        output_path.parent.mkdir(parents=True, exist_ok=True)
        
        with open(output_path, "wb") as f:
            f.write(response.content)
        
        print(f"✓ Video saved to: {output_path}")
        return str(output_path)
    
    def generate_and_download(self, image_url, prompt, output_path="output.mp4", 
                             motion_id=None, motion_strength=0.5, **kwargs):
        job_set_id = self.generate_video(
            image_url=image_url,
            prompt=prompt,
            motion_id=motion_id,
            motion_strength=motion_strength,
            **kwargs
        )
        
        result = self.wait_for_completion(job_set_id)
        
        if result and result.get("jobs", [{}])[0].get("status") == "completed":
            return self.download_video(result, output_path)
        
        return None


def main():
    api_key = os.getenv("HIGGSFIELD_API_KEY")
    api_secret = os.getenv("HIGGSFIELD_API_SECRET")
    
    if not api_key or not api_secret:
        print("Error: Please set HIGGSFIELD_API_KEY and HIGGSFIELD_API_SECRET environment variables")
        print("\nExample:")
        print("  export HIGGSFIELD_API_KEY='your-api-key'")
        print("  export HIGGSFIELD_API_SECRET='your-api-secret'")
        sys.exit(1)
    
    generator = DoPVideoGenerator(api_key, api_secret)
    
    if len(sys.argv) < 3:
        print("DoP Video Generator")
        print("=" * 60)
        print("\nUsage:")
        print("  python3 dop_api.py <image_url> <prompt> [output.mp4] [motion_id]")
        print("\nExamples:")
        print("  python3 dop_api.py 'https://example.com/image.jpg' 'A sunset scene' output.mp4")
        print("  python3 dop_api.py 'image.jpg' 'Camera zooming in' video.mp4 motion-id-123")
        print("\nTo list available motions:")
        print("  python3 dop_api.py --list-motions")
        sys.exit(1)
    
    if sys.argv[1] == "--list-motions":
        print("Available Motions:")
        print("=" * 60)
        motions = generator.get_motions()
        for motion in motions:
            print(f"\nID: {motion.get('id')}")
            print(f"Name: {motion.get('name')}")
            print(f"Description: {motion.get('description', 'N/A')}")
            if motion.get('preview_url'):
                print(f"Preview: {motion.get('preview_url')}")
        sys.exit(0)
    
    image_url = sys.argv[1]
    prompt = sys.argv[2]
    output_path = sys.argv[3] if len(sys.argv) > 3 else "output.mp4"
    motion_id = sys.argv[4] if len(sys.argv) > 4 else None
    
    print("DoP Video Generator")
    print("=" * 60)
    
    generator = DoPVideoGenerator(api_key, api_secret)
    
    result_path = generator.generate_and_download(
        image_url=image_url,
        prompt=prompt,
        output_path=output_path,
        motion_id=motion_id
    )
    
    if result_path:
        print("\n" + "=" * 60)
        print(f"Success! Video saved to: {result_path}")
    else:
        print("\n" + "=" * 60)
        print("Failed to generate video")
        sys.exit(1)


if __name__ == "__main__":
    main()
