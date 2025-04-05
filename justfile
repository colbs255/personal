attributes := "\
    -a revealjs_theme=white \
    -a source-highlighter=highlightjs \
    -a table-caption! \
    -a revealjs_margin=.05 \
    -a revealjs_height=800 \
    -a revealjs_width=1000 \
    -a revealjsdir=reveal.js
    "

dev:
    npm run dev
build:
    npm install
    npx tsx src/script/presentations.ts
    npm run build
test:
    npm test
format:
    npx prettier . --write

