import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '//localhost:3000/',
  //backend link for local: ...//localhost:3000/ 
  //old uat: //'http://liv-village-backend-env.eba-2jjmrubm.eu-west-3.elasticbeanstalk.com/'
  //new uat: https://liv.c3-dev-house.com/
  //link for prod: https://api.umthombomarketplace.co.za/
});

axiosInstance.interceptors.response.use(
  (response) => response, // Return response if successful
  (error) => {
    if (error.response && error.response.status === 401) { // removed error.response && error.response.status === 500 ||
      // Trigger a global event for handling 401 errors
      const event = new CustomEvent('authError', { detail: error });
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;