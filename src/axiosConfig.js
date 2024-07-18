import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/', //backend link for local: ...//localhost:3000/ uat: //'http://liv-village-backend-env.eba-2jjmrubm.eu-west-3.elasticbeanstalk.com/'
  //http://liv.c3-dev-house.com/
  //http://liv.c3-dev-house.com/
});

export default axiosInstance;