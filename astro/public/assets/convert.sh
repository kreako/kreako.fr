#!/bin/bash

inkscape favicon.svg --export-filename=favicon.png
convert favicon.png -resize 32x32 favicon.ico
