#!/bin/bash

set -e

# from https://dev.to/ahferroin7/skip-ci-stages-in-travis-based-on-what-files-changed-3a4k
CHANGED_FILES=

if [ -z "${TRAVIS_COMMIT_RANGE}" ]; then
  # This is a new branch.
  break
else
  # This isn't a new branch.
  if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
    # This isn't a PR build.

    # We need the individual commits to detect force pushes.
    COMMIT1="$(echo ${TRAVIS_COMMIT_RANGE} | cut -f 1 -d '.')"
    COMMIT2="$(echo ${TRAVIS_COMMIT_RANGE} | cut -f 4 -d '.')"

    if [ "$(git cat-file -t ${COMMIT1} 2>/dev/null)" = commit -a "$(git cat-file -t ${COMMIT2} 2>/dev/null)" = commit ]; then
      # This was a history rewrite.
      break
    else
      # This is a 'normal' build.
      CHANGED_FILES="$(git diff --name-only ${COMMIT_RANGE} --)"
    fi
  else
    # This is a PR build.
    CHANGED_FILES="$(git diff --name-only ${TRAVIS_BRANCH}..HEAD --)"
  fi
fi

for CHANGED_FILE in $CHANGED_FILES; do
  echo $CHANGED_FILE
  if ! [[ $CHANGED_FILE =~ ^src\/\(assets\/img\/|pages\/\) ]]; then
    echo You have modified $CHANGED_FILE.
    echo "Please don't modify files outside src/assets/img/ and src/pages/"
    exit 1
  fi
done
