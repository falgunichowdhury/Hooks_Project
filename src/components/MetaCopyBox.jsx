// components/MetaCopyBox.jsx
import React from 'react';
import { Paper, Typography, Box, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const MetaCopyBox = ({ meta }) => {
  const metaHTML = `
<!-- HTML Meta Tags -->
<title>${meta.title || ''}</title>
<meta name="description" content="${meta.description || ''}" />

<!-- Facebook Meta Tags -->
<meta property="og:url" content="${meta.url || ''}" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${meta.title || ''}" />
<meta property="og:description" content="${meta.description || ''}" />
<meta property="og:image" content="${meta.image || ''}" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${meta.title || ''}" />
<meta name="twitter:description" content="${meta.description || ''}" />
<meta name="twitter:image" content="${meta.image || ''}" />
`.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaHTML);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Copy 📋</Typography>
        <IconButton onClick={copyToClipboard}><ContentCopyIcon /></IconButton>
      </Box>
      <Box
        component="pre"
        sx={{
          mt: 2,
          backgroundColor: '#f4f4f4',
          p: 2,
          borderRadius: 2,
          overflowX: 'auto',
          fontSize: '0.75rem',
        }}
      >
        {metaHTML}
      </Box>
    </Paper>
  );
};

export default MetaCopyBox;
