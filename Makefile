.PHONY : all check clean commands everything html once pages pdf settings spell words

# Commands
LATEX=pdflatex --shell-escape
BIBTEX=biber
MAKEINDEX=makeindex
PANDOC=pandoc -s --css=assets/bootstrap.min.css --css=assets/tango.css --css=assets/book.css --toc --toc-depth=2 --csl=chicago.csl

# Files
TEX=$(filter-out temp.tex,$(wildcard *.tex))
SRC=${TEX} $(wildcard *.bib) $(wildcard *.cls) $(wildcard *.csl)
TEX_CHAPTERS=$(filter-out %-settings.tex,${TEX})
HTML=docs/index.html
PDF=book.pdf
SUMMARIES=summaries.pdf
FIGURES_SRC=$(wildcard figures/*)
FIGURES_DST=$(patsubst %,docs/%,${FIGURES_SRC})
ASSETS_SRC=$(wildcard assets/*)
ASSETS_DST=$(patsubst %,docs/%,${ASSETS_SRC})
CREATE_PDF=CREATE_PDF.sh
RELEASE=$(HOME)/js-vs-ds-release.zip

# Controls
all : commands

## commands       : show all commands.
commands :
	@grep -h -E '^##' ${MAKEFILE_LIST} | sed -e 's/## //g'

## everything     : generate HTML and PDF.
everything : html pdf

## html           : generate HTML from LaTeX source.
html : ${HTML} ${FIGURES_DST} ${ASSETS_DST}

## pdf            : generate PDF from LaTeX source.
pdf : ${PDF} ${SUMMARIES}

## once           : force a single run of LaTeX.
once :
	${LATEX} book

## release        : prepare a ZIP file for release.
release :
	zip ${RELEASE} ${CREATE_PDF} ${SRC} ${FIGURES_SRC}

# ----------------------------------------

# Regenerate PDF once 'all.tex' has been created.
${PDF} : ${SRC}
	./${CREATE_PDF}

# Generate HTML.
${HTML} : temp.tex template.html bin/post-pandoc.py
	@mkdir -p docs
	${PANDOC} --template=template.html --bibliography=book.bib -o - temp.tex \
	| bin/post-pandoc.py \
	> ${HTML}

# Generate intermediate .tex file.
temp.tex : ${SRC} bin/pre-pandoc.py
	bin/pre-pandoc.py < book.tex > temp.tex

# Generate chapter summaries.
${SUMMARIES} : summaries.tex pdf-settings.tex
	${LATEX} summaries \
	&& ${LATEX} summaries

# Copy figures.
docs/figures/% : figures/%
	@mkdir -p docs/figures
	@cp $< $@

# Copy assets.
docs/assets/% : assets/%
	@mkdir -p docs/assets
	@cp $< $@

# FIXME: Copy CNAME file.
# docs/CNAME : ./CNAME
# 	@mkdir -p docs
# 	@cp $< $@

## ----------------------------------------

## serve          : build site.
serve :
	cd docs && jekyll serve -I

## check          : check internal consistency.
check : spell
	@python bin/check.py -b book.bib -f figures ${TEX}

## clean          : clean up junk files.
clean :
	@rm -f temp.tex book.pdf
	@rm -f *.4ct *.4tc *.aux *.bak *.bbl *.bcf *.blg *.dvi *.idx *.ilg *.ind *.lof *.log *.lot *.out *.run.xml *.tmp *.toc *.xref
	@find . -name '*~' -delete
	@find . -name '_minted-*' -prune -exec rm -r "{}" \;
	@find . -name .DS_Store -prune -exec rm -r "{}" \;

## pages          : pages per chapter.
pages : ${PDF}
	@python bin/pages.py book.log book.toc

## settings       : show settings.
settings :
	@echo LATEX ${LATEX}
	@echo BIBTEX ${BIBTEX}
	@echo PANDOC ${PANDOC}
	@echo TEX ${TEX}
	@echo TEX_CHAPTERS ${TEX_CHAPTERS}
	@echo SRC ${SRC}
	@echo HTML ${HTML}
	@echo PDF ${PDF}
	@echo FIGURES_SRC ${FIGURES_SRC}
	@echo FIGURES_DST ${FIGURES_DST}
	@echo RELEASE ${RELEASE}

## spell          : check spelling.
spell :
	@-cat ${TEX_CHAPTERS} | aspell -t list | sort | uniq | diff -y --suppress-common-lines - etc/wordlist.txt

## words          : count words.
words :
	@texcount -brief ${TEX_CHAPTERS} | sed -e 's/\+.*://g' -e 's/+.* Total//g' | sort -n -r
