import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://liv-village-backend-env.eba-2jjmrubm.eu-west-3.elasticbeanstalk.com/', //backend link
});

export default axiosInstance;