import React from 'react';
import { TextField, Button, Stack } from '@mui/material';

const MetaForm = ({ url, setUrl, onScrape }) => {
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <Stack spacing={2} mt={3}>
      <TextField
        label="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        error={!!url && !isValidUrl(url)}
        helperText={!isValidUrl(url) && url ? 'Enter a valid URL' : ''}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={onScrape}
        disabled={!isValidUrl(url)}
      >
        Check Website
      </Button>
    </Stack>
  );
};

export default MetaForm;
