import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import api from './routes/api.js';
dotenv.config();

// To run backend run 'npm start'

// First thing --> Initialize this app. Now we have access to all sorts of methods on that app instance
const app = express();
const port = process.env.PORT || 5000

app.use(cors());

// States that every route inside the api will retrieve data as long as it starts with /api
app.use('/api', api);

// Specifies the port for the server to run on the browser with
// ref: https://medium.com/weekly-webtips/how-to-create-a-rest-api-with-express-js-and-node-js-3de5c5f9691c
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});