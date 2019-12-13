import sys
import os
import ntpath
from json import JSONEncoder
import json
import re

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
    cache_path = album_path[0:album_path.rindex("/")]+"/cache"

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
            if re.search("jpe?g$", entry.path):
                curr_dir.images.append(ntpath.basename(entry.path))
    
    indexfile = open(cache_dir+"/index.json", "w")
    indexfile.write(DirectoryEncoder().encode(curr_dir))
    indexfile.close()

if __name__ == "__main__":
    main()
