# Homepage video
with open("dist/index.html", 'r') as file:
    contents = file.read()

contents = contents.replace('../assets', './assets')

with open("dist/index.html", 'w') as file:
    file.write(contents)

# Accessibility video
with open("dist/Education/index.html", 'r') as file:
    contents = file.read()

contents = contents.replace('//assets/video/Accessibility--ASL.mp4', '../assets/video/Accessibility--ASL.mp4')

with open("dist/Education/index.html", 'w') as file:
    file.write(contents)


    