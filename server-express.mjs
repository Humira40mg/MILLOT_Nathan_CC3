/*
    QUESTION 2.1
Pour express : 
  https://expressjs.com/
http-errors :
  https://www.npmjs.com/package/http-errors
loglevel :
  https://www.npmjs.com/package/loglevel
morgan :
  https://www.npmjs.com/package/morgan



    QUESTION 2.2
Les routes "/", ainsi que "/index.html" fonctionnent sans 
problèmes. La route "/random/:nb" aussi si on y met bien un nombre.



    QUESTION 2.3
Les en-tetes sont :
    accept-ranges: bytes
    cache-control: public, max-age=0
    connection: keep-alive
    content-length: 1669
    content-type: text/html; charset=UTF-8
    date: Mon, 30 Sep 2024 04:23:45 GMT
    etag: W/"685-191f7b48066"
    keep-alive: timeout=5
    last-modified: Sun, 15 Sep 2024 22:01:27 GMT
    x-powered-by: Express

Les nouveaux en-têtes sont x-powered-by, last-modified, etag,
cache-control, et accept-ranges.



    QUESTION 2.4 
L'événement listening est déclenché a chaque fois que le serveur
démarre.
*/

import express from "express";
import morgan from "morgan";

const host = "localhost";
const port = 8000;

const app = express();

app.get(["/", "/index.html"], async function (request, response, next) {
  response.sendFile("index.html", { root: "./" });
});

app.get("/random/:nb", async function (request, response, next) {
  const length = request.params.nb;
  const contents = Array.from({ length })
    .map((_) => `<li>${Math.floor(100 * Math.random())}</li>`)
    .join("\n");
  return response.send(`<html><ul>${contents}</ul></html>`);
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);