import sys
import os
import ntpath

class Directory:
    def __init__(self, name):
        self.name = name
        self.images = []
        self.folders = []

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
            #print("FOLDER!: " + entry.path.replace(album_path, cache_path))
            traversedir(entry.path, album_path, cache_path)
        #elif entry.is_file():
            #print("File: " + entry.path.replace(album_path, cache_path))


if __name__ == "__main__":
    main()
