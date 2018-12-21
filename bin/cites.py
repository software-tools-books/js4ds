#!/usr/bin/env python

'''Handle citations in LaTeX transformation because 'sed' can't.'''

import sys
import re

def fixup(match):
    keys = [s.strip() for s in match.group(1).split(',')]
    return '[' + ','.join(['\\hyperlink{{b:{}}}{{{}}}'.format(k, k) for k in keys]) + ']'

pat = re.compile(r'\\hyperlink{BIB}{([^}]+)}')
for line in sys.stdin:
    sys.stdout.write(pat.sub(fixup, line))
