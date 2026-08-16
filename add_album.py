#!/usr/bin/env python3
"""
add_album.py — Gaza Hope campaign photo album publisher
===========================================================

Takes a local folder of raw photos (e.g. 30 photos of one family's bed
delivery), compresses them automatically, generates a small cover
thumbnail for the gallery grid, and publishes the album to
activities.json — which the "الأنشطة والفيديوهات" page reads and
renders as a clickable album card + full-screen viewer.

Why compression matters
------------------------
Phone photos are often 3-8 MB each. 30 of them = 100+ MB, which would
make the activities page painfully slow to load. This script:
  1. Resizes + compresses every photo to a reasonable web size
     (max 1600px wide, ~80% JPEG quality) — usually 150-400 KB each.
  2. Generates ONE extra small cover thumbnail (max 500px wide, ~70%
     quality, usually under 50 KB) — this is the ONLY image the grid
     loads up front. The other photos only load one at a time, when a
     visitor actually opens the album and clicks through it.

Usage
-----
    python3 add_album.py \
        --folder "C:/Users/you/Desktop/family_ahmad_photos" \
        --title-ar "عائلة أحمد - تسليم سرير" \
        --title-en "The Ahmad Family - Bed Delivery" \
        --slug "ahmad-family"

--folder: path to a local folder containing ONLY the photos for this
album (jpg/jpeg/png). The script does not modify your originals — it
creates compressed copies inside this project's activities/ folder.

--slug: a short, URL-safe name for this album's folder (letters,
numbers, hyphens only). If you skip it, one is generated from the
Arabic/English title automatically.

List / delete
--------------
    python3 add_album.py --list
    python3 add_album.py --delete 2

Requirements
------------
    pip install Pillow
"""

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    Image = None

ACTIVITIES_FILE = Path(__file__).parent / "activities.json"
ACTIVITIES_DIR = Path(__file__).parent / "activities"

FULL_MAX_WIDTH = 1600
FULL_QUALITY = 80
COVER_MAX_WIDTH = 500
COVER_QUALITY = 70

VALID_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


def load_activities() -> dict:
    if ACTIVITIES_FILE.exists():
        with open(ACTIVITIES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"activities": []}


def save_activities(data: dict) -> None:
    tmp_path = ACTIVITIES_FILE.with_suffix(".json.tmp")
    with open(tmp_path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    tmp_path.replace(ACTIVITIES_FILE)


def slugify(text: str) -> str:
    # Keep it simple and safe for file paths / URLs
    text = re.sub(r"[^a-zA-Z0-9\- ]", "", text).strip().lower()
    text = re.sub(r"\s+", "-", text)
    return text or "album"


def compress_image(src_path: Path, dest_path: Path, max_width: int, quality: int) -> None:
    im = Image.open(src_path)
    im = im.convert("RGB")  # handles PNG/webp transparency -> flattens to white, avoids mode errors
    if im.width > max_width:
        new_height = int(im.height * (max_width / im.width))
        im = im.resize((max_width, new_height), Image.LANCZOS)
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest_path, quality=quality, optimize=True, progressive=True)


def main():
    parser = argparse.ArgumentParser(description="Publish a compressed photo album to activities.json")
    parser.add_argument("--folder", help="Local folder containing the raw photos for this album")
    parser.add_argument("--title-ar", help="Album title (Arabic)")
    parser.add_argument("--title-en", help="Album title (English)")
    parser.add_argument("--slug", help="Short URL-safe folder name for this album (auto-generated if omitted)")
    parser.add_argument("--list", action="store_true", help="List existing activities/albums and exit")
    parser.add_argument("--delete", type=int, metavar="INDEX", help="Delete the activity at this index (0-based, as shown by --list)")
    args = parser.parse_args()

    data = load_activities()

    if args.list:
        if not data["activities"]:
            print("لا توجد أنشطة بعد / No activities yet.")
            return
        for i, a in enumerate(data["activities"]):
            kind = {"video": "🎥", "photo": "📷", "album": "📁"}.get(a.get("type"), "?")
            extra = f" ({len(a.get('images', []))} photos)" if a.get("type") == "album" else ""
            print(f"[{i}] {kind} {a.get('date', '')[:10]} — {a.get('title_ar', '')}{extra}")
        return

    if args.delete is not None:
        try:
            removed = data["activities"].pop(args.delete)
            save_activities(data)
            print(f"[OK] Deleted: {removed.get('title_ar', '')}")
        except IndexError:
            print(f"[ERROR] No activity at index {args.delete}. Use --list to see valid indices.")
        return

    if not args.folder or not args.title_ar:
        parser.error("--folder and --title-ar are required (or use --list / --delete)")

    if Image is None:
        print("[ERROR] Pillow is required. Install it with: pip install Pillow", file=sys.stderr)
        sys.exit(1)

    src_folder = Path(args.folder)
    if not src_folder.is_dir():
        print(f"[ERROR] Folder not found: {src_folder}", file=sys.stderr)
        sys.exit(1)

    photos = sorted([p for p in src_folder.iterdir() if p.suffix.lower() in VALID_EXTENSIONS])
    if not photos:
        print(f"[ERROR] No jpg/jpeg/png/webp photos found in {src_folder}", file=sys.stderr)
        sys.exit(1)

    slug = args.slug or slugify(args.title_en or args.title_ar)
    album_dir = ACTIVITIES_DIR / slug

    print(f"Processing {len(photos)} photo(s) for album '{slug}'...")

    image_paths = []
    for i, photo in enumerate(photos, start=1):
        dest_name = f"img_{i:02d}.jpg"
        dest_path = album_dir / dest_name
        compress_image(photo, dest_path, FULL_MAX_WIDTH, FULL_QUALITY)
        rel_path = f"activities/{slug}/{dest_name}"
        image_paths.append(rel_path)
        print(f"  [{i}/{len(photos)}] {photo.name} -> {rel_path} ({dest_path.stat().st_size // 1024} KB)")

    # Cover thumbnail from the first photo
    cover_path = album_dir / "cover.jpg"
    compress_image(photos[0], cover_path, COVER_MAX_WIDTH, COVER_QUALITY)
    cover_rel = f"activities/{slug}/cover.jpg"
    print(f"  Cover thumbnail -> {cover_rel} ({cover_path.stat().st_size // 1024} KB)")

    new_album = {
        "date": datetime.now(timezone.utc).isoformat(),
        "type": "album",
        "title_ar": args.title_ar,
        "title_en": args.title_en or args.title_ar,
        "cover": cover_rel,
        "images": image_paths,
    }

    data["activities"].append(new_album)
    save_activities(data)

    total_kb = sum((album_dir / p.split("/")[-1]).stat().st_size for p in [cover_rel] + image_paths) // 1024
    print(f"\n[OK] Album published: {new_album['title_ar']} ({len(image_paths)} photos, ~{total_kb} KB total)")
    print(f"Next step: upload the whole 'activities/{slug}/' folder to GitHub, then update activities.json.")


if __name__ == "__main__":
    main()
