#!/bin/bash

if ! [ -x "$(command -v svn)" ]; then
  echo "Error: svn is not installed." >&2
  exit 1
fi

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
PROJECT_ROOT=$SCRIPTPATH/..

if [ -d "$PROJECT_ROOT/styles" ]; then
  echo "Error: styles/ already exists." >&2
  exit 1
fi

cd $PROJECT_ROOT
svn export https://github.com/isagalaev/highlight.js/trunk/src/styles
