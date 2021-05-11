import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import api from './routes/api.js';

// First thing --> Initialize this app. Now we have access to all sorts of methods on that app instance
const app = express();



app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// States that every route inside the api will retrieve data as long as it starts with /api
app.use('/api', api);

// Specifies the port for the server to run on the browser with
// ref: https://medium.com/weekly-webtips/how-to-create-a-rest-api-with-express-js-and-node-js-3de5c5f9691c
app.listen(5000, () => {
  console.log('Example app listening on port 5000!')
});