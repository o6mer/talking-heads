import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";

const Dashboard = ({ code }) => {
  const accessToken = useAuth(code);

  return <div>{code}</div>;
};

export default Dashboard;
