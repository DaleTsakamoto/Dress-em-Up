import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, Redirect } from 'react-router-dom'

import * as sessionActions from '../../store/session';

import './Account.css';

function Account() {
  const history = useHistory()
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const logout = (e) => {
    dispatch(sessionActions.logout());
    let path = '/'
    return history.push(path);
  };

  return (
    <>
      <div className="account-main">
        <div className='account-header-info'>
          <i className="fas fa-user-circle"></i>
          <h1>{sessionUser.firstName} {sessionUser.lastName}</h1>
          <p>Edit Account</p>
        </div>
        <div className='account-places pattern-cross-dots-lg'>
          <p>Saved Locations</p>
        </div>
        <div className='account-places-home'>
          <i className="fas fa-home"></i>
          <p className='account-places-home-header'>Home</p>
          {sessionUser.address ? 
            <div className='account-places-home-address'>
              <p>{sessionUser.address}<br />
              {sessionUser.city}, {sessionUser.state}, {sessionUser.zipCode}</p>
            </div>
            :
            null
        }
        </div>
        <div className='account-places-spacer pattern-cross-dots-lg'></div>
        <div className='account-logout' onClick={logout}><p>Log Out</p></div>
        <div className='account-bottom pattern-cross-dots-lg'></div>
      </div>
    </>
  )
}

export default Account;






// import React, {useState, useEffect, useCallback} from 'react'
// import * as sessionActions from '../../store/session'
// import { useDispatch, useSelector } from 'react-redux'
// import './NewRequest.css';

// import Upload from '../../imageUploader/Upload'
// import Gallery from '../../imageUploader/Gallery'

// function NewRequest({open, onClose}) {
//   const dispatch = useDispatch()
//   const sessionUser = useSelector(state => state.session.user)
//   const [images, setImages] = useState(null);
//   const [firstName, setFirstName] = useState(sessionUser.firstName)
//   const [lastName, setLastName] = useState(sessionUser.lastName)
//   const [email, setEmail] = useState(sessionUser.email)
//   const [username, setUsername] = useState(sessionUser.username)
//   const [errors, setErrors] = useState([])

//   function transformUploads(uploads) {
//     return uploads.map(u => ({
//       original: u.imageUrl,
//       thumbnail: u.thumbnailUrl
//     }));
//   }

//   const fetchUploads = useCallback(() => {
//     fetch('/api/uploads')
//       .then(response => response.json().then(data => setImages(transformUploads(data))))
//       .catch(console.error)
//   }, []);

//   useEffect(() => {
//     fetchUploads();
//   }, [fetchUploads])


//   const handleSubmit = (e) => {
//     e.preventDefault();
//         dispatch(sessionActions.signup({ email, username, firstName, lastName }))
//         .catch(res => {
//           if (res.data && res.data.errors) {
//             setErrors(res.data.errors)
//           } else {
//             return setErrors([])
//           }
//         });
//     return errors;
//   };

//   return (
//     <div className={`pattern-cross-dots-xl ${open ? 'new-request-form-holder-open' : 'new-request-form-holder-close'}`}>
//         <i class="fas fa-arrow-left" onClick={onClose}></i>
//         <h1 className='signup-form-title'>Sign-Up</h1>
//         <form onSubmit={handleSubmit} className="signup-form">
//             <ul>
//                 {errors.map((error, idx) => (
//                     <li key={idx}>{error}</li>
//                 ))}
//         </ul>
//         <div className="container">
//         <div className="upload-container">
//           <Upload fetchUploads={fetchUploads} />
//         </div>
//       </div>
//       <div className="container">
//         <div className="gallery-container">
//           {images && images.length ? (
//             <Gallery images={images} />
//           ) : null}
//         </div>
//       </div>
//         <div className='signup-input-container-name'>
//         <div className='signup-input-holder-name'>
//           <input
//             className='signup-input-name'
//             placeholder='First Name'
//             value={firstName}
//             type='text'
//             onChange={ e => setFirstName(e.target.value) }
//             required
//             />
//           <input
//             className='signup-input-name'
//             placeholder='Last Name'
//             value={lastName}
//             type='text'
//             onChange={ e => setLastName(e.target.value) }
//             required
//           />
//           </div>
//           </div>
//         <div className='signup-input-holder'>
//           <input
//             className='signup-input'
//             placeholder='Email'
//             value={email}
//             type='email'
//             onChange={ e => setEmail(e.target.value) }
//             required
//           />
//         </div>
//         <div className='signup-input-holder'>
//           <input
//             className='signup-input'
//             placeholder='Username'
//             value={username}
//             type='text'
//             onChange={ e => setUsername(e.target.value) }
//             required
//           />
//         </div>
//         <div className='signup-button-holder'>
//           <button type="submit" className="signup-button">Sign Up</button>
//         </div>
//         </form>
//     </div>
// );
// }

// export default NewRequest; 