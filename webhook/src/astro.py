from datetime import datetime
import os
import sh
from path import Path
from dotenv import load_dotenv
from data import get_data, index_data, generate_data


load_dotenv()


KREAKO_CO_DIR = Path(os.getenv("KREAKO_CO_DIR", "/kreako.fr"))
KREAKO_DATA = KREAKO_CO_DIR / "data"
DATA_FNAME = KREAKO_DATA / "data.json"
ASTRO_DIR = KREAKO_CO_DIR / "astro"
ASTRO_DIST_DIR = ASTRO_DIR / "dist"
NGINX_DIR = Path(os.getenv("NGINX_DIR", "/nginx"))


def build(body):
    # Get data from strapi
    data = get_data()

    # inject data in meilisearch
    index_data(data)

    now = datetime.now().isoformat()

    # Remove The current dist folder
    ASTRO_DIST_DIR.rmtree_p()

    # Install
    sh.npm("install", _cwd=ASTRO_DIR)

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
