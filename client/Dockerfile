FROM oven/bun

WORKDIR /opt/client
COPY . .

RUN bun install && bun run build

ENTRYPOINT [ "bun", "run", "preview", "--host", "--port 8080" ]
