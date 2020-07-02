#!/bin/bash

set -e

echo $TRAVIS_COMMIT_RANGE
echo $TRAVIS_PULL_REQUEST
echo $TRAVIS_RANGE
echo $TRAVIS_BRANCH

# from https://dev.to/ahferroin7/skip-ci-stages-in-travis-based-on-what-files-changed-3a4k
CHANGED_FILES=

if [ -z "${TRAVIS_COMMIT_RANGE}" ]; then
  echo This is a new branch.
  
else
  echo This is not a new branch.
  if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    echo This is not a PR build.

    echo We need the individual commits to detect force pushes.
    COMMIT1="$(echo ${TRAVIS_COMMIT_RANGE} | cut -f 1 -d '.')"
    COMMIT2="$(echo ${TRAVIS_COMMIT_RANGE} | cut -f 4 -d '.')"
    echo $COMMIT1
    echo $COMMIT2
    if [ "$(git cat-file -t ${COMMIT1} 2>/dev/null)" = commit -a "$(git cat-file -t ${COMMIT2} 2>/dev/null)" = commit ]; then
      echo "This was a history rewrite."
      :
    else
      echo "This is a 'normal' build."
      CHANGED_FILES="$(git diff --name-only ${COMMIT_RANGE} --)"
    fi
  else
    echo This is a PR build.
    CHANGED_FILES="$(git diff --name-only ${TRAVIS_BRANCH}..HEAD --)"
  fi
fi

echo $CHANGED_FILES

for CHANGED_FILE in $CHANGED_FILES; do
  echo $CHANGED_FILE
  if ! [[ $CHANGED_FILE =~ ^src\/\(assets\/img\/|pages\/\) ]]; then
    echo You have modified $CHANGED_FILE.
    echo "Please don't modify files outside src/assets/img/ and src/pages/"
    exit 1
  fi
done
