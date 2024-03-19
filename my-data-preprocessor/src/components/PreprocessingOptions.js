import React, { useState } from 'react';
import { Button, TextField, Autocomplete } from '@mui/material';

function PreprocessingOptions({ onProcess, columns }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [replacement, setReplacement] = useState('');

  let x = 0;

  const handleColumnChange = (event, newValue) => {
    setSelectedColumn(newValue);
  };

  const handleReplacementChange = (event) => {
    setReplacement(event.target.value);
  };

  const handleProcess = () => {
    onProcess({
      operation: 'fillMissing',
      column: selectedColumn,
      value: replacement
    });
    // Reset the selection (optional)
    setSelectedColumn('');
    setReplacement('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
      <Autocomplete
        options={columns}
        getOptionLabel={(option) => option}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Select Column" />}
        value={selectedColumn}
        onChange={handleColumnChange}
        freeSolo // Allows user to input text not in the options
      />
      <TextField
        label="Replace With"
        variant="outlined"
        value={replacement}
        onChange={handleReplacementChange}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleProcess}
      >
        Fill Missing
      </Button>
    </div>
  );
}

export default PreprocessingOptions;
