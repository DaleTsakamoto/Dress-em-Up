import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import Dropzone from "react-dropzone-uploader";
import './NewRequest.css';

import Upload from '../../imageUploader/Upload'
import Gallery from '../../imageUploader/Gallery'

import * as requestActions from '../../store/requests';
import * as userActions from '../../store/users';

function NewRequest({open, onClose, designerId, setDesignerId}) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const designers = useSelector(state => state.users.newRequest)
  const [images, setImages] = useState([])
  const [imagesArray, setImagesArray] = useState([])
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('')
  const [apparelChoice, setApparelChoice] = useState([])
  // const [designerId, setDesignerId] = useState(null)
  const [errors, setErrors] = useState([])
  const [message, setMessage] = useState('')
  const [file, setFile] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hidden, setHidden] = useState(true)
  const userId = sessionUser.id

  useEffect(() => {
    dispatch(userActions.searchNewRequestDesigners())
      .then((res) => {
        setDesignerId(Object.values(res.data.designers)[0].id)
      })
      .then(() => setIsLoaded(true))
}, [dispatch])

  const getImage = e => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0])
    }
  };

  const uploadFile = e => {
    e.preventDefault();
    setMessage('Uploading...')
    const contentType = file.type; // eg. image/jpeg or image/svg+xml
    const generatePutUrl = 'api/uploads/put-url';
    const options = {
      params: {
        Key: file.name,
        ContentType: contentType
      },
      headers: {
        'Content-Type': contentType
      }
    };

    axios.get(generatePutUrl, options).then(res => {
      const {
        data: { putURL, realKey }
      } = res;
      axios
        .put(putURL, file, options)
        .then(res => {
          setMessage('Upload Successful')
          setTimeout(()=>{
            setMessage('');
            setImage(realKey)
            setImagesArray([...images, realKey])
            document.querySelector('#upload-image').value='';
          }, 2000)
        })
        .catch(err => {
          setMessage('Sorry, something went wrong')
          console.log('err', err);
        });
    });
  };

  useEffect(() => {
    const generateGetUrl = 'api/uploads/get-url';
    const options2 = {
      params: {
        Key: image,
        ContentType: 'image/jpeg',
        expires: 31536000,
      }
    };

    axios.get(generateGetUrl, options2).then(res => {
      const { data: getURL } = res;
      if (!getURL.message) {
        setImages([getURL, ...images])
      }
      setIsLoaded(true)
    });
  }, [image]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (hidden) {
      setHidden(false)
    }
        dispatch(requestActions.requestAdd({ userId, imagesArray, description, designerId, apparelChoice }))
        .catch(res => {
          if (res.data && res.data.errors) {
            setErrors(res.data.errors)
          } else {
            return setErrors([])
          }
        });
    return errors;
  };

  const checkedApparel = (e) => {
    if (e.target.checked) {
      setApparelChoice([...apparelChoice, e.target.name])
    } else {
      apparelChoice.splice(apparelChoice.indexOf(e.target.name), 1)
    }
  }


  const submitClear = () => {
    setImages([])
    setImagesArray([])
    setImage(null)
    setDescription('')
    setApparelChoice([])
    onClose()
  }

  return isLoaded &&(
    <div className={`${open ? 'new-request-form-holder-open' : hidden ? 'new-request-form-holder-close new-request-hide' : 'new-request-form-holder-close'}`}>
        <div className='new-request-header'>
        <i class="fas fa-arrow-left" onClick={() => {
          if (hidden) {
            setHidden(false)
          }
          onClose()
        }
        }></i>
      </div>
      <h1 className='new-request-form-title'>New Request</h1>
      <div className='pattern-cross-dots-lg new-request-form-container-background'>
        <h1 className='new-request-form-subtitle'>Upload Images</h1>
        {/* <div className='new-request-form-container'> */}
        <div className='new-request-upload-container'>
        <input
          id='upload-image'
          type='file'
          accept='image/*'
          onChange={getImage}
        />
        <p>{message}</p>
        <form onSubmit={uploadFile}>
          <button id='file-upload-button'>Upload</button>
        </form>
      <div className='new-request-preview-container'>
          {isLoaded && (
          <div className='new-request-preview'>
                <img
                  id='show-picture'
                  src={images[0]}
                  alt='File preview'
                />
              </div>
          )}
            </div>
          </div>
          <h1 className='new-request-form-subtitle-2'>More Details</h1>
          <div className='new-request-main-form-container'>
          <form onSubmit={() => {
            handleSubmit()
            submitClear()
          }
          } className="new-request-form">
            <ul>
                {errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
        </ul>
          <div className='new-request-textarea-holder'>
          <label id='description-label' htmlFor='description'>Description</label>
            <textarea
            name='description'
            className='signup-input-description'
            placeholder='Give more details'
            value={description}
            onChange={ e => setDescription(e.target.value) }
            required
          />
        </div>
          <h2 className='new-request-clothing-type'>Type of Clothing</h2>
            <div className='new-request-input-holder'>
              <div className='new-request-input-holder-ind'>
                <label htmlFor='outerwear'>Outerwear</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='outerwear'
                  type='checkbox'
                />
              </div>
              <div className='new-request-input-holder-ind'>
                <label htmlFor='dress'>Dress</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='dress'
                  type='checkbox'
                />
              </div>
              <div className='new-request-input-holder-ind'>
                <label htmlFor='pants'>Pants</label>
                <input
                onChange={e => checkedApparel(e)}
                name='pants'
                type='checkbox'
                />
              </div>
              <div className='new-request-input-holder-ind'>
                <label htmlFor='shirt'>Shirt</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='shirt'
                  type='checkbox'
                />
              </div>
              <div className='new-request-input-holder-ind'>
                <label htmlFor='other'>Other</label>
                <input
                  onChange={e => checkedApparel(e)}
                  name='other'
                  type='checkbox'
                />
              </div>
        </div>
        <div className='new-request-designers'>
        <p id='new-request-designers-label'> Choose a Designer: </p>
          <select id='designer' onChange={e => setDesignerId(e.target.value)} name="designer">
                {designers ? Object.values(designers).map((person, idx) => {
        return (
          <option key={idx} value={person.id}>{person.firstName} {person.lastName}</option>
        )
          })
                :
                null
    }
          </select>
          </div>
        <div className='signup-button-holder'>
          <button type="submit" className="signup-button">Send Request</button>
        </div>
            </form>
            </div>
      </div>
      {/* </div> */}
      </div>
);
}

export default NewRequest; 