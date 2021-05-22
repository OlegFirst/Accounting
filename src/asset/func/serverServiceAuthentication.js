import { hostName } from '../constants';
const axios = require('axios');

export const serverAuthenticationGet = ( data, readed ) => {	
  axios.get(hostName + 'authentication-get', {
    params: {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'        
      },
      data: data
    }
  })
  .then(res => {
    readed(res.data == 1);
  })
  .catch(err => {
    console.log(err);
    readed(null);
  });
};

export const serverAuthenticationGetUserId = ( data, readed ) => {
	axios.get(hostName + 'authentication-get-user-id', {
    params: {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'        
      },
      data: data
    }
  })
  .then(res => {		
    readed({      
			isSuccess: true,
      data: res.data
    });     
  })
  .catch(err => {
    readed({
      isSuccess: false,
      data: null
    });
  });
};

export const serverAuthenticationPut = ( data, readed ) => {
  axios.get(hostName + 'authentication-put', {
    params: {
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'        
      },
      data: data
    }
  })
  .then(res => {	
    readed(res.data === 1);
  })
  .catch(err => {
    console.log(err);
    readed(null);
  });
};