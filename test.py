"""
*  DONE:
*      Template line
*      Page title
*      requireMathJax
*      Image syntax
*      Image paths
*
*  TODO:
*      Table captions
*
*  TODO?
*       Indentation
*       Broken links
"""

import os
import re
import sys
import pathlib

for root, directories, files in os.walk('src/pages'):
    for filename in files:
        filename = root + '/' + filename

        with open(filename, 'r', encoding="utf8", errors="ignore") as file:
            contents = [line.rstrip() for line in file.readlines()]

            # Test: Template line
            if "extends" not in contents[0]:
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
            proper_page_title = False
            for word in wordsInTitle:
                if word in filename:
                    proper_page_title = True
                    break
            if not proper_page_title:
                print(filename, "failed test.")
                print(
                    "Page title on line 4 doesn't match the filename. Are you sure it's right?")
                sys.exit(1)

            # Test and remember value of requireMathJax
            requireMathJax = re.split(" ", contents[4].strip())[-1]
            if requireMathJax not in ["true", "false"]:
                print(filename, "failed test.")
                print(
                    "Check requireMathJax on line 5. It must be true or false and there must be a space after =.")
                sys.exit(1)
            contains_mathjax = False  # change this later if MathJax is found

            # Test: article line
            if contents[6].strip() != "block article":
                print(filename, "failed test.")
                print("`block article` missing on line 7.")
                sys.exit(1)

            image_count = 0   # keeps track of image numbers
            for i in range(len(contents)):
                line = contents[i]

                if "+image" in line:
                    arguments = re.search(r'\((.*?)\)', line)
                    if arguments is None:
                        print(filename, "failed test.")
                        print("Check line", i+1,
                              ". Did you provide arguments for the image?")
                        sys.exit(1)
                    arguments = arguments.group(1).split(",")

                    # Test: Image numbers
                    try:
                        imageID = int(arguments[0])
                    except ValueError:
                        print(filename, "failed test.")
                        print("Check line", i+1,
                              ". Did you provide a number for the image?")
                        sys.exit(1)

                    if imageID != image_count + 1:
                        print(filename, "failed test.")
                        print("Wrong image number on line", i+1,
                              ". Should be", image_count + 1, ".")
                        sys.exit(1)
                    image_count += 1

                elif "$$" in line:
                    contains_mathjax = True
                    if requireMathJax != "true":
                        print(filename, "failed test.")
                        print("The file appears to contain MathJax on line",
                              i+1, "but requireMathJax is not true.")
                        sys.exit(1)

            if requireMathJax == "true" and not contains_mathjax:
                print(filename, "failed test.")
                print(
                    "requireMathJax is true but the file doesn't seem to contain any MathJax.")
                sys.exit(1)
