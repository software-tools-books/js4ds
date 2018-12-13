# Check that language is set.  Do NOT set 'LANG', as that would override the platform's LANG setting.
ifndef lang
$(warning Please set 'lang' with 'lang=en' or similar.)
lang=en
endif

# Tools.
JEKYLL=jekyll

# Language-dependent settings.
DIR_MD=_${lang}

# Filesets.
ALL_MD=$(wildcard ${DIR_MD}/*.md)
SINGLEPAGE_HTML=./all.html

# Controls
all : commands

## commands    : show all commands.
commands :
	@grep -h -E '^##' Makefile | sed -e 's/## //g'

## serve       : run a local server.
serve :
	${JEKYLL} serve -I

## site        : build files but do not run a server.
site :
	${JEKYLL} build

## singlepage  : build single-page version after rebuilding site.
singlepage :
	@node bin/stitch.js _config.yml _site ${lang} ${SINGLEPAGE_HTML}

## ----------------------------------------

## check       : check everything.
check :
	@echo "Characters"
	@make lang=${lang} checkchars
	@echo
	@echo "Glossary"
	@make lang=${lang} checkgloss
	@echo
	@echo "Table of Contents"
	@make lang=${lang} checktoc

## checkchars  : look for non-ASCII characters.
checkchars :
	@bin/checkchars.py ${ALL_MD}

## checkgloss  : check that all glossary entries are defined and used.
checkgloss :
	@bin/checkgloss.py ${ALL_MD}

## checktoc    : check consistency of tables of contents.
checktoc :
	@bin/checktoc.py _config.yml ${ALL_MD}

## ----------------------------------------

## listinc     : list file inclusions.
listinc :
	@for i in $$(find src -name '*.js') $$(find ex -name '*.js'); do echo $$(grep $$i _en/*.md | wc -l) $$i; done | sort -n -r

## spelling    : compare words against saved list.
spelling :
	@cat ${ALL_MD} | aspell list | sort | uniq | diff - .words

## ----------------------------------------

## clean       : clean up junk files.
clean :
	@rm -r -f _site dist bin/__pycache__
	@find . -name '*~' -delete
	@find . -name .DS_Store -prune -delete

## settings    : show macro values.
settings :
	@echo "JEKYLL=${JEKYLL}"
	@echo "DIR_MD=${DIR_MD}"
	@echo "ALL_MD=${ALL_MD}"
	@echo "SINGLEPAGE_HTML=${SINGLEPAGE_HTML}"
