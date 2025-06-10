import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

const MetaPreview = ({ meta }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
      <Typography variant="h6">Preview 👁️</Typography>

      <Box mt={2}>
        <Typography variant="subtitle2" gutterBottom>FACEBOOK</Typography>
        <Box sx={{ border: '1px solid #ccc', p: 1 }}>
          {meta.image && <img src={meta.image} alt="Preview" style={{ width: '100%' }} />}
          <Typography variant="body2" fontWeight="bold">{meta.title}</Typography>
          <Typography variant="body2">{meta.description}</Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography variant="subtitle2" gutterBottom>X (FORMERLY TWITTER)</Typography>
        <Box sx={{ border: '1px solid #ccc', p: 1 }}>
          {meta.image && <img src={meta.image} alt="Preview" style={{ width: '100%' }} />}
          <Typography variant="body2" fontWeight="bold">{meta.title}</Typography>
          <Typography variant="body2">{meta.description}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default MetaPreview;