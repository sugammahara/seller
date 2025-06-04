import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setuser: () => {},
  settoken: () => {},
  ShowSearch: false,
  set_ShowSearch: () => {},
  payment: false,
  set_payment: () => {},
});

export const ContextProvider = ({ children }) => {
  const [token, settoken] = useState(null);
  const [payment, set_payment] = useState(false);
  const [ShowSearch, set_ShowSearch] = useState(false);
  return (
    <StateContext.Provider
      value={{ ShowSearch, set_ShowSearch, payment, set_payment }}
    >
      {children}
      {/* every component  sits here and accesses all the states */}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
