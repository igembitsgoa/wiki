"""
    nav.py
"""

import os
import json
from pprint import pprint
import yaml


def main():

    with open('nav.yml', 'r') as file:
        nav = yaml.safe_load(file)

    nav_json = []

    for section in nav:
        current = {}

        current['section'] = list(section.keys())[0]
        current['items'] = []

        for item in section[current['section']]:

            if isinstance(item, str):
                current['items'].append({'title': item, 'link': item})

            elif isinstance(item, dict):
                title = list(item.keys())[0]
                link = item[title]
                current['items'].append({'title': title, 'link': link})

        nav_json.append(current)

    line = f"- var navItems = {str(nav_json)}"

    # print(line)

    with open('src/templates/nav_list.pug', 'w') as file:
        file.write(line)
        file.write('\n\nmixin fakemixin()\n    p')


    # # write file with updated citations
    # with open(pugfile, 'w') as file:
    #     for line in lines:
    #         stripped = line.rstrip()

    #         file.write(line)
    #         # write mode if second warning line, after so that warning is written anyway
    #         if stripped == '//- DO NOT MODIFY THIS LINE AND ANYTHING BEYOND.':
    #             file.write(
    #                 "prepend citations\n    - var citations = ")
    #             break

    # with open(pugfile, 'a') as file:
    #     json.dump(parsed_citations, file, sort_keys=True)


if __name__ == "__main__":
    main()
