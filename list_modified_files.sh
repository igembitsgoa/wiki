#!/bin/bash

set -e

CHANGED_FILES=`git diff --name-only master...${TRAVIS_COMMIT}`

for CHANGED_FILE in $CHANGED_FILES; do
  echo $CHANGED_FILE
done

