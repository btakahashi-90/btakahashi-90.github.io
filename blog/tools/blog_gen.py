#!/usr/bin/env python3

# full imports
import argparse
import sys
# partial imports
from pathlib import Path
from datetime import date

def get_text(file_path):    
    try:
        return file_path.read_text()
    except FileNotFoundError:
        print(f"Not sure how you got here. Path should have caught this issue ahead of time...but congrats on being statistically improbable.")
        return ""

def main():
    # CLI Setup
    parser = argparse.ArgumentParser(
        prog="Blog generator from a tempalte (pre-defined stuffs)",
        usage="--day (actually just a post #, not really a day. Consider changing). --title (like 'Devlog Day X - [some random bs text]).",
        description="Will swap pre-defined text blocks (in the input text) with argument defined text.",
        epilog="I'm poopen",
    )

    parser.add_argument("--day", help="post number, not really day. ಠ_ಠ", default="x")
    parser.add_argument("--title", help="Devlog Day X - [you know what you did...]", default="TITLE HERE PLZ")
    args = parser.parse_args()


    # Read the file in, if it is indeed a file
    file_path = Path("template")
    if not file_path.is_file():
        raise FileNotFoundError(f"You dun goofed, {file_path} is not a file or DNE")
    else:
        text = get_text(file_path)

    today = date.today().strftime("%B %d, %Y")
    text = text.replace("[day]", args.day)
    text = text.replace("[title]", args.title)
    text = text.replace("[date]", today)
    with open("blog_post", "w") as file:
        file.write(text)

if __name__ == "__main__":
    main()
