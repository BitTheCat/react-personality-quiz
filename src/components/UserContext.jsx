import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [name, setName] = useState("");

  return <UserContext.Provider value={{ name, setName }}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};