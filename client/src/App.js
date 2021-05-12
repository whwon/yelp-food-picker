import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TopAppBar } from './components/TopAppBar';
import { GeoLocation } from './components/GeoLocation'
import { CssBaseline, Paper } from '@material-ui/core';

// ref: https://www.youtube.com/watch?v=ngc9gnGgUdA
const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ height: '100vh', width: '100%' }}>
        <CssBaseline />
        <TopAppBar />
        <Paper style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <GeoLocation />
        </Paper>
      </div>
    </QueryClientProvider>

  )
}

export default App;