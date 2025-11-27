#!/usr/bin/env python3
import subprocess
import sys
from pathlib import Path


def stitch_two_vids(video1, video2, output_file="stitched_output.mp4"):
    """
    Stitch two videos together into a single video.
    
    Args:
        video1 (str): Path to the first video file
        video2 (str): Path to the second video file
        output_file (str): Path to the output video file (default: stitched_output.mp4)
    
    Returns:
        bool: True if stitching successful, False otherwise
    """
    video1_path = Path(video1)
    video2_path = Path(video2)
    output_path = Path(output_file)
    
    if not video1_path.exists():
        print(f"first video not found: {video1}")
        return False
    
    if not video2_path.exists():
        print(f"second video not found: {video2}")
        return False
    
    print(f"stitching {video1_path.name} + {video2_path.name} -> {output_path.name}")
    
    # Create a temporary file list for ffmpeg concat
    filelist_path = Path("filelist.txt")
    try:
        with open(filelist_path, "w") as f:
            f.write(f"file '{video1_path.absolute()}'\n")
            f.write(f"file '{video2_path.absolute()}'\n")
        
        command = [
            'ffmpeg',
            '-f', 'concat',
            '-safe', '0',
            '-i', str(filelist_path),
            '-c', 'copy',
            '-y',
            str(output_path)
        ]
        
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode == 0:
            print(f"done stitching -> {output_path}")
            return True
        else:
            print(f"failed to stitch videos")
            print(result.stderr)
            return False
            
    except FileNotFoundError:
        print("Error: ffmpeg not found. Please install ffmpeg:")
        print("  macOS: brew install ffmpeg")
        return False
    except Exception as e:
        print(f"Error during stitching: {e}")
        return False
    finally:
        if filelist_path.exists():
            filelist_path.unlink()


def overlay_two_vids(video1, video2, output_file="overlay_output.mp4"):
    """
    Overlay the second video on top of the first video.
    Useful when the second video has an alpha channel for transparency.
    
    Args:
        video1 (str): Path to the base video file
        video2 (str): Path to the overlay video file (on top)
        output_file (str): Path to the output video file (default: overlay_output.mp4)
    
    Returns:
        bool: True if overlay successful, False otherwise
    """
    video1_path = Path(video1)
    video2_path = Path(video2)
    output_path = Path(output_file)
    
    if not video1_path.exists():
        print(f"base video not found: {video1}")
        return False
    
    if not video2_path.exists():
        print(f"overlay video not found: {video2}")
        return False
    
    print(f"overlaying {video2_path.name} on top of {video1_path.name} -> {output_path.name}")
    
    command = [
        'ffmpeg',
        '-i', str(video1_path),
        '-i', str(video2_path),
        '-filter_complex', '[0:v][1:v]overlay=0:0',
        '-y',
        str(output_path)
    ]
    
    try:
        result = subprocess.run(
            command,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        
        if result.returncode == 0:
            print(f"done overlaying -> {output_path}")
            return True
        else:
            print(f"failed to overlay videos")
            print(result.stderr)
            return False
            
    except FileNotFoundError:
        print("Error: ffmpeg not found. Please install ffmpeg:")
        print("  macOS: brew install ffmpeg")
        return False
    except Exception as e:
        print(f"Error during overlay: {e}")
        return False


def main():
    if len(sys.argv) < 3:
        print("Video Stitcher & Overlay Tool")
        print("=" * 60)
        print("\nUsage:")
        print("  Stitch (concatenate):")
        print("    python3 stitch.py stitch <video1> <video2> [output.mp4]")
        print("\n  Overlay (put video2 on top of video1):")
        print("    python3 stitch.py overlay <video1> <video2> [output.mp4]")
        print("\nExamples:")
        print("  python3 stitch.py stitch intro.mp4 main.mp4 final.mp4")
        print("  python3 stitch.py overlay base.mp4 overlay.mp4 result.mp4")
        sys.exit(1)
    
    mode = sys.argv[1]
    
    if mode not in ['stitch', 'overlay']:
        print("Error: First argument must be 'stitch' or 'overlay'")
        sys.exit(1)
    
    if len(sys.argv) < 4:
        print("Error: Please provide two video files")
        sys.exit(1)
    
    video1 = sys.argv[2]
    video2 = sys.argv[3]
    output_file = sys.argv[4] if len(sys.argv) > 4 else f"{mode}_output.mp4"
    
    if mode == 'stitch':
        success = stitch_two_vids(video1, video2, output_file)
    else:
        success = overlay_two_vids(video1, video2, output_file)
    
    if not success:
        sys.exit(1)


if __name__ == "__main__":
    main()
