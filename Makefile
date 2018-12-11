# Check that language is set.  Do NOT set 'LANG', as that would override the platform's LANG setting.
ifndef lang
$(error Must set 'lang' with 'lang=en' or similar.)
endif

# Tools.
JEKYLL=jekyll

# Language-dependent settings.
DIR_MD=_${lang}
DIR_TEX=tex/${lang}
DIR_WEB=_site/${lang}

# Filesets.
ALL_MD=$(wildcard ${DIR_MD}/*.md)
CHAPTERS_MD=$(filter-out ${DIR_MD}/bib.md ${DIR_MD}/index.md,${ALL_MD})
CHAPTERS_HTML=$(patsubst ${DIR_MD}/%.md,${DIR_WEB}/%.html,${ALL_MD})

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
	@bin/checktoc.py _config.yml ${DIR_TEX}/book.tex ${ALL_MD}

## showlinks   : show all links in source Markdown
showlinks :
	@bin/showlinks.py ${ALL_MD}

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
	@echo "DIR_WEB=${DIR_WEB}"
	@echo "CHAPTERS_MD=${CHAPTERS_MD}"
	@echo "CHAPTERS_HTML=${CHAPTERS_HTML}"
