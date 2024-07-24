FROM node:20.15.1-slim@sha256:b21bcf3e7b6e68d723eabedc6067974950941167b5d7a9e414bd5ac2011cd1c4 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build --filter=api
RUN pnpm deploy --filter=api --prod /prod/api

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
EXPOSE 8888
CMD [ "pnpm", "start" ]
