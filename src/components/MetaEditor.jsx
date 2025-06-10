import React from 'react';
import { TextField, Paper, Stack, Typography, Button } from '@mui/material';

const MetaEditor = ({ meta, setMeta }) => {
  const handleChange = (field) => (e) => {
    setMeta((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Paper elevation={3} sx={{ p: 3, flex: 1 }}>
      <Typography variant="h6" gutterBottom>Edit ✏️</Typography>

      <Stack spacing={2}>
        <TextField
          label="Title"
          value={meta.title || ''}
          onChange={handleChange('title')}
          helperText="Recommended: 60 characters"
          fullWidth
        />
        <TextField
          label="Description"
          value={meta.description || ''}
          onChange={handleChange('description')}
          helperText="Recommended: 155–160 characters"
          fullWidth
          multiline
          rows={3}
        />
        <TextField
          label="Image URL"
          value={meta.image || ''}
          onChange={handleChange('image')}
          fullWidth
        />
        <Button variant="outlined" fullWidth>Choose OG Image Template</Button>
      </Stack>
    </Paper>
  );
};

export default MetaEditor;