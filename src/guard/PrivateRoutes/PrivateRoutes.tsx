import { Navigate, Outlet } from "react-router-dom";

import routes from "../../routes";

import { localStorageManager } from "../../services";

import { TOKEN } from "../../constants";

const PrivateRoutes = () => {
  const token = localStorageManager.getItem(TOKEN);

  return token ? <Outlet /> : <Navigate to={routes.auth} />;
};

export default PrivateRoutes;
