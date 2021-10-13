from datetime import datetime
from sh import npm, git
from path import Path


KREAKO_CO_DIR = Path("/kreako.fr")
ASTRO_DIR = KREAKO_CO_DIR / "astro"
ASTRO_DIST_DIR = ASTRO_DIR / "dist"
NGINX_DIR = Path("/nginx")


def build(body):
  # Remove The current dist folder
  ASTRO_DIST_DIR.rmtree_p()

  # Build
  npm("run", "build", _cwd=ASTRO_DIR)

  # Create the output dir
  output = NGINX_DIR / datetime.now().isoformat()

  # Copy from dist to output
  ASTRO_DIST_DIR.copytree(output)

  # Create the semaphore file to signal a complete build
  with open(output / "done", "w") as f:
    f.write("ok")