import axios from 'axios';

// ref: https://blog.bearer.sh/yelp-api-how-to/
// Package: https://stackoverflow.com/questions/53680956/yelp-api-authentication-with-express
export const getYelpAPI = async (req, res) => {
  const API_KEY = process.env.YELP_API_KEY
  const { latitude, longitude, radius, location, term, sort_by, open_now } = req.query;

  const data = await axios.get('https://api.yelp.com/v3/businesses/search', {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    },
    params: {
      latitude,
      longitude,
      radius,
      term,
      sort_by,
      open_now,
      limit: 50
    }
  })
    .then(({ data }) => data)
    .catch((error) => console.log(error));

  res.status(200).send(data);
}