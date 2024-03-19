import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Paper, Typography, Button } from '@mui/material';
import { uploadFile } from '../services/DataService';

function FileUpload({ onFileUploaded }) {
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    uploadFile(file).then(data => {
      onFileUploaded(data);
    });
  }, [onFileUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Paper variant="outlined" {...getRootProps()} style={{ 
      padding: 20, 
      textAlign: 'center', 
      transition: 'transform 0.5s ease', // Smooth transition for scaling
      transform: isDragActive ? 'scale(1.05)' : 'scale(1)' // Scale up when active, scale down when not
    }}>
      <input {...getInputProps()} />
      <CloudUploadIcon style={{ fontSize: 50 }} />
      <Typography variant="subtitle1">Drag 'n' drop some files here, or click to select files</Typography>
      <Button variant="contained" component="span">
        Upload File
      </Button>
    </Paper>
  );
}

export default FileUpload;
