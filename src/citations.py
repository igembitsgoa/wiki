import os
import re
import requests


def main():

    # read every pug file in pages/

    # extract list of dois
    # get citations
    # append to pug file

    for filename in os.listdir(os.getcwd() + '/pages'):
        # read lines
        with open(os.path.join(os.getcwd() + '/pages', filename), 'r') as f:
            lines = f.readlines()

        dois = []
        mode = 'copy'
        # extract doi list
        for line in lines:
            stripped = line.rstrip()
            # read mode if citations
            if stripped == '//- Citations DOI Start':
                mode = 'read'
                continue
            elif stripped == '//- Citations DOI End':
                break
            
            if mode == 'read' and stripped is not '':
                dois.append(stripped.split('. ')[1])

        # write file with updated citations
        mode = 'copy'
        with open(os.path.join(os.getcwd() + '/pages', filename), 'w') as f:
            for line in lines:
                stripped = line.rstrip()
                
                if mode == 'write':
                    writeCitations(f, dois)
                    f.write("        ]\n")
                    break

                f.write(line)
                # write mode if second warning line, after so that warning is written anyway
                if stripped == '//- DO NOT MODIFY THIS LINE AND ANYTHING BEYOND.':
                    mode = 'write'
                    f.write("prepend citations_doi\n    -\n        var citations_doi = [\n")

                
def etiquette():

    app_name = 'iGEM BITS Goa Wiki'
    app_version = '0.1'
    app_url = 'https://igembitsgoa.github.io'
    email = 'ballaneypranav@gmail.com'

    return app_name + '/' + app_version + " (" + app_url + "; mailto:" + email + ")"


def getCitation(doi):
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

    citation = {
        'authors': authors,
        'title'  : title,
        'journal': journal,
        'numbers': numbers,
        'doi'    : doi
    }

    return citation

def writeCitations(f, dois):
    counter = 1
    for doi in dois:
        citation = getCitation(doi)

        f.write("        {\n")
        f.write("            'id': '" + str(counter) + "',\n")
        f.write("            'authors': '" + citation['authors'] + "',\n")
        f.write("            'title': '" + citation['title'] + "',\n")
        f.write("            'journal': '" + citation['journal'] + "',\n")
        f.write("            'numbers': '" + citation['numbers'] + "',\n")
        f.write("            'doi': '" + citation['doi'] + "',\n")
        f.write("        },\n")
        counter += 1

if __name__ == "__main__":
    main()
