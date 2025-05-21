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
    bun install --frozen-lockfile --network-concurrency 700
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
