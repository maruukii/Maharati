import axios from "axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.post(
        import.meta.env.VITE_HOST + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  return logout;
};
export default useLogout;
