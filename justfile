install:
    bun install --frozen-lockfile
build:
    bun src/script/slides.ts
    bun run build
dev:
    bun run dev
test:
    bun test
format:
    biome check --write
lint:
    biome ci
