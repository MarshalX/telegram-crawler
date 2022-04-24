#!/bin/bash

python make_files_tree.py > /dev/null 1 &
python make_files_tree.py > /dev/null 2 &
python make_files_tree.py > /dev/null 3 &
python make_files_tree.py > /dev/null 4 &
wait
