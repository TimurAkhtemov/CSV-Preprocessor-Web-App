import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button } from '@mui/material';

function FillMissingDataTab({ columns, onFillMissing }) {
  const [selectedColumn, setSelectedColumn] = useState('');
  const [fillValue, setFillValue] = useState('');

  return (
    <div>
      <FormControl style={{ minWidth: 120 }}>
        <InputLabel>Select columns</InputLabel>
        <Select
          value={selectedColumn}
          onChange={e => setSelectedColumn(e.target.value)}
        >
          {columns.map((column, index) => (
            <MenuItem key={index} value={column}>{column}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Replace with"
        value={fillValue}
        onChange={e => setFillValue(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => onFillMissing(selectedColumn, fillValue)}
      >
        Fill Missing
      </Button>
    </div>
  );
}
