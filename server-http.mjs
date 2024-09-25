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

Modifications sur la gestion d'erreur ligne 45.
*/
import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

//QUESTION 1.5 async/await pour requestListener
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    return response.end(contents); 
  } 
  catch(error) {
    //QUESTION 1.4
    if (error.code === 'ENOENT') {
      response.writeHead(500);
      return response.end();
    }
    console.error(error);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});