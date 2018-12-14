# Check that language is set.  Do NOT set 'LANG', as that would override the platform's LANG setting.
ifndef lang
$(warning Please set 'lang' with 'lang=en' or similar.)
lang=en
endif

# Tools.
JEKYLL=jekyll
PANDOC=pandoc
LATEX=pdflatex

# Language-dependent settings.
DIR_MD=_${lang}
DIR_HTML=_site/${lang}
DIR_TEX=tex/${lang}

# Filesets.
PAGES_MD=$(wildcard ${DIR_MD}/*.md)
PAGES_MD_CHAP=$(filter-out ${DIR_MD}/index.md,${PAGES_MD})
PAGES_HTML=${DIR_HTML}/index.html $(patsubst ${DIR_MD}/%.md,${DIR_HTML}/%/index.html,${PAGES_MD_CHAP})
SINGLEPAGE_HTML=all.html

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

## release     : build a release (all-in-one HTML page + book PDF).
release :
	@make lang=${lang} site
	@make lang=${lang} allhtml
	@make lang=${lang} book

## allhtml     : build single-page version after rebuilding site.
allhtml :
	node bin/stitch.js _config.yml _site ${lang} > ${SINGLEPAGE_HTML}

## book        : build PDF version.
book :
	@make lang=${lang} alltex
	@make lang=${lang} pdf

## alltex      : build single-page LaTeX file from single-page HTML version.
# Create the unified LaTeX file (separate target to simplify testing).
# + 'sed' to pull glossary entry IDs out into '==g==' blocks (because Pandoc throws them away).
# + 'sed' to pull bibliography entry IDs out into '==b==' blocks (because Pandoc throws them away).
# + 'sed' to stash figure information (because Pandoc...).
# + 'sed' to un-comment embedded LaTeX commands '<!-- == command -->' before Pandoc erases them.
# ! Pandoc
# - 'tail' to strip out YAML header.
# - 'sed' to restore embedded LaTeX commands (need to strip out the newline Pandoc introduces after the command).
# - 'sed' to restore figures.
# - 'sed' to turn SVG inclusions into PDF inclusions.
# - 'sed' to convert '====' blocks into LaTeX labels.
# - 'sed' to bump section headings back up.
alltex :
	cat ${SINGLEPAGE_HTML} \
	| sed -E -e 's!<strong id="(g:[^"]+)">([^<]+)</strong>!<strong>==g==\1==g==\2==g==</strong>!' \
	| sed -E -e 's!<strong id="(b:[^"]+)">([^<]+)</strong>!<strong>==b==\1==b==\2==b==</strong>!' \
	| sed -E -e 's!<figure +id="(.+)"> *<img +src="(.+)"> *<figcaption>(.+)</figcaption> *</figure>!==f==\1==\2==\3==!' \
	| sed -E -e 's/<!-- +== +(.+) +-->/==c==\1==/' \
	| ${PANDOC} --wrap=preserve -f html -t latex -o - \
	| tail -n +6 \
	| sed -E -e '/==c==.+==/{N;s/\n/ /;}' -E -e 's!==c==(.+)==!\1!' -e s'!\\textbackslash{}!\\!' \
	| sed -E -e 's!==f==([^=]+)==([^=]+)==([^=]+)==!\\begin{figure}[H]\\label{\1}\\centering\\includegraphics{\2}\\caption{\3}\\end{figure}!' \
	| sed -E -e 's!\.svg}!\.pdf}!' \
	| sed -E -e 's!==b==([^=]+)==b==([^=]+)==b==!\\hypertarget{\1}{\2}\\label{\1}!' \
	| sed -E -e 's!==g==([^=]+)==g==([^=]+)==g==!\\hypertarget{\1}{\2}\\label{\1}!' \
	| sed -E -e 's!\\section!\\chapter!' \
	| sed -E -e 's!\\subsection!\\section!' \
	| sed -E -e 's!\\subsubsection!\\subsection!' \
	> ${DIR_TEX}/all.tex

## pdf         : generate PDF from LaTeX source.
pdf :
	cd ${DIR_TEX} \
	&& ${LATEX} book \
	&& ${LATEX} book

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
	bin/checkchars.py ${PAGES_MD}

## checkgloss  : check that all glossary entries are defined and used.
checkgloss :
	bin/checkgloss.py ${PAGES_MD}

## checktoc    : check consistency of tables of contents.
checktoc :
	bin/checktoc.py _config.yml ${PAGES_MD}

## ----------------------------------------

## listinc     : list file inclusions.
listinc :
	for i in $$(find src -name '*.js') $$(find ex -name '*.js'); do echo $$(grep $$i _en/*.md | wc -l) $$i; done | sort -n -r

## spelling    : compare words against saved list.
spelling :
	cat ${PAGES_MD} | aspell list | sort | uniq | diff - .words

## ----------------------------------------

## clean       : clean up junk files.
clean :
	@rm -r -f _site dist bin/__pycache__ files/*.pdf
	@rm -r -f tex/*/all.tex tex/*/*.aux tex/*/*.bbl tex/*/*.blg tex/*/*.log tex/*/*.out tex/*/*.toc
	@find . -name '*~' -delete
	@find . -name .DS_Store -prune -delete

## settings    : show macro values.
settings :
	@echo "JEKYLL=${JEKYLL}"
	@echo "DIR_MD=${DIR_MD}"
	@echo "PAGES_MD=${PAGES_MD}"
	@echo "PAGES_MD_CHAP=${PAGES_MD_CHAP}"
	@echo "PAGES_HTML=${PAGES_HTML}"
	@echo "SINGLEPAGE_HTML=${SINGLEPAGE_HTML}"
