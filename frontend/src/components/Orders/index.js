import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';
import Upload from '../../imageUploader/Upload'
import Gallery from '../../imageUploader/Gallery'

import './Orders.css';

function transformUploads(uploads) {
  return uploads.map(u => ({
    original: u.imageUrl,
    thumbnail: u.thumbnailUrl
  }));
}

function Orders() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  const [images, setImages] = useState(null);

  const fetchUploads = useCallback(() => {
    fetch('/api/uploads')
      .then(response => response.json().then(data => setImages(transformUploads(data))))
      .catch(console.error)
  }, []);

  useEffect(() => {
    fetchUploads();
  }, [fetchUploads])
  

  return (
    <>
      <div className="container">
        <div className="upload-container">
          <Upload fetchUploads={fetchUploads} />
        </div>
      </div>
      <div className="container">
        <div className="gallery-container">
          {images && images.length ? (
            <Gallery images={images} />
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Orders;