# Check that language is set.  Do NOT set 'LANG', as that would override the platform's LANG setting.
ifndef lang
$(warning Please set 'lang' with 'lang=en' or similar.)
lang=en
endif

# Project stem.
STEM=js-vs-ds

# Tools.
JEKYLL=jekyll
PANDOC=pandoc
LATEX=pdflatex

# Language-dependent settings.
DIR_MD=_${lang}
PAGES_MD=$(wildcard ${DIR_MD}/*.md)
DIR_HTML=_site/${lang}
PAGES_HTML=${DIR_HTML}/index.html $(patsubst ${DIR_MD}/%.md,${DIR_HTML}/%/index.html,$(filter-out ${DIR_MD}/index.md,${PAGES_MD}))
DIR_TEX=tex/${lang}
ALL_TEX=${DIR_TEX}/all.tex
BOOK_PDF=${DIR_TEX}/js-vs-ds.pdf

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

## release     : build a release (all-in-one HTML page + PDF).
release :
	@make lang=${lang} site
	@make lang=${lang} allhtml
	@make lang=${lang} book

## pdf         : generate PDF from LaTeX source.
pdf : ${BOOK_PDF}

${BOOK_PDF} : ${ALL_TEX}
	cd ${DIR_TEX} \
	&& ${LATEX} ${STEM} \
	&& ${LATEX} ${STEM}

# Create the unified LaTeX file (separate target to simplify testing).
# + 'sed' to pull glossary entry IDs out into '==g==' blocks (because Pandoc throws them away).
# + 'sed' to pull bibliography entry IDs out into '==b==' blocks (because Pandoc throws them away).
# + 'sed' to stash figure information (because Pandoc...).
# + 'sed' to un-comment embedded LaTeX commands '<!-- == command -->' before Pandoc erases them.
# + 'sed' to insert text signalling language type of code listing.
# ! Pandoc
# - 'tail' to strip out YAML header.
# - 'sed' to add language type flag to code listing environment.
# - 'sed' to restore embedded LaTeX commands (need to strip out the newline Pandoc introduces after the command).
# - 'sed' to restore figures.
# - 'sed' to turn SVG inclusions into PDF inclusions.
# - 'sed' to convert '====' blocks into LaTeX labels.
# - 'sed' to bump section headings back up.
# - 'sed' to suppress indentation inside quotes (so that callout boxes format correctly).
# - 'sed' (twice) to convert 'verbatim' environments
${ALL_TEX} : ${PAGES_HTML}
	node js/stitch.js _config.yml _site ${lang} \
	| sed -E -e 's!<strong id="(g:[^"]+)">([^<]+)</strong>!<strong>==g==\1==g==\2==g==</strong>!' \
	| sed -E -e 's!<strong id="(b:[^"]+)">([^<]+)</strong>!<strong>==b==\1==b==\2==b==</strong>!' \
	| sed -E -e 's!<figure +id="(.+)"> *<img +src="(.+)"> *<figcaption>(.+)</figcaption> *</figure>!==f==\1==\2==\3==!' \
	| sed -E -e 's/<!-- +== +(.+) +-->/==c==\1==/' \
	| sed -E -e 's!(<div.+class="language-([^ ]+))!==l==\2==\1!' \
	| ${PANDOC} --wrap=preserve -f html -t latex -o - \
	| tail -n +6 \
	| sed -E -e '/==l==.+==/{N;N;s/\n/ /g;}' \
	| sed -E -e 's!==l==(css)== *\\begin\{verbatim\}!\\begin{lstlisting}!' \
	| sed -E -e 's!==l==(text)== *\\begin\{verbatim\}!\\begin{lstlisting}[backgroundcolor=\\color{verylightgray}]!' \
	| sed -E -e 's!==l==([^=]+)== *\\begin\{verbatim\}!\\begin{lstlisting}[language=\1]!' \
	| sed -E -e 's!\\end{verbatim}!\\end{lstlisting}!' \
	| sed -E -e '/==c==.+==/{N;s/\n/ /;}' -e 's!==c==(.+)==!\1!' -e s'!\\textbackslash{}!\\!' \
	| sed -E -e 's!==f==([^=]+)==([^=]+)==([^=]+)==!\\begin{figure}[H]\\label{\1}\\centering\\includegraphics{\2}\\caption{\3}\\end{figure}!' \
	| sed -E -e 's!\.svg}!\.pdf}!' \
	| sed -E -e 's!==b==([^=]+)==b==([^=]+)==b==!\\hypertarget{\1}{\2}\\label{\1}!' \
	| sed -E -e 's!==g==([^=]+)==g==([^=]+)==g==!\\hypertarget{\1}{\2}\\label{\1}!' \
	| sed -E -e 's!\\begin{quote}!\\begin{quote}\\setlength{\\parindent}{0pt}!' \
	| sed -E -e 's!\\section!\\chapter!' \
	| sed -E -e 's!\\subsection!\\section!' \
	| sed -E -e 's!\\subsubsection!\\subsection!' \
	> ${DIR_TEX}/all.tex

${PAGES_HTML} : ${PAGES_MD}

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
	@rm -r -f _site dist bin/__pycache__
	@rm -r -f tex/*/all.tex tex/*/*.aux tex/*/*.bbl tex/*/*.blg tex/*/*.log tex/*/*.out tex/*/*.toc
	@find . -name '*~' -delete
	@find . -name .DS_Store -prune -delete

## settings    : show macro values.
settings :
	@echo "JEKYLL=${JEKYLL}"
	@echo "DIR_MD=${DIR_MD}"
	@echo "PAGES_MD=${PAGES_MD}"
	@echo "DIR_HTML=${DIR_HTML}"
	@echo "PAGES_HTML=${PAGES_HTML}"
	@echo "DIR_TEX=${DIR_TEX}"
	@echo "ALL_TEX=${ALL_TEX}"
	@echo "BOOK_PDF=${BOOK_PDF}"
