#!/usr/bin/env python

import sys
import re

def main():
    pat = re.compile(r']\(([^\)]+)\)')
    result = set()
    for filename in sys.argv[1:]:
        with open(filename, 'r') as reader:
            for line in reader:
                for m in pat.findall(line):
                    result.add(m)
    for m in sorted(result):
        print(m)

if __name__ == '__main__':
    main()
