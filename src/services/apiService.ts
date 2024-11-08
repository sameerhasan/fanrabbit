import axios from "axios";

import routes from "../routes";

import { localStorageManager } from "./LocalStorage";

import { REFRESH_TOKEN, TOKEN } from "../constants";

const api = axios.create({
  baseURL: routes.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorageManager.getItem(TOKEN);

  if (config.headers) config.headers["Authorization"] = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      try {
        const refreshToken = localStorageManager.getItem(REFRESH_TOKEN);

        const response = await axios.post(
          `${routes.baseURL}${routes.refresh}`,
          {
            refresh_token: refreshToken,
          }
        );

        if (response.status === 200) {
          const { access_token } = response.data;

          localStorageManager.setItem(TOKEN, access_token);

          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return api(originalRequest);
        } else {
          localStorageManager.removeItem(TOKEN);
          localStorageManager.removeItem(REFRESH_TOKEN);
          window.location.reload();
        }
      } catch (err) {
        localStorageManager.removeItem(TOKEN);
        localStorageManager.removeItem(REFRESH_TOKEN);
        window.location.reload();
        // AuthEmitter.emit('interceptorError');
        console.log(err);
      }
    }

    return Promise.reject(error.response);
  }
);

export default api;
