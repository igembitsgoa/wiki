with open("dist/index.html", 'r') as file:
    contents = file.read()

contents = contents.replace('../assets', './assets')

with open("dist/index.html", 'w') as file:
    file.write(contents)