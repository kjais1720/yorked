import {
  useContext,
  createContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import { authReducer } from "reducers";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAxios, USER_TOKEN, USER_INFO, authDispatchConstants } from "utilities";

const AuthContext = createContext({ isLoggedIn: false, user: {} });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    user: {},
  });
  const [authApiState, setAuthApiState] = useState({
    url: "",
    data: "",
    method:"post"
  });
  const { LOGIN, LOGOUT } = authDispatchConstants;
  useEffect(() => {
    // To get the user details everytime the page reloads, from the saved token in localstorage
    const userToken = localStorage.getItem(USER_TOKEN);
    const userInfo = localStorage.getItem(USER_INFO) ?? JSON.parse(localStorage.getItem(USER_INFO));
    if (userToken) {
      userDispatch({ type: LOGIN, payload: userInfo });
    }
  }, []);

  const navigate = useNavigate();
  const location = useLocation()
  const pathToRedirectAfterLogin = location.state?.from?.pathname || "/" ;
  const { serverResponse, isLoading, serverError } = useAxios(authApiState);
  useEffect(() => {
    if (serverResponse.status === 201 || serverResponse.status === 200) {
      const user = serverResponse.data?.user ?? {};
      localStorage.setItem(USER_TOKEN, serverResponse.data.encodedToken);
      localStorage.setItem(USER_INFO, JSON.stringify(user));
      userDispatch({
        type: LOGIN,
        payload: user,
      });

      // Fire toast
      serverResponse.status === 200
        ? toast.success(`Logged in. Welcome back ${user.firstName}`)
        : toast.success(`Signed up. Welcome aboard ${user.firstName}`);
      navigate(pathToRedirectAfterLogin);
    }
  }, [serverResponse, serverError]);

  const loginSignupHandler = (route, data) => {
    const requiredPostData = {
      email: data.email,
      password: data.password,
    };
    if (route === "/auth/signup") {
      requiredPostData.firstName = data.firstName;
      requiredPostData.lastName = data.lastName;
    }
    setAuthApiState({
      url: route,
      method:"post",
      data: requiredPostData,
    });
  };

  const logout=()=>{
    userDispatch({
      type: LOGOUT
    })
  } 

  return (
    <AuthContext.Provider
      value={{
        userState,
        userDispatch,
        loginSignupHandler,
        serverResponse,
        serverError,
        isLoading,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
