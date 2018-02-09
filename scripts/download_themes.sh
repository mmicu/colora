#!/bin/bash

function check_command {
  if ! [ -x "$(command -v $1)" ]; then
    echo "Error: '$1' is not installed." >&2
    exit 1
  fi
}

check_command "svn"
check_command "realpath"
check_command "dirname"

SCRIPT=`realpath $0`
SCRIPTPATH=`dirname $SCRIPT`
PROJECT_ROOT=$SCRIPTPATH/..

if [ -d "$PROJECT_ROOT/styles" ]; then
  echo "Error: styles/ already exists." >&2
  exit 1
fi

cd $PROJECT_ROOT
svn export https://github.com/isagalaev/highlight.js/trunk/src/styles
