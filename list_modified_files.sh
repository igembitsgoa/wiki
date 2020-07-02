#!/bin/bash

set -e

# from https://dev.to/ahferroin7/skip-ci-stages-in-travis-based-on-what-files-changed-3a4k
COMMIT_RANGE="$(echo ${TRAVIS_COMMIT_RANGE} | cut -d '.' -f 1,4 --output-delimiter '..')"
CHANGED_FILES=
PR_BUILD="false"

if [ -z "${TRAVIS_COMMIT_RANGE}" ]; then
  echo This is a new branch.
  :
else
  echo This is not a new branch.
  if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    echo This is not a PR build.
    CHANGED_FILES="$(git diff --name-only ${COMMIT_RANGE} --)"
  else
    echo This is a PR build.
    PR_BUILD="true"
    CHANGED_FILES="$(git diff --name-only HEAD...${TRAVIS_BRANCH})"
  fi
fi

echo $TRAVIS_BRANCH
echo $CHANGED_FILES
echo $PR_BUILD

# if [ "${PR_BUILD}" = "true" ]; then
#   for CHANGED_FILE in $CHANGED_FILES; do
#     echo $CHANGED_FILE
#     if ! [[ $CHANGED_FILE =~ ^src\/\(assets\/img\/|pages\/\) ]]; then
#       echo You have modified $CHANGED_FILE.
#       echo "Please don't modify files outside src/assets/img/ and src/pages/"
#       exit 1
#     fi
#   done
# fi
