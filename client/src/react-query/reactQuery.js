import { useQuery } from 'react-query';
import { fetchData } from '../api/api';

// ref: https://www.youtube.com/watch?v=ZfvOHRX-FDM
export const FetchYelp = (geoLoc) => {
  const { data, error, isLoading, refetch } = useQuery('yelp', fetchData(geoLoc), {
    refetchOnWindowFocus: false,
    enabled: false // turned off by default, manual refetch is needed
  })

  return { data, error, isLoading, refetch }
}