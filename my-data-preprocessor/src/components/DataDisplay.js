import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';

function DataDisplay({ data }) {
  if (!data || data.length === 0) {
    return <div>No data to display</div>;
  }

  const headers = Object.keys(data[0]);

  return (
    <TableContainer component={Paper} style={{ maxHeight: 500, overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {headers.map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {headers.map(header => (
                <TableCell key={`${index}-${header}`}>{row[header]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataDisplay;
