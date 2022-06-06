import { createContext, useState } from "react";

const UserContext = createContext();

function ContextProvider({ children }) {
  const [test, setTest] = useState("coucou");
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <UserContext.Provider value={{ test, setTest }}>
      {children}
    </UserContext.Provider>
  );
}

const UserExport = { UserContext, ContextProvider };

export default UserExport;
