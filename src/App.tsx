import React from 'react';
import Header from './Components/Header';
import { Divider, Stack } from '@mui/material';
import Product from './Products/Product';

function App() {
  return (
    <div>
      <Stack>
      <Header/>
      <Divider/>
      <Product/>
      </Stack>
    </div>
  );
}

export default App;
