import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import PreprocessingOptions from './components/PreprocessingOptions';
import DataDisplay from './components/DataDisplay';
import { processFile } from './services/DataService';
import { Container, Grid, Box } from '@mui/material';
import { Typography } from '@mui/material';
import DataInfo from './components/DataInfo'; // Import the DataInfo component

function App() {
  const [fileId, setFileId] = useState(null); // State hook for file ID
  const [data, setData] = useState([]); // State hook for actual data
  const [processedData, setProcessedData] = useState([]); // State hook for processed data
  const [columns, setColumns] = useState([]);
  const [dataInfo, setDataInfo] = useState({}); // State hook for data statistics
  const [dataTypes, setDataTypes] = useState({}); // State hook for data types

  const handleFileUploaded = (uploadResponse) => {
    setFileId(uploadResponse.file_id); // Save the file ID
    setData(uploadResponse.data); // Save the uploaded data
    setProcessedData(uploadResponse.data); // Save the uploaded data as processed data
    setColumns(Object.keys(uploadResponse.data[0]));
    setDataInfo(uploadResponse.dataInfo); // Save the data statistics
    setDataTypes(uploadResponse.dataTypes); // Save the data types
    console.log(dataInfo)
  };
  const handleOptionsSelected = (options) => {
    if (fileId) { // Check if fileId is not null
      processFile(fileId, options).then(responseData => {
        setProcessedData(responseData); // Save the processed data
      }).catch(error => {
        console.error('Error processing file:', error);
      });
    } else {
      console.error('File ID is not set. Make sure a file is uploaded first.');
    }
  };

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          CSV Preprocessor
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FileUpload onFileUploaded={handleFileUploaded} />
        </Grid>
        {data && data.length > 0 && ( // Ensure data exists and has length before rendering
          <>
            <Grid item xs={12}>
              <DataInfo dataInfo={dataInfo} dataTypes={dataTypes} /> {/* Render DataInfo only when data is available */}
            </Grid>
            <Grid item xs={12}>
              <PreprocessingOptions onProcess={handleOptionsSelected} columns={columns} />
            </Grid>
            <Grid item xs={12}>
              <DataDisplay data={processedData} /> {/* Render DataDisplay only when data is available */}
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
  
}

export default App;


