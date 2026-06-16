FROM denoland/deno:2.5.6 AS build
WORKDIR /app
COPY . .
RUN deno install
RUN deno task build
RUN deno task compile

FROM gcr.io/distroless/cc-debian12:nonroot
WORKDIR /app
COPY --from=build /app/server ./server
ENV HOSTNAME=0.0.0.0
ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["/app/server"]
