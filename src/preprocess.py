import os
files = ['/templates/mixins.pug']

for filename in files:
    path = os.getcwd() + filename
    with open(path, 'r') as file:
        lines = file.readlines()

    with open(path, 'w') as file:
        file.write("- urlPrefix = \"https:///igembitsgoa.github.io/wiki/\"\n//- ")
        for line in lines:
            file.write(line)