#!/bin/bash

set -e
set -o nounset

scp -r \
  favicon.ico index.html \
  css fonts img \
  savage@oracle.savageinter.net:/var/www/html/puzzlingmadness.savageinter.net
