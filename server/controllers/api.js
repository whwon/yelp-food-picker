import axios from 'axios';

// ref: https://blog.bearer.sh/yelp-api-how-to/
// Package: https://stackoverflow.com/questions/53680956/yelp-api-authentication-with-express
export const getYelpAPI = async (req, res) => {
  // let API_KEY = process.env.YELP_API_KEY

  const data = await axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    },
    params: {
      location: "sacramento",
      term: "coffee",
      limit: 1,
    }
  })
    .then(({ data }) => data.businesses[0].name)
    .catch((error) => console.log(error));

  res.status(200).send(`this works still! ${data}`);
}