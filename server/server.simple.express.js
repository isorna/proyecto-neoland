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
app.get('/read/users', (req, res) => {
  crud.read(USERS_URL, (data) => {
    console.log('server read users', data)

    res.send(JSON.stringify(data));
  });
});

app.post('/create/users', (req, res) => {
  crud.create(USERS_URL, req.body, (data) => {
    console.log(`server create user ${data.name} creado`, data)
    res.send(JSON.stringify(data));
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})