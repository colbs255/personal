attributes := "\
    -a revealjs_theme=white \
    -a source-highlighter=highlightjs \
    -a table-caption! \
    -a revealjs_margin=.05 \
    -a revealjs_height=800 \
    -a revealjs_width=1000 \
    -a revealjsdir=reveal.js
    "

install:
    curl -L https://github.com/plantuml/plantuml/releases/download/v1.2025.2/plantuml-gplv2-1.2025.2.jar -o plantuml.jar
    bun install --frozen-lockfile
build:
    bun src/script/slides.ts
    bun run build
dev:
    bun run dev
test:
    bun test
format:
    bunx prettier . --write
lint:
    bunx prettier . --check
