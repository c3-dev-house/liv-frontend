import React from 'react';
import { styled } from '@mui/system';

const BrandLine = styled('div')({
  display: 'flex',
  width: '100%',
  height: '4px',
  '& > div': {
    flex: 1,
    height: '100%',
  },
});

const colors = [
  '#2BEE0A', '#80FE02', '#FBDB00', '#FF8003', '#FE0207', '#7E01FB', '#1663FF', '#4EDBFF'
];

const BrandLineComponent = () => (
  <BrandLine>
    {colors.map((color, index) => (
      <div key={index} style={{ backgroundColor: color }}></div>
    ))}
  </BrandLine>
);

export default BrandLineComponent;
