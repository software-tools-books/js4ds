#!/usr/bin/env python

import sys
import re
import yaml


def main(configPath, chapterFiles):
    configToc = read_config_toc(configPath)
    filesToc = normalize(chapterFiles) - {'index'}
    report('in configuration but no file',  configToc - filesToc)
    report('file but not in configuration', filesToc - configToc)


def read_config_toc(configPath):
    with open(configPath, 'r') as reader:
        config = yaml.load(reader)
    toc = config['toc']
    return {x.strip('/') for x in set(toc['lessons']) | set(toc['bib']) | set(toc['extras'])}


def normalize(filenames):
    return set([f.split('/')[1].split('.')[0] for f in filenames])


def report(title, values):
    if not values: return
    print(title)
    for v in sorted(values):
        print(v)
    

if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.stderr.write('Usage: checkfiles /path/to/config /path/to/chapterfiles...')
        sys.exit(1)
    main(sys.argv[1], sys.argv[2:])
