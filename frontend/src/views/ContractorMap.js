import React from 'react';
import { Box} from '@mui/material';
import { theme } from '../theme.js';

const loadedResults = [
  {
    title: 'Toilet Broken',
    image: 'https://do5nkkzntcenb.cloudfront.net/ASCA/Bathroom/Toilets/Floor%20Standing%20Toilets/207AA104/2sng2p8687r0v2i29c8lnuw9yv70cih7.jpg',
    distance: 15,
    date: 'Aug 20, 2022',
    description: 'My toilet is not working rip.',
  },
  {
    title: 'Toilet Broken',
    image: 'https://do5nkkzntcenb.cloudfront.net/ASCA/Bathroom/Toilets/Floor%20Standing%20Toilets/207AA104/2sng2p8687r0v2i29c8lnuw9yv70cih7.jpg',
    distance: 15,
    date: 'Aug 20, 2022',
    description: 'My toilet is not working rip.',
  },
  {
    title: 'Toilet Broken',
    image: 'https://do5nkkzntcenb.cloudfront.net/ASCA/Bathroom/Toilets/Floor%20Standing%20Toilets/207AA104/2sng2p8687r0v2i29c8lnuw9yv70cih7.jpg',
    distance: 15,
    date: 'Aug 20, 2022',
    description: 'My toilet is not working rip.',
  },
];


function Maps() {
  return (
    <Box style={styles.box}>
    </Box>
  );
}

export default Maps;

const styles = {
  box: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: theme.secondary,
  },
  map: {
    backgroundColor: theme.secondary,
    width: '70%',
  },
  result_pane: {
    backgroundColor: theme.primary,
    width: '30%',
    height: '100%',
  },
  result_item: {
    backgroundColor: theme.secondary,
    margin: 10,
    borderRadius: 5,
  },
  result_image: {
    width: '100px'
  }

};
