import React, {useState} from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import axios from 'axios';

import './DesignerSignupForm.css';

const DesignerSignup = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [description, setDescription] = useState('')
  const [resume, setResume] = useState('')

  const [errors, setErrors] = useState([])
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState('')
  const history = useHistory()

  const getResume = e => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0])
    }
  };

  let generatePutUrl;
  let options;
  const uploadResume = e => {
    e.preventDefault();
    setMessage('Uploading...')
    const contentType = file.type; // eg. image/jpeg or image/svg+xml
    generatePutUrl = 'api/uploads/put-url';
    options = {
      params: {
        Key: `resumes/${file.name}`,
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
            setResume(realKey)
            // setTimeout(()=>{
            //   setMessage('');
            //   document.querySelector('#upload-resume').value='';
            // }, 2000)
          })
          .catch(err => {
            setMessage('Sorry, something went wrong')
          });
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const active = false;
      return (
        dispatch(sessionActions.signup({ email, username, password, firstName, lastName, active, description, resume }))
        .then (() => returnHome())
      )
        .catch(res => {
          if (res.data && res.data.errors) {
            setErrors(res.data.errors)
          }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const returnHome = () => {
    let path = '/'
    history.push(path);
  }

  return !sessionUser &&(
      <div className='designer-signup-container'>
        <div className='designer-signup-main-image-container pattern-cross-dots-xl'>
          <img className="designer-signup-main-image" src="./images/Designers-signup.png" />
        </div>
        <div className='designer-signup-text'>
          <h1 className='designer-signup-title'>Join our incredible team of designers today!</h1>
          <p>Tell us a little about yourself so we can get to know you and see if you'll fit with our team.  We'll be in contact with you shortly.</p>
        </div>
      <div className='designer-signup-form-container'>
        <form className='designer-signup-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      <div className='designer-signup-names-container'>
          <input
          className='signup-special-input__1'
          placeholder='First Name'
          value={firstName}
          type='text'
          onChange={ e => setFirstName(e.target.value) }
          required
          />
          <input
          className='signup-special-input__2'
          placeholder='Last Name'
          value={lastName}
          type='text'
          onChange={ e => setLastName(e.target.value) }
          required
        />
      </div>
        <input
          placeholder='Email'
          value={email}
          type='email'
          onChange={ e => setEmail(e.target.value) }
          required
        />
        <input
          placeholder='Username'
          value={username}
          type='text'
          onChange={ e => setUsername(e.target.value) }
          required
        />
        <input
          placeholder='Password'
          value={password}
          type='password'
          onChange={ e => setPassword(e.target.value) }
          required
          />
        <input
          placeholder='Confirm Password'
          value={confirmPassword}
          type='password'
          onChange={ e => setConfirmPassword(e.target.value) }
          required
          />
        <p>Description </p>
        <textarea
          placeholder='Why do you want to become part of our team?'
          value={description}
          onChange={ e => setDescription(e.target.value) }
          required
          />
        <div className='designer-signup-upload-resume'>
          <h1 className='designer-signup-form-resume-title'>Upload Resume</h1>
          <div className='designer-signup-upload-container'>
            <input
              id='upload-resume'
              type='file'
              accept='.pdf, .docx, .doc'
              onChange={getResume}
            />
            <p>{message}</p>
            <div className='upload-image-form' onClick={uploadResume}>
              <button id='file-upload-button'>Upload</button>
            </div>
          </div>
          </div>
      <div className='designer-signup-buttons-container'>
        <button className='designer-signup-button-submit-button' type="submit"> Submit </button>  
        <button className='designer-signup-return-home-button' onClick={returnHome}>Home</button>  
      </div>
        </form>
      </div>
      </div>
    
  )
}

export default DesignerSignup;