from datetime import datetime
from sh import npm, git
from path import Path
import requests
import json


KREAKO_CO_DIR = Path("/kreako.fr")
KREAKO_DATA = KREAKO_CO_DIR / "data"
DATA_FNAME = KREAKO_DATA / "data.json"
ASTRO_DIR = KREAKO_CO_DIR / "astro"
ASTRO_DIST_DIR = ASTRO_DIR / "dist"
NGINX_DIR = Path("/nginx")
API_ENDPOINT = "http://127.0.0.1:1337"


KREAKO_DATA.makedirs_p()


def generate_data(fname):
    def endpoint(e):
        return f"{API_ENDPOINT}/{e}"

    notes = requests.get(endpoint("notes")).json()
    links = requests.get(endpoint("links")).json()
    tags = requests.get(endpoint("tags")).json()
    with open(fname, "w") as f:
        json.dump({"notes": notes, "links": links, "tags": tags}, f)


def build(body):
    now = datetime.now().isoformat()

    # Remove The current dist folder
    ASTRO_DIST_DIR.rmtree_p()

    # Build
    npm("run", "build", _cwd=ASTRO_DIR)

    # Create the output dir
    output = NGINX_DIR / now

    # Copy from dist to output
    ASTRO_DIST_DIR.copytree(output)

    # Create the semaphore file to signal a complete build
    with open(output / "done", "w") as f:
        f.write(now)

    # Generate data
    generate_data(KREAKO_DATA / "data.json")

    # git commit and push
    git("commit", "-m", "Update data", DATA_FNAME, _cwd=KREAKO_CO_DIR)
    git("push")
