import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [session, setSession] = useState(
    JSON.parse(sessionStorage.getItem("session"))
  );

  const [courseId, setCourseId] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        session,
        setSession,
        courseId,
        setCourseId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
