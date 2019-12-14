import sys
import os
import ntpath
from json import JSONEncoder
import json
import re
from PIL import Image

Image.MAX_IMAGE_PIXELS = None

class Directory:
    def __init__(self, name):
        self.name = name
        self.images = []
        self.folders = []
class DirectoryEncoder(JSONEncoder):
    def default(self, object):
        if isinstance(object, Directory):
            return object.__dict__
        else:
            return json.JSONEncoder.default(self, object)

def main():
    if len(sys.argv) != 2:
        print(f"usage: {sys.argv[0]} PATH_TO_ALBUMS")
        return

    album_path = sys.argv[1].replace("\\", "/")
    cache_path = album_path
    if album_path.endswith("/")
        album_path = album_path[0:album_path.rindex("/")]
    album_path = album_path[0:album_path.rindex("/")]+"/cache"

    if not os.path.exists(cache_path):
        os.makedirs(cache_path)

    traversedir(album_path, album_path, cache_path)

def traversedir(path: str, album_path: str, cache_path: str):
    curr_dir = Directory(ntpath.basename(path))
    cache_dir = path.replace(album_path, cache_path)
    if not os.path.exists(cache_dir):
        os.makedirs(cache_dir)

    for entry in os.scandir(path):
        if entry.is_dir():
            curr_dir.folders.append(ntpath.basename(entry))
            traversedir(entry.path, album_path, cache_path)
        elif entry.is_file():
            if re.search("jpe?g$", entry.path, re.IGNORECASE):
                resize_image(entry.path, album_path, cache_path)
                curr_dir.images.append(ntpath.basename(entry.path))
    
    with open(cache_dir+"/index.json", "w") as indexfile:
        indexfile.write(DirectoryEncoder().encode(curr_dir))

def resize_image(original_path: str, album_path: str, cache_path: str):
    thumb_image_path = original_path.replace(album_path, cache_path) + ".thumb.jpg"
    med_image_path = original_path.replace(album_path, cache_path) + ".med.jpg"
    
    resize_thumb = True
    resize_med = True
    if os.path.exists(thumb_image_path) and os.path.getmtime(thumb_image_path) > os.path.getmtime(original_path): # If the resized image was modified after the original
        resize_thumb = False
    if os.path.exists(med_image_path) and os.path.getmtime(med_image_path) > os.path.getmtime(original_path): # If the resized image was modified after the original
        resize_med = False

    if resize_thumb or resize_med:
        original_image = Image.open(original_path)
        ratio = original_image.size[1] / original_image.size[0]
        (width, height) = original_image.size
        if resize_thumb:
            print(f"Resizing {original_path} -> thumbnail")
            thumb = original_image
            if width > height:
                thumb = thumb.crop(((int((width-height)/2)), 0, (int((width+height)/2)), height))
            elif height > width: 
                thumb = thumb.crop((0, (int((height-width)/2)), width, (int((height+width)/2))))
            thumb = thumb.resize((256, 256), Image.ANTIALIAS)
            try:
                thumb.save(thumb_image_path, exif=original_image.info['exif'])                
            except:
                thumb.save(thumb_image_path)
        if resize_med:
            print(f"Resizing {original_path} -> medium")
            med_size = (1024, int(1024*ratio))
            med = original_image.resize(med_size, Image.ANTIALIAS)
            try:
                med.save(med_image_path, exif=original_image.info['exif']) 
            except:
                med.save(med_image_path)
if __name__ == "__main__":
    main()
