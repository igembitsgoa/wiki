from igem_wikisync import files
from pathlib import Path

config = {
    'team':      'BITSPilani-Goa_India',
    'src_dir':   'dist',
    'build_dir': 'igem',
    'year': "2020",
    'silence_warnings': False
}

upload_map = {
            'assets': {},
            'html': {},
            'css': {},
            'js': {}
        }

infile = "../src/assets/video/HP--Swaminathan.mp4"

video = files.OtherFile(infile, config)

print(video.md5_hash)