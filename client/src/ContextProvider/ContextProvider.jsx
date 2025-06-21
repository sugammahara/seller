import { createContext, useContext, useEffect, useState } from "react";

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
  const [admin, setAdmin] = useState();
  const [payment, set_payment] = useState(false);
  const [ShowSearch, set_ShowSearch] = useState(false);
  useEffect(() => {
    const Admin = localStorage.getItem("admin");
    if (Admin) {
      setAdmin(Admin);
    }
  }, []);
  return (
    <StateContext.Provider
      value={{
        ShowSearch,
        set_ShowSearch,
        payment,
        set_payment,
        admin,
        setAdmin,
      }}
    >
      {children}
      {/* every component  sits here and accesses all the states */}
    </StateContext.Provider>
  );
};
export const useStateContext = () => useContext(StateContext);
