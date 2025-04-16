attributes := "\
    -a revealjs_theme=white \
    -a source-highlighter=highlightjs \
    -a table-caption! \
    -a revealjs_margin=.05 \
    -a revealjs_height=800 \
    -a revealjs_width=1000 \
    -a revealjsdir=reveal.js
    "

build:
    npm install
    npx tsx src/script/slides.ts
    npm run build
dev:
    npm run dev
test:
    npm test
format:
    npx prettier . --write
lint:
    npm run lint
