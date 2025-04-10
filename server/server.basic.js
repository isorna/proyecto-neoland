// /server/server.basic.js
import * as http from 'node:http';
import * as url from 'node:url';

const articlesJSON = `[
  {
    "id": "leche_1",
    "name": "Leche",
    "qty": "12",
    "price": "24"
  },
  {
    "id": "carne_2",
    "name": "Carne",
    "qty": "1",
    "price": "5"
  },
  {
    "id": "fruta_3",
    "name": "Fruta",
    "qty": "1",
    "price": "2"
  },
  {
    "id": "cereales_4",
    "name": "Cereales",
    "qty": "1",
    "price": "3"
  },
  {
    "id": "yogures_5",
    "name": "Yogures",
    "qty": "4",
    "price": "2"
  }
]`;

http.createServer(function server_onRequest (request, response) {
    let pathname = url.parse(request.url).pathname;

    console.log(`Request for ${pathname} received.`);
    // console.log(request.headers);

    // Set Up CORS
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    response.setHeader("Access-Control-Allow-Headers", "*");
    response.setHeader('Access-Control-Max-Age', 2592000); // 30 days
    response.writeHead(200);

    // response.writeHead(200, {'Content-Type': 'application/json'});
    // response.write("<h1>Hello World</h1>");
    response.write(articlesJSON);
    response.end();
}).listen(process.env.PORT, process.env.IP);

console.log('Server running at http://' + process.env.IP + ':' + process.env.PORT + '/');