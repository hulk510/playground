import { Box, Button, css } from '@kuma-ui/core';
import { useReducer } from 'react';

const green = css`
  background: green;
`;

const blue = css`
  background: blue;
`;

export function Client() {
  const [checked, toggle] = useReducer((state) => !state, false);

  return (
    <Box className={checked ? green : blue} p={12}>
      <Button onClick={() => toggle()}>Change Background Color</Button>
    </Box>
  );
}
