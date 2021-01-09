import React, { Component } from 'react';
import axios from 'axios';

export default class DisplayImage extends Component {
  state = { message: '' };

  formHandler = e => {
    e.preventDefault();
    this.setState({ message: 'Loading...' });
    const filename = document.querySelector('#filename').value;
    const generateGetUrl = 'api/uploads/get-url';
    const options = {
      params: {
        Key: filename,
        ContentType: 'image/jpeg'
      }
    };
    axios.get(generateGetUrl, options).then(res => {
      const { data: getURL } = res;
      this.setState({ getURL });
    });
  };

  handleImageLoaded = () => {
    this.setState({ message: 'Done' });
  };

  handleImageError = () => {
    this.setState({ message: 'Sorry, something went wrong. Please check if the remote file exists.' });
  };

  render() {
    const { getURL, message } = this.state;
    return (
      <React.Fragment>
        <h1>Retrieve Image from AWS S3 Bucket</h1>
        <form onSubmit={this.formHandler}>
          <label> Image name:</label>
          <input id='filename' />
          <p>
            <i>Image name must include the extension, eg. cat.jpeg</i>
          </p>
          <button>Load</button>
        </form>
        <p>{message}</p>
        <div className='preview-container'>
          {getURL && (
            <React.Fragment>
              <div className='preview'>
                <img
                  id='show-picture'
                  src={getURL}
                  alt='File stored in AWS S3'
                  onLoad={this.handleImageLoaded}
                  onError={this.handleImageError}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}









// import React, { useState, useRef } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { NavLink, useHistory, Redirect } from 'react-router-dom'

// import * as sessionActions from '../../store/session';

// import './Search.css';

// function Search() {
//   const history = useHistory()
//   const dispatch = useDispatch()
//   const sessionUser = useSelector(state => state.session.user);
//   const [isLoaded, setIsLoaded] = useState(false);
  

//   return (
//     <>
//       <div className="search-main">
//         SEARCH PAGE!!!!
//       </div>
//       </>
//   )
// }

// export default Search;