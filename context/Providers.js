import { createContext } from "react";

const UserContext = createContext();

return (
  <UserContext.Provider value={{ session }}>{children}</UserContext.Provider>
);
