#!/bin/sh
set -eu
git log --reverse --format=%H "${1:-HEAD}" | while IFS= read -r commit; do
  git show -s --format=%B "$commit" | npm exec --no -- commitlint --verbose || exit 1
done
