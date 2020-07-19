import os
import re
import json
from pprint import pprint
import requests
import yaml



def main():

    # TODO: read every file in citations
    for root, _, files in os.walk('citations'):

        for filename in files:
            with open(root + '/' + filename, 'r') as file:
                citations = yaml.safe_load(file)

            parsed_citations = []
            for citation in citations:
                if 'doi' in citation.keys():
                    parsed_citation = parse_DOI(citation['doi'])
                    parsed_citation['type'] = 'article'

                elif 'article' in citation.keys():
                    parsed_citation = parse_article_citation(citation['article'])
                    parsed_citation['type'] = 'article'

                elif 'webpage' in citation.keys():
                    parsed_citation = parse_webpage_citation(citation['webpage'])
                    parsed_citation['type'] = 'webpage'

                elif 'book' in citation.keys():
                    parsed_citation = parse_book_citation(citation['book'])
                    parsed_citation['type'] = 'book'

                else:
                    pprint(citation)
                    print('Invalid citation identifier.')
                    raise SystemExit

                parsed_citations.append(parsed_citation)

            pugfile = 'pages/' + os.path.splitext(filename)[0] + '.pug'

            with open(pugfile, 'r') as file:
                lines = file.readlines()

            # write file with updated citations
            with open(pugfile, 'w') as file:
                for line in lines:
                    stripped = line.rstrip()

                    file.write(line)
                    # write mode if second warning line, after so that warning is written anyway
                    if stripped == '//- DO NOT MODIFY THIS LINE AND ANYTHING BEYOND.':
                        file.write(
                            "prepend citations\n    - var citations = ")
                        break

            with open(pugfile, 'a') as file:
                json.dump(parsed_citations, file, sort_keys=True)

def etiquette():

    app_name = 'iGEM BITS Goa Wiki'
    app_version = '0.1'
    app_url = 'https://igembitsgoa.github.io'
    email = 'ballaneypranav@gmail.com'

    return app_name + '/' + app_version + " (" + app_url + "; mailto:" + email + ")"


def parse_DOI(doi):
    # returns split APA citation

    response_json = requests.get(doi, headers={
        'user-agent': etiquette(),
        'Accept': 'application/citeproc+json'
    }).json()

    title = response_json['title'].replace('–', '-') + '.'
    journal = response_json['container-title']

    response_text = requests.get(doi, headers={
        'user-agent': etiquette(),
        'Accept': 'text/bibliography; style=apa; locale=en-US'
    }).text

    response_text = response_text.replace('â', '-')
    response_text = response_text.replace('¦', '... &')
    response_text = re.sub(' -', ' ', response_text)
    response_text = response_text.split('doi')[0]

    length = len(title)//2
    authors = response_text.split(title[:length])[0].replace('', '')
    numbers = response_text.split(journal + ", ")[1].replace('', '')

    # TODO: check for special characters

    citation = {
        'authors': authors,
        'title': title,
        'journal': journal,
        'numbers': numbers,
        'doi': doi
    }

    return citation


def parse_article_citation(citation):

    # ensure that mandatory fields are present
    for key in ['authors', 'title', 'journal', 'numbers']:
        if key not in citation.keys() or \
                not isinstance(citation[key], str) or \
                citation[key] == "":

            pprint(citation)
            print(f"Cited webpages must have a valid {key}.")
            raise SystemExit

        citation[key] = citation[key].strip()
        if citation[key][-1] != '.':
            citation[key] += '.'

    if 'year_published' not in citation.keys() or \
            (
                not isinstance(citation['year_published'], int) and \
                not isinstance(citation['year_published'], str)
            ) or \
            citation['year_published'] == "":

        pprint(citation)
        print("Cited webpages must have a valid year_published.")
        raise SystemExit

    citation['authors'] += ' (' + \
        str(citation['year_published']).strip() + ').'

    return citation


def parse_webpage_citation(citation):

    parsed_citation = {}

    # ensure that mandatory fields are present
    for key in ['title', 'accessed', 'site_name', 'url']:
        if key not in citation.keys() or \
                not isinstance(citation[key], str) or \
                citation[key] == "":

            pprint(citation)
            print(f"Cited webpages must have a valid {key}.")
            raise SystemExit

        citation[key] = citation[key].strip()

    for key in ['title', 'accessed', 'site_name']:
        if citation[key][-1] != '.':
            citation[key] += '.'

    # TODO: validateDate(citation['accessed'])

    parsed_citation['details'] = f"Retrieved on {citation['accessed']} from "

    # check date published
    if 'published' not in citation.keys() or \
            citation['published'] is None or \
            citation['published'] == "":

        citation['published'] = '(n.d.).'

    elif not isinstance(citation['published'], str):
        pprint(citation)
        print("'published' has an invalid value.")
        raise SystemExit
    else:
        citation['published'] = "(" + citation['published'].strip() + ').'

    # check authors
    if 'authors' in citation.keys() and citation['authors'] is not None:
        if not isinstance(citation['authors'], str):
            pprint(citation)
            print("'authors' has an invalid value.")
            raise SystemExit
        
        if citation['authors'] != "":
            citation['authors'] = citation['authors'].strip()
            if citation['authors'][-1] != ".":
                citation['authors'] += '.'

            parsed_citation['authors'] = citation['authors'] + \
                ' ' + citation['published']
    else:
        parsed_citation['details'] = citation['published'] + \
            ' ' + parsed_citation['details']

    parsed_citation['title'] = citation['title'] + ' ' + citation['site_name']
    parsed_citation['url'] = citation['url']

    return parsed_citation


def parse_book_citation(citation):

    # ensure that mandatory fields are present
    for key in ['authors', 'title', 'publisher']:
        if key not in citation.keys() or \
                not isinstance(citation[key], str) or \
                citation[key] == "":

            pprint(citation)
            print(f"Cited webpages must have a valid {key}.")
            raise SystemExit

        citation[key] = citation[key].strip()

        if citation[key][-1] != '.':
            citation[key] += '.'

    if 'year_published' not in citation.keys() or \
            (
                not isinstance(citation['year_published'], int) and \
                not isinstance(citation['year_published'], str)
            ) or \
            citation['year_published'] == "":

        pprint(citation)
        print("Cited books must have a valid year_published.")
        raise SystemExit

    citation['year_published'] = '(' + \
        str(citation['year_published']).strip() + ').'

    return citation


if __name__ == "__main__":
    main()
