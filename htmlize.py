import pystache

import json
import os
import sys

ROOT = os.path.dirname(os.path.realpath(__file__))
IN_DIR = os.path.join(ROOT, 'content')
OUT_DIR = os.path.join(ROOT, 'build')

RENDERER = pystache.Renderer(search_dirs=[IN_DIR])
TEMPLATE_CACHE = {}


def render(template_name, data={}):
    if template_name not in TEMPLATE_CACHE:
        template_path = os.path.join(IN_DIR, template_name + '.mustache')
        with open(template_path) as template_file:
            template_str = template_file.read()
            TEMPLATE_CACHE[template_name] = pystache.parse(template_str)
    return RENDERER.render(TEMPLATE_CACHE[template_name], data)


def make_page(filename, html):
    path = os.path.join(OUT_DIR, filename)
    print('Generating {0}...'.format(path))
    with open(path, 'w+') as f:
        f.write(html)


def make_static_pages():
    make_page('index.html', render('index'))
    make_page('faq.html', render('faq'))
    make_page('bibliography.html', render('bibliography'))


def main():
    make_static_pages()


if __name__ == '__main__':
    main()
