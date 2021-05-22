import { hostName } from '../constants';
const axios = require('axios');

export const serverGetAccounts = ( data, readed ) => {	
  axios.get(hostName + 'accounts', {  
    params: {
      mode: 'cors',
      headers: {
        'Content-Type':  'application/json'
      },
			data: JSON.stringify(data)
    }
  })
  .then(res => {	
    readed({				
				 isSuccess: true,        
				data: res.data
      });
    }
  )
  .catch(err => {
      readed({
        isSuccess: false,
        data: null
      });
    }
  );
};

export const serverPutAccount = ( data, readed ) => {
  axios.get(hostName + 'new-account', {
    params: {
      mode: 'Access-Control-Allow-Methods',
      headers: {
        'Content-Type':  'application/json'
      },
      data: JSON.stringify(data)
    }
  })
  .then(res => {
    readed(res.data);      
  })
  .catch(err => {
    alert(err);
    readed(null);
  });
};

export const serverPostAccount = ( data, readed ) => {
  axios.get(hostName + 'post-account', {
    params: {
      mode: 'Access-Control-Allow-Methods',
      headers: {
        'Content-Type':  'application/json'
      },
      data: JSON.stringify(data)
    }
  })
  .then(res => {		
    readed(res.data);      
  })
  .catch(err => {
    alert(err);
    readed(null);
  });
};

export const serverDeleteAccount = ( data, readed ) => {
  axios.get(hostName + 'delete-account', {
    params: {
      mode: 'Access-Control-Allow-Methods',
      headers: {
        'Content-Type':  'application/json'
      },
      data: JSON.stringify( data )
    }
  })
  .then(res => {
    readed(res.data);      
  })
  .catch(err => {
    alert(err);
    readed(null);
  });
};