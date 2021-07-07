import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  user: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
    case "AUTH_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLogin: true,
        user: action.payload,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("token");
      return {
        ...state,
        isLogin: false,
        user: null,
      };
    default:
      throw new Error("unknown cases");
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
