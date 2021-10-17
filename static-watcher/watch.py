import os
from sh import cp, rm, git
from path import Path
from dotenv import load_dotenv
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


load_dotenv()

INPUT_DIR = Path(os.getenv("INPUT_DIR", "~/nginx")).expanduser()
OUTPUT_DIR = Path(os.getenv("OUTPUT_DIR", "/usr/share/nginx/html/root"))
KREAKO_CO_DIR = Path("~/kreako.fr").expanduser()
KREAKO_DATA = KREAKO_CO_DIR / "data"
DATA_FNAME = KREAKO_DATA / "data.json"


class MyEventHandler(FileSystemEventHandler):
    def on_closed(self, event):
        p = Path(event.src_path)
        if p.name == "done":
            # Copy build to nginx root
            d = p.dirname()
            print("Move", d)
            for f in d.listdir():
                cp("-rf", f, OUTPUT_DIR)
            rm("-rf", d)
            # git commit and push
            git(
                "commit",
                "-m",
                "Update data",
                DATA_FNAME,
                _cwd=KREAKO_CO_DIR,
                _ok_code=(0, 1),
            )
            git("push", _cwd=KREAKO_CO_DIR)


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
