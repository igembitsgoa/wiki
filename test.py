"""
*  DONE:
*      Template line
*      Page title
*      requireMathJax
*      Image syntax
*      Image paths
*      Citations
*
*  TODO:
*      Table captions
*
*  TODO?
*       Indentation
*       Broken links
"""

import json
import os
import re
import sys
import pathlib

for root, directories, files in os.walk('src/pages'):
    for filename in files:
        filename = root + '/' + filename

        with open(filename, 'r', encoding="utf8", errors="ignore") as file:
            contents = [line.rstrip() for line in file.readlines()]

            citations_doi = []
            citations_url = []
            citations_books = []
            citations_doi_running = False
            citations_url_running = False
            citations_books_running = False

            # Test: Template line
            if contents[0].strip() != "extends ../templates/contents.pug":
                print(filename, "failed test.")
                print("Template string must be the first line!")
                sys.exit(1)

            # Test: headVars line
            if contents[2].strip() != "block headVars":
                print(filename, "failed test.")
                print("`block headVars` missing on line 3.")
                sys.exit(1)

            # Test: Page title
            # Check if at least one word in the pageTitle is there in the filename
            pageTitle = re.split("\"", contents[3].strip())[1]
            wordsInTitle = pageTitle.split(" ")
            properPageTitle = False
            for word in wordsInTitle:
                if word in filename:
                    properPageTitle = True
                    break
            if not properPageTitle:
                print(filename, "failed test.")
                print("Page title on line 4 doesn't match the filename. Are you sure it's right?")
                sys.exit(1)

            # Test and remember value of requireMathJax
            requireMathJax = re.split(" ", contents[4].strip())[-1]
            if requireMathJax not in ["true", "false"]:
                print(filename, "failed test.")
                print("Check requireMathJax on line 5. It must be true or false and there must be a space after =.")
                sys.exit(1)
            containsMathJax = False  # change this later if MathJax is found

            # Test: article line
            if contents[6].strip() != "block article":
                print(filename, "failed test.")
                print("`block article` missing on line 7.")
                sys.exit(1)

            imageCount = 0   # keeps track of image numbers
            for i in range(len(contents)):
                line = contents[i]

                if "+image" in line:
                    arguments = re.search(r'\((.*?)\)', line)
                    if arguments is None:
                        print(filename, "failed test.")
                        print("Check line", i+1, ". Did you provide arguments for the image?")
                        sys.exit(1)
                    arguments = arguments.group(1).split(",")

                    # Test: Image numbers
                    try:
                        imageID = int(arguments[0])
                    except ValueError:
                        print(filename, "failed test.")
                        print("Check line", i+1, ". Did you provide a number for the image?")
                        sys.exit(1)

                    if imageID != imageCount + 1:
                        print(filename, "failed test.")
                        print("Wrong image number on line", i+1, ". Should be", imageCount + 1, ".")
                        sys.exit(1)
                    imageCount += 1

                    # Test: Image paths
                    imagePath = re.search(r'\"(.*?)\"', arguments[1])
                    if imagePath is None:
                        print(filename, "failed test.")
                        print("Check line", i+1, ". Did you provide an image path?")
                        sys.exit(1)
                    imagePath = imagePath.group(1)
                    imagePath = pathlib.Path(imagePath)
                    imagePath = (pathlib.Path('src/assets/img') / imagePath).resolve()
                    if not os.path.exists(imagePath):
                        print(filename, "failed test.")
                        print("Check image path on line", i+1, ". Does the file exist?")
                        sys.exit(1)

                    # Test: Image captions
                    imageCaption = re.search(r'\"(.*?)\"', arguments[2])
                    if imageCaption is None:
                        print(filename, "failed test.")
                        print("Check image caption on line", i+1, ". Did you forget to provide one? Is it within double quotes?")
                        sys.exit(1)
                    imageCaption = imageCaption.group(1)
                    if imageCaption == "":
                        print(filename, "failed test.")
                        print("Did you forget to provide an image caption on line {i+1}?")
                        sys.exit(1)

                elif "$$" in line:
                    containsMathJax = True
                    if requireMathJax != "true":
                        print(filename, "failed test.")
                        print("The file appears to contain MathJax on line", i+1, "but requireMathJax is not true.")
                        sys.exit(1)

                elif "Citations DOI Start" in line:
                    citations_doi_running = True

                elif "Citations DOI End" in line:
                    citations_doi_running = False

                elif "prepend citations_url" in line:
                    if contents[i+1] != "    -":
                        print(filename, "failed test on line", i+2)
                        print("`prepend citations_url` must be followed by a line")
                        print("with four spaces and a hyphen and nothing else.")
                        sys.exit(1)

                    if contents[i+2].rstrip() != "        var citations_url = [":
                        print(filename, "failed test on line", i+3)
                        print("The line after the hyphen after `prepend citations_url` must exactly be:")
                        print("        var citations_url = [")
                        print("with eight spaces in front.")

                    citations_url_running = True

                elif "Citations URL End" in line:
                    citations_url_running = False

                elif "prepend citations_books" in line:
                    if contents[i+1] != "    -":
                        print(filename, "failed test on line", i+2)
                        print("`prepend citations_books` must be followed by a line")
                        print("with four spaces and a hyphen and nothing else.")
                        sys.exit(1)

                    if contents[i+2].rstrip() != "        var citations_books = [":
                        print(filename, "failed test on line", i+3)
                        print("The line after the hyphen after `prepend citations_books` must exactly be:")
                        print("        var citations_books = [")
                        print("with eight spaces in front.")

                    citations_books_running = True

                elif "Citations Books End" in line:
                    citations_books_running = False

                elif citations_doi_running:
                    citations_doi.append(line)

                elif citations_url_running:
                    citations_url.append(line)

                elif citations_books_running:
                    citations_books.append(line)

            if requireMathJax == "true" and not containsMathJax:
                print(filename, "failed test.")
                print("requireMathJax is true but the file doesn't seem to contain any MathJax.")
                sys.exit(1)

            if citations_doi_running:
                print(filename, "failed test.")
                print("`Citations DOI Start` was found but `Citations DOI End` was not.")
                sys.exit(1)

            if citations_url_running:
                print(filename, "failed test.")
                print("`prepend citations_url` was found but `Citations URL End` was not.")
                sys.exit(1)

            if citations_books_running:
                print(filename, "failed test.")
                print("`prepend citations_books` was found but `Citations Books End` was not.")
                sys.exit(1)

            doi_index = 0
            for doi in citations_doi:
                if ". " not in doi:
                    print(filename, "failed test.")
                    print("All dois must be numbered like the following:")
                    print("    1. https://doi.org/10.1007/s00484-015-1117-4")
                    sys.exit(1)

                number = doi.split(". ")[0]
                try:
                    number = int(number.strip())
                except:
                    print(filename, "failed test.")
                    print("All dois must be numbered like the following:")
                    print("    1. https://doi.org/10.1007/s00484-015-1117-4")
                    sys.exit(1)

                if number != doi_index + 1:
                    print(filename, "failed test.")
                    print("DOI numbers must start from 1 and be in order.")
                    sys.exit(1)
                else:
                    doi_index += 1 

            # Convert URL citations to JSON and parse
            citations_url_string = ""
            for line in citations_url[2:-1]:
                if "//" in line:
                    continue
                citations_url_string += line.strip()
            citations_url_string = citations_url_string.replace(",}", "}")
            citations_url_string = '[' + citations_url_string + ']'
            citations_url_dict = json.loads(citations_url_string)

            for item in citations_url_dict:

                optional_keys = ["authors", "published"]
                for key in optional_keys:
                    if key not in item.keys():
                        print(filename, "failed test.")
                        print(key, "key is missing in the following URL citation:")
                        print(json.dumps(item, indent = 4, sort_keys=True))
                        print("You can leave the value blank but it must have all the keys.")
                        sys.exit(1)

                required_keys = ["accessed", "title", "site_name"]
                for key in required_keys:
                    if key not in item.keys():
                        print(filename, "failed test.")
                        print(key, "key is missing in the following URL citation:")
                        print(json.dumps(item, indent = 4, sort_keys=True))
                        sys.exit(1)

                    if item[key] == "":
                        print(filename, "failed test.")
                        print(key, "value is blank in the following URL citation:")
                        print(json.dumps(item, indent = 4, sort_keys=True))
                        print(key, "cannot have an empty value.")
                        sys.exit(1)                        

            # Convert Books citations to JSON and parse
            citations_books_string = ""
            for line in citations_books[2:-1]:
                if "//" in line:
                    continue
                citations_books_string += line.strip()
            citations_books_string = citations_books_string.replace(",}", "}")
            citations_books_string = '[' + citations_books_string + ']'
            citations_books_dict = json.loads(citations_books_string)

            for item in citations_books_dict:

                required_keys = ["authors", "title", "publisher", "year_published"]
                for key in required_keys:
                    if key not in item.keys():
                        print(filename, "failed test.")
                        print(key, "key is missing in the following URL citation:")
                        print(json.dumps(item, indent = 4, sort_keys=True))
                        sys.exit(1)

                    if item[key] == "":
                        print(filename, "failed test.")
                        print(key, "value is blank in the following URL citation:")
                        print(json.dumps(item, indent = 4, sort_keys=True))
                        print(key, "cannot have an empty value.")
                        sys.exit(1)  
            

                
