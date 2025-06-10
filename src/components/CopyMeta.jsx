import React from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';

const CopyMeta = ({ meta }) => {
  const html = `
    <meta property="og:title" content="${meta.title || ''}" />
    <meta property="og:description" content="${meta.description || ''}" />
    <meta property="og:image" content="${meta.images?.[0] || ''}" />
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(html);
    alert('Meta tags copied!');
  };

  return (
    <Box mt={3}>
      <Typography variant="subtitle1">Meta Tag Code</Typography>
      <Paper variant="outlined" sx={{ p: 2, mt: 1, whiteSpace: 'pre-wrap', fontFamily: 'monospace' }}>
        {html}
      </Paper>
      <Button variant="outlined" onClick={handleCopy} sx={{ mt: 1 }}>
        Copy Meta Tags
      </Button>
    </Box>
  );
};

export default CopyMeta;