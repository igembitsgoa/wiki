#!/bin/bash

set -e

CHANGED_FILES=`git diff --name-only master...${TRAVIS_COMMIT}`

for CHANGED_FILE in $CHANGED_FILES; do
  if ! [[ $CHANGED_FILE =~ ^src\/(assets\/img\/|pages\/) ]]; then
    echo You have modified $CHANGED_FILE.
    echo "Please don't modify files outside src/assets/img/ and src/pages/" 
    exit 1
  fi
done
