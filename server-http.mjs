/* QUESTION 1.1
La liste des en-têtes est vide.


  QUESTION 1.2
La liste des en-têtes est toujours vide le seul changement 
dans la réponse concerne le "body".


  QUESTION 1.3
Si il n'y a pas d'erreurs, il devrait recevoir le contenue de la page html.


  QUESTION 1.4
L'erreur reçu est :
Error: ENOENT: no such file or directory, open 'C:\Users\natha\OneDrive\Bureau\UNC\semestre 4\DevWeb\TP5\index.html'
    at async open (node:internal/fs/promises:639:25)
    at async Object.readFile (node:internal/fs/promises:1249:14) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\natha\\OneDrive\\Bureau\\UNC\\semestre 4\\DevWeb\\TP5\\index.html'
}

D'après la documentation l'erreur ENOENT est lancée pour 
indiqué qu'un fichier/entité cherché n'a pas été trouvée.

Modifications sur la gestion d'erreur ligne 39.


  QUESTION 1.5
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    return response.end(contents);
  } catch (error) {
    //QUESTION 1.4
    if (error.code === "ENOENT") {
      response.writeHead(500);
      return response.end();
    }
    console.error(error);
  }
}

  QUESTION 1.6
Cette commande a ajouté le dossier node_modules dans mon projet
ainsi que package-lock.json.

Il y a bien eu un rechargement automatique avec nodemon : 
[nodemon] restarting due to changes...
[nodemon] starting `node server-http.mjs`
NODE_ENV = development
Server is running on http://localhost:8000

Pour la deuxieme commande il ne se passe rien,
 ce n'est pas le même environnement :

> tp5@1.0.0 http-prod
> cross-env NODE_ENV=production node server-http.mjs

NODE_ENV = production
Server is running on http://localhost:8000


  QUESTION 1.7 
Leurs principals différences est le node env qu'on a defini 
dans le package pour indiquer l'état actuel du projet.

Il y a nodemon qui permet d'avoir les changement directement 
sans avoir a relancer le serveur manuelment. Il est
très utile pour le develeoppement du site.

eslint fonctionne :
    88:27  error  'process' is not defined  no-undef

  ✖ 1 problem (1 error, 0 warnings)
  (je n'avais pas encore enlevé le console.log de la question précedente.)

prettier m'a répondu :
  server-http.mjs 48ms


  QUESTION 1.8 
http://localhost:8000/index.html  : 200
http://localhost:8000/random.html : 200
http://localhost:8000/            : 404
http://localhost:8000/dont-exist  : 404
*/
import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    //QUESTION 1.8
    const urlSplited = request.url.split("/");
    switch (urlSplited[1]) {
      
      case "" :
        response.writeHead(200);
        return response.end(contents);
      
        case "index.html" :
        response.writeHead(200);
        return response.end(contents);
      
        case "random.html":
        response.writeHead(200);
        //Gestion si le nombre n'est pas spécifié
        if (urlSplited.length < 3) return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
        return response.end(`<html><p>${Math.floor(parseInt(urlSplited[2]) * Math.random())}</p></html>`);
      
        default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});