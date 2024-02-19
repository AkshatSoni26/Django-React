import axios from 'axios';
import { backend_urls } from '../urrls';

const runCode = async (code) => {
  try {

    console.log("code ===>", code)
    // Send a POST request to the Django backend
    const response = await axios.post(
        backend_urls.run, 
        { code },
      );

    // If the request is successful, return the response data
    return response.data;
  } catch (error) {
    // If there is an error, log it and return null
    console.error('Error while executing code:', error);
    return null;
  }
};

export default runCode  ;
