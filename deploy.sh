#!/bin/bash

set -e
set -o nounset

scp -r \
  favicon.ico index.html \
  bibliography.html gallery.html howitworks.html \
  press.html \
  css fonts img \
  savage@oracle.savageinter.net:/var/www/html/puzzlingmadness.ca
