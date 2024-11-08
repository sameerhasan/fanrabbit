const routes = {
  baseURL: import.meta.env.VITE_BASE_URL,

  //API ROUTES
  registration: "/api/v1/user/register",
  authWithGoogle: "/api/v1/user/google",
  login: "/api/v1/user/login",
  googleAuth: "/api/v1/user/auth/google/account",
  refresh: "/api/v1/user/refresh_token",
  userDetail: "/api/v1/user",

  //PAGES ROUTES
  index: "/",
  auth: "/auth",
};

export default routes;
