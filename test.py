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
*      Citations
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
        with open(filename, 'r') as file:
            contents = [line.rstrip() for line in file.readlines()]

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

            # Test: article line
            if contents[6].strip() != "block article":
                print(filename, "failed test.")
                print("`block article` missing on line 7.")
                sys.exit(1)

            imageCount = 0            
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
                
                if "$$" in line:
                    if requireMathJax != "true":
                        print(filename, "failed test.")
                        print("The file appears to contain MathJax on line", i+1, "but requireMathJax is not true.")
                        sys.exit(1)
