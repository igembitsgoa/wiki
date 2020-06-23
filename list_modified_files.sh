for file in `git diff --name-only HEAD...$TRAVIS_BRANCH`
do
    echo $file
done