import React from 'react';
import Dropzone from "react-dropzone-uploader";
import 'react-dropzone-uploader/dist/styles.css'

function Upload({ fetchUploads }) {
  const getUploadParams = ({ file }) => {
    const body = new FormData()
    body.append('image', file)
    return {
      url: '/api/uploads',
      body
    };
  }

  const handleSubmit = (files, allFiles) => {
    allFiles.forEach(f => f.remove())
    fetchUploads();
  }

  return (
    <div>
      <Dropzone
        getUploadParams={getUploadParams}
        onSubmit={handleSubmit}
        accept="image/*"
        maxFiles={1}
        multiple={false}
        styles={{
          dropzone: { minHeight: 200, maxHeight: 250 }
        }}
      />
    </div>
  );
}

export default Upload;