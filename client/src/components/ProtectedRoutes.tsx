import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

type Props = {Component: JSX.Element};

const ProtectedRoutes = ({Component}: Props) => {
  const navigate = useNavigate();
  useEffect(() => {
    let loginToken = localStorage.getItem("token");
    if (!loginToken) {
      navigate("/login");
    }
  });

  return Component;
};

export default ProtectedRoutes;
