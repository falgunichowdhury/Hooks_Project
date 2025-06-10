import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Box,
  Button,
  Stack,
  Paper
} from '@mui/material';
import CopyMeta from './CopyMeta';
import MetaPreview from './MetaPreview';

const MetaResult = ({ data }) => {
  const [meta, setMeta] = useState({});

  useEffect(() => {
    if (data) setMeta(data);
  }, [data]);

  const handleChange = (e) => {
    setMeta({ ...meta, [e.target.name]: e.target.value });
  };

  if (!data) return null;

  return (
    <Box mt={4}>
      <Typography variant="h6">Edit Meta Tags</Typography>
      <Stack spacing={2}>
        <TextField label="Title" name="title" value={meta.title || ''} onChange={handleChange} />
        <TextField label="Description" name="description" value={meta.description || ''} onChange={handleChange} />
        <TextField label="Image" name="image" value={meta.images?.[0] || ''} onChange={handleChange} />
      </Stack>

      <CopyMeta meta={meta} />
      <MetaPreview meta={meta} />
    </Box>
  );
};

export default MetaResult;