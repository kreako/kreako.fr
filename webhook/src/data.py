import requests
import os
import meilisearch
import itertools
import json


API_ENDPOINT = os.getenv("API_ENDPOINT", "http://127.0.0.1:1337")
MEILI_PRIVATE_KEY = os.getenv("MEILI_PRIVATE_KEY")


def get_data():
    def endpoint(e):
        return f"{API_ENDPOINT}/{e}?_limit=-1"

    notes = requests.get(endpoint("notes")).json()
    links = requests.get(endpoint("links")).json()
    tags = requests.get(endpoint("tags")).json()

    return {"notes": notes, "links": links, "tags": tags}


def generate_data(data, fname):
    with open(fname, "w") as f:
        json.dump(data, f, indent=2)


def chunked_iterable(iterable, size):
    it = iter(iterable)
    while True:
        chunk = tuple(itertools.islice(it, size))
        if not chunk:
            break
        yield chunk


def index_data(data):
    client = meilisearch.Client("http://127.0.0.1:7700", apiKey=MEILI_PRIVATE_KEY)
    index = client.index("ressource")
    for note in data["notes"]:
        note["id"] = f"note-{note['id']}"
        note["kind"] = "note"
    for link in data["links"]:
        link["id"] = f"link-{link['id']}"
        link["kind"] = "link"
    for notes in chunked_iterable(data["notes"], 5):
        index.add_documents(notes)
    for links in chunked_iterable(data["links"], 5):
        index.add_documents(links)
