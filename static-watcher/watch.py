import os
from path import Path
from dotenv import load_dotenv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


load_dotenv()

INPUT_DIR = Path(os.getenv("INPUT_DIR", "~/nginx")).expanduser()
OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "/usr/share/nginx/html/root"))


class MyEventHandler(FileSystemEventHandler):
    def on_closed(self, event):
        p = Path(event.src_path)
        if p.name == "done":
            d = p.dirname()
            print("Move", d)
            for f in d.listdir():
                f.move(OUTPUT_DIR)
            d.rmtree(OUTPUT_DIR)


def main():
    handler = MyEventHandler()
    observer = Observer()
    observer.schedule(handler, INPUT_DIR, recursive=True)
    observer.start()
    try:
        while observer.isAlive():
            observer.join(1)
    finally:
        observer.stop()
        observer.join()


if __name__ == "__main__":
    main()
