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



    QUESTION 2.5 
L'option activé défaut est 'index', pour le modifier on peut ajouter en argument
un objet { index: "cequonveux.html" } dans 'express.static'.



    QUESTION 2.6
Si on active le cache alors avec Ctrl+R on obtient un 
status 304 qui signifie "NOT MODIFIED" donc que le style.css 
est toujours dans le cache.
Avec Ctrl+shift+R on a un status 200 on a bien re-téléchargé
le fichier.
*/

import express from "express";
import morgan from "morgan";
import createError from "http-errors";

const host = "localhost";
const port = 8000;

const app = express();

if (app.get("env") === "development") app.use(morgan("dev"));

app.set("view engine", "ejs");

app.use(express.static("static"));

app.get("/random/:nb", async function (request, response, next) {
    //QUESTION 2.6 : Gestion d'Erreurs. 
    const length = Number.parseInt(request.params.nb, 10);
    if (Number.isNaN(length)) return next(createError(400));

    const numbers = Array.from({ length })
        .map(() => Math.floor(100 * Math.random()));
    const welcome = "Génération de nombre floppèsques...";

    return response.render("random", {numbers, welcome});
});

const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);