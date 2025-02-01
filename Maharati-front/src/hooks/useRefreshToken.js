import useAuth from "./useAuth";
import axios from "axios";
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(
      import.meta.env.VITE_HOST + "/refresh-token",
      {
        withCredentials: true,
      }
    );
    setAuth((prev) => {
      return {
        ...prev,
        user: response.data.user,
        accessToken: response.data.token,
      };
    });
    return response.data.token;
  };

  return refresh;
};

export default useRefreshToken;
