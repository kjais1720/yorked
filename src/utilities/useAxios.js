import { useEffect, useState } from "react";
import { USER_TOKEN } from "utilities";
import axios from "axios";

/**
 *
 * @param {string} url The Api URL
 * @param {string} method The HTTP requeest method
 * @param {object} data The data to post to the backend
 * @param {string} authToken The JWT associated with a user
 * @returns {isLoading : loading state, serverResponse : response from server, serverError : Error from server}
 */
export const useAxios = ({url, method, data}) => {
  const [ apiState, setApiState ] = useState({
    serverResponse:{},
    serverError:{},
    isLoading:false
})

  axios.interceptors.request.use(
    (config) => {
      // const userToken = localStorage.getItem(USER_TOKEN);
      const userToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YzQyOWFhMC1mYzY4LTRmMjAtOGE2Mi1lYWUzMTliMTdjNDMiLCJlbWFpbCI6ImFkYXJzaGJhbGlrYUBnbWFpbC5jb20ifQ.0Tt83jURNST6Or-CVaFB_mHqlpAMXXIJfJ3HmDU9AMQ"
      config.baseURL="/api"
      config.headers.authorization = userToken;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const getData = async () => {
    const userToken = localStorage.getItem(USER_TOKEN);
    try {
      setApiState(prev=> ({...prev,isLoading:true}))

      let res;
      res = await axios({
        url:url,
        method:method,
        data:data
      })
      setApiState(prev=> ({...prev,serverResponse:res}));
    } catch (err) {
      setApiState(prev=> ({...prev,serverError:err}))
    } finally {
      setApiState(prev=>({...prev,isLoading:false}));
    }
  };
  useEffect(() => {
    if (url) {
      getData();
    }
  }, [url, data]);
  return {
    isLoading: apiState.isLoading,
    serverResponse: apiState.serverResponse,
    serverError: apiState.serverError,
  };
};
