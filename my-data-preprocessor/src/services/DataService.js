const baseUrl = 'http://localhost:5500'; // Adjust if your Flask port differs

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(`${baseUrl}/upload`, {
    method: 'POST',
    body: formData,
  }).then(response => response.json());
};

export const processFile = (fileId, options) => {
    const payload = { ...options, file_id: fileId };
    
    return fetch(`${baseUrl}/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then(response => response.json());
  };