"""
    preprocess.py
"""

import os
import sys
from pathlib import Path

# pylint: disable=invalid-name


for root, _, files in os.walk('src/pages'):

    for filename in files:

        filepath = Path(root) / Path(filename)

        with open(filepath, 'r') as file:
            contents = file.readlines()

        templines = []

        for line in contents:
            if "+image" in line and "imgpath" not in line:
                parts = line.split(",")
                img_name = None
                if '"' in parts[1]:
                    img_name = parts[1].split('"')[1]
                elif "'" in parts[1]:
                    img_name = parts[1].split("'")[1]

                img_path = Path('src/assets/img') / Path(img_name)

                if img_path.exists():
                    relative_path = os.path.relpath(img_path, filepath.parent)
                    levels = relative_path.count('../') - 1
                    templines.append(f'    - var imgpath = "{"../"*levels}" + require("{relative_path}")["default"]\n')

                    parts[1] = ' imgpath'
                    newline = ','.join(parts)
                    templines.append(newline)

                else:
                    print(f"{img_path} doesn't exist")
                    sys.exit(1)

            else:
                templines.append(line)
        
        with open(filepath, 'w') as file:
            for line in templines:
                file.write(line)

