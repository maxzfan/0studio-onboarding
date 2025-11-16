#!/usr/bin/env python3
import subprocess
import os
import sys
from pathlib import Path


def convert_mp4_to_mp3(input_file, bitrate="192k"):
    """
    Convert MP4 file to MP3 by extracting audio
    
    Args:
        input_file (str): Path to input MP4 file
        bitrate (str): Audio bitrate (default: 192k)
    
    Returns:
        bool: True if conversion successful, False otherwise
    """
    input_path = Path(input_file)
    
    if not input_path.exists():
        print(f"input file not found :(")
        return False
    
    if input_path.suffix.lower() not in ['.mp4', '.m4v']:
        print(f"wrong input file format :(")
    
    output_file = input_path.with_suffix('.mp3')
    
    command = [
        'ffmpeg',
        '-i', str(input_path),
        '-vn',  # No video
        '-acodec', 'libmp3lame',  # MP3 codec
        '-b:a', bitrate,  # Audio bitrate
        '-y',  # Overwrite output file if exists
        str(output_file)
    ]
    
    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode == 0:
            print(f"done converting {input_path.name}")
            return True
        else:
            print(f"failed to convert {input_path.name}")
            print(result.stderr)
            return False
            
    except FileNotFoundError:
        print("Error: ffmpeg not found. Please install ffmpeg:")
        print("  macOS: brew install ffmpeg")
        return False
    except Exception as e:
        print(f"Error during conversion: {e}")
        return False


def batch_convert(input_dir, bitrate="192k"):
    """
    Convert all MP4 files in a directory to MP3
    
    Args:
        input_dir (str): Directory containing MP4 files
        bitrate (str): Audio bitrate (default: 192k)
    """
    input_path = Path(input_dir)
    
    if not input_path.exists() or not input_path.is_dir():
        print(f"input directory not found :(")
        return
    
    output_path = input_path
    mp4_files = list(input_path.glob('*.mp4')) + list(input_path.glob('*.MP4'))
    
    if not mp4_files:
        return
    
    print(f"converting {len(mp4_files)} file(s)")
    
    success_count = 0
    for mp4_file in mp4_files:
        output_file = output_path / f"{mp4_file.stem}.mp3"
        if convert_mp4_to_mp3(mp4_file, bitrate):
            success_count += 1
        print()
    
    print("done converting all files")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 mp4_mp3_converter.py --batch <directory>")
        sys.exit(1)
    
    if sys.argv[1] == '--batch':
        if len(sys.argv) < 3:
            print("Error: Please provide input directory")
            sys.exit(1)
        
        input_dir = sys.argv[2]
        bitrate = sys.argv[3] if len(sys.argv) > 3 else "192k"
        batch_convert(input_dir, bitrate=bitrate)
    else:
        input_file = sys.argv[1]
        bitrate = sys.argv[2] if len(sys.argv) > 2 else "192k"
        convert_mp4_to_mp3(input_file, bitrate)


if __name__ == "__main__":
    main()
