import React from 'react';
import { Paper, Typography, Grid } from '@mui/material';

function DataInfo({ dataInfo, dataTypes }) { //add dataTypes as a prop to load into data types column
  return (
    <Paper style={{ padding: 16, margin: '16px 0' }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">DATA INFO</Typography>
          {/* Render the stats here */}
          <Typography>Number of rows: {dataInfo.rows}</Typography>
          <Typography>Number of columns: {dataInfo.columns}</Typography>
          <Typography>Columns With Empty Values: {dataInfo.columns_with_empty}</Typography>
          <Typography>Total Duplicate Rows: {dataInfo.total_duplicate_rows}</Typography>
          <Typography>Missing Value Percentage: {dataInfo.missing_percentage}</Typography>
          <Typography>Total Memory Used: {dataInfo.total_memory_used}</Typography>
          {/* ... other stats ... */}
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">DATA TYPE</Typography>
          {/* You'll need to adjust how to display data types based on your data */}
          {/* For example, if you have a dictionary of column names and their data types, you can map through them */}
            {Object.keys(dataTypes).map((column, index) => (
                <Typography key={index}>{column}: {dataTypes[column]}</Typography>
            ))}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default DataInfo;
