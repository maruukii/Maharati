import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
const handleExternalOauth = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const from = queryParams.get("from");
  localStorage.setItem("persist", true);
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  useEffect(() => {
    const token = async () => {
      await refresh();

      navigate(from, { replace: true });
    };
    token();
  }, []);
  return <></>;
};

export default handleExternalOauth;
