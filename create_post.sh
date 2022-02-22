#!/bin/bash

set -e

EXTENSION=".md"
TODAY=$(date "+%Y-%m-%d")
POSTS_DIR="content/posts"

read -rp "Write post file name: " SLUG

FILE="$TODAY-$SLUG$EXTENSION"

cd $POSTS_DIR || exit

if [ -e "$FILE" ];then
  echo "File exists."
  exit
fi

{
  echo -e "---"
  echo -e "templateKey: blog-post"
  echo -e "title: "
  echo -e "date: ""$TODAY"
  echo -e "description: "
  echo -e "cover: /images/"
  echo -e "category: "
  echo -e "tags:"
  echo -e "  - "
  echo -e "slug: "
  echo -e "---"
} >> "$FILE"


echo "Template file created!"
