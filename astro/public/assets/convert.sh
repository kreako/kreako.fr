#!/bin/bash

inkscape favicon.svg --export-filename=favicon.png
convert favicon.png -resize 32x32 favicon.ico
convert avatar_src.png -resize 64x64 avatar.png