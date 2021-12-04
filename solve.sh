#!/usr/bin/env bash

function fail(){
    echo "Error: $1"
    echo "Usage: yarn solve [num]"
    exit 1
}

function is_int() { test "$@" -eq "$@" 2> /dev/null; } 

function is_puzzle_existing() { ls ./puzzle$1.ts 2> /dev/null; } 

if [ $# -eq 0 ]
  then
    fail "No puzzle number supplied"
fi

if ! is_puzzle_existing $1
  then
    fail "the puzzle $1 does not exist (yet!)"
fi

PUZZLE_NUM=${1//_v2/}

cat ./data/input$PUZZLE_NUM.txt | ts-node ./puzzle$1.ts