from datetime import datetime
import os
import sh
from path import Path
import requests
import json
import meilisearch
from dotenv import load_dotenv


load_dotenv()


KREAKO_CO_DIR = Path(os.getenv("KREAKO_CO_DIR", "/kreako.fr"))
KREAKO_DATA = KREAKO_CO_DIR / "data"
DATA_FNAME = KREAKO_DATA / "data.json"
ASTRO_DIR = KREAKO_CO_DIR / "astro"
ASTRO_DIST_DIR = ASTRO_DIR / "dist"
NGINX_DIR = Path(os.getenv("NGINX_DIR", "/nginx"))
API_ENDPOINT = os.getenv("API_ENDPOINT", "http://127.0.0.1:1337")
MEILI_PRIVATE_KEY = os.getenv("MEILI_PRIVATE_KEY")


# KREAKO_DATA.makedirs_p()


def get_data():
    def endpoint(e):
        return f"{API_ENDPOINT}/{e}"

    notes = requests.get(endpoint("notes")).json()
    links = requests.get(endpoint("links")).json()
    tags = requests.get(endpoint("tags")).json()

    return {"notes": notes, "links": links, "tags": tags}


def generate_data(data, fname):
    with open(fname, "w") as f:
        json.dump(data, f, indent=2)


def index_data(data):
    client = meilisearch.Client("http://127.0.0.1:7700", apiKey=MEILI_PRIVATE_KEY)
    index = client.index("ressource")
    for note in data["notes"]:
        note["id"] = f"note-{note['id']}"
        note["kind"] = "note"
    for link in data["links"]:
        link["id"] = f"link-{link['id']}"
        link["kind"] = "link"
    index.add_documents(data["notes"])
    index.add_documents(data["links"])


def build(body):
    # Get data from strapi
    data = get_data()

    # inject data in meilisearch
    index_data(data)

    now = datetime.now().isoformat()

    # Remove The current dist folder
    ASTRO_DIST_DIR.rmtree_p()

    # Build
    sh.npm("run", "build", _cwd=ASTRO_DIR)

    # Create the output dir
    output = NGINX_DIR / now

    # Copy from dist to output
    ASTRO_DIST_DIR.copytree(output)

    # Generate data
    generate_data(data, KREAKO_DATA / "data.json")

    # Create the semaphore file to signal a complete build
    with open(output / "done", "w") as f:
        f.write(now)
