import { hostName } from '../constants';
const axios = require('axios');

export const serverGetCosts = ( data, readed ) => {	
  axios.get(hostName + 'cost_articles', {
    params: {
      mode: 'Access-Control-Allow-Methods',
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
  })
  .catch(err => {
    readed({
      isSuccess: false,
      data: null
    });
  });
};

export const serverGetAccountsName = ( data, readed ) => {	
  axios.get(hostName + 'accounts_name', {  
    params: {
      //mode: 'cors',
			mode: 'Access-Control-Allow-Methods',
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

export const serverPutCost = ( data, readed ) => {  
  axios.get(hostName + 'new-cost', {
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

export const serverPostCost = ( data, readed ) => {  
  axios.get(hostName + 'post-cost', {
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

export const serverDeleteCost = ( data, readed ) => {  
  axios.get(hostName + 'delete-cost', {
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