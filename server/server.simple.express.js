import express from 'express';
import bodyParser from 'body-parser';
import { crud } from "./server.crud.js";

const app = express();
const port = process.env.PORT;
const USERS_URL = './server/BBDD/users.json'

// Static server
app.use(express.static('src'));
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// API ENDPOINTS
// LECTURA: GET
app.get('/read/users', (req, res) => {
  crud.read(USERS_URL, (data) => {
    console.log('server read users', data)

    res.send(JSON.stringify(data));
  });
});
// LOGIN: POST
app.post('/login', (req, res) => {
  crud.login(USERS_URL, req.body, (foundUserData) => {
    console.log('server login', foundUserData)
    res.send(JSON.stringify(foundUserData));
  });
})
// CREACION: POST
app.post('/create/users', (req, res) => {
  crud.create(USERS_URL, req.body, (data) => {
    console.log(`server create user ${data.name} creado`, data)
    res.send(JSON.stringify(data));
  });
});
// ACTUALIZACION: PUT (+id)
app.put('/update/users/:id', (req, res) => {
  crud.update(USERS_URL, req.params.id, req.body, (data) => {
    console.log(`server update user ${data.name} actualizado`, data)
    res.send(JSON.stringify(data));
  });
})
// BORRRADO: DELETE (+id)
app.delete('/delete/users/:id', (req, res) => {
  crud.delete(USERS_URL, req.params.id, (data) => {
    console.log(`server delete user ${data.name} borrado`, data)
    res.send(JSON.stringify(data));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})