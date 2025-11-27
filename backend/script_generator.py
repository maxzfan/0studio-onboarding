import os
from pathlib import Path
from datetime import datetime
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
REPO_ROOT = Path(__file__).resolve().parent
load_dotenv(REPO_ROOT / ".env")

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OUTPUT_DIR = REPO_ROOT / "generated_scripts"

if not GEMINI_API_KEY:
    raise EnvironmentError("GEMINI_API_KEY is not set. Please set it in your .env file.")

genai.configure(api_key=GEMINI_API_KEY)


def generate_ad_script(brand_name: str, website: str = None, duration_seconds: int = 24) -> str:
    """
    Generate an advertisement script for a given brand using Gemini API.
    
    Args:
        brand_name: The brand to create an advertisement for
        website: The website URL to mention at the end (optional, will be auto-generated if not provided)
        duration_seconds: Target duration of the ad in seconds (default: 24)
    
    Returns:
        A formatted advertisement script
    """
    
    # Auto-generate website if not provided
    if not website:
        # Convert brand name to website format (e.g., "Molli Health" -> "mollihealth.com")
        website = brand_name.lower().replace(' ', '') + '.com'
    
    # Create the model (using the updated model name)
    model = genai.GenerativeModel('gemini-2.0-flash-exp')
    
    # Craft a detailed prompt for generating the ad script
    prompt = f"""Create a {duration_seconds}-second UGC (User Generated Content) style advertisement script for {brand_name}.

Requirements:
- Write in a casual, authentic, conversational tone as if a real person is talking to their friend
- The script should be exactly timed for {duration_seconds} seconds when read at a natural speaking pace (approximately 150 words per minute)
- Sound genuine and relatable, not overly polished or corporate
- Use first-person perspective ("I", "my")
- Include personal experience or discovery
- Keep it natural and unscripted-feeling
- Include a soft call-to-action that feels organic
- END with saying the website: "{website}"

Structure:
- Divide the script into exactly 3 sections
- Each section should be approximately 8 seconds of speaking time (about 20 words per section)
- Separate sections with a blank line
- Each section should flow naturally into the next
- The third/final section MUST end with the speaker saying "{website}"

IMPORTANT: Output ONLY the plain voiceover script text. No titles, no headers, no word counts, no formatting notes, no section labels, no numbering. Just the raw script divided into 3 paragraphs with blank lines between them.
"""
    
    print(f"Generating ad script for {brand_name}...")
    print("-" * 60)
    
    # Generate content
    response = model.generate_content(prompt)
    
    return response.text


def save_script_to_file(brand_name: str, script: str) -> Path:
    """
    Save the generated script to a text file.
    
    Args:
        brand_name: The brand name (used for filename)
        script: The generated script content
    
    Returns:
        Path to the saved file
    """
    # Create output directory if it doesn't exist
    OUTPUT_DIR.mkdir(exist_ok=True)
    
    # Create a safe filename
    safe_brand_name = "".join(c if c.isalnum() or c in (' ', '-', '_') else '_' for c in brand_name)
    safe_brand_name = safe_brand_name.replace(' ', '_')
    
    # Add timestamp to make filename unique
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = f"{safe_brand_name}_ad_script_{timestamp}.txt"
    
    file_path = OUTPUT_DIR / filename
    
    # Write the script to file (script only, no headers)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(script)
    
    return file_path


def main():
    """
    Main function to demonstrate ad script generation.
    """
    # Example usage - you can modify the brand name here or take it as input
    print("=== Advertisement Script Generator ===\n")
    
    # You can change this to take user input if desired
    # brand_name = input("Enter the brand name: ")
    
    # Example brands to demonstrate
    example_brands = ["Molli Health", "Nebius", "Plexus"]
    
    for brand in example_brands:
        script = generate_ad_script(brand, duration_seconds=24)
        
        # Save to file
        file_path = save_script_to_file(brand, script)
        
        # Print to console
        print(f"\n{'='*60}")
        print(f"AD SCRIPT FOR: {brand}")
        print(f"{'='*60}\n")
        print(script)
        print(f"\n✓ Saved to: {file_path}")
        print("="*60 + "\n")


if __name__ == "__main__":
    main()

