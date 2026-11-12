import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

let logoutFromContext: null | (() => void) = null;

export const registerLogoutFunction = (fn: () => void) => {
  logoutFromContext = fn;
};

const isPublicPath = (path: string) => {
  return ["/", "/home", "/privacy-policy", "/signin"].some((p) =>
    path.startsWith(p)
  );
};

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  timeout: 15000, // prevent hanging requests
});

/* -------------------------------------------------------
   REQUEST INTERCEPTOR
------------------------------------------------------- */
api.interceptors.request.use((config) => {
  if (!(config.data instanceof FormData)) {
    config.headers = {
      ...config.headers,
      "Content-Type": "application/json",
    };
  }
  return config;
});

/* -------------------------------------------------------
   REFRESH TOKEN HANDLING (Race-safe + Strict)
------------------------------------------------------- */

let isRefreshing = false;

let refreshQueue: {
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any) => {
  refreshQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(true);
    }
  });
  refreshQueue = [];
};

api.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    // 1 Network error → do NOT logout
    if (!status) {
      return Promise.reject(error);
    }

    // 2 Not 401 → just reject (no logout)
    if (status !== 401) {
      return Promise.reject(error);
    }

    // 3️ Prevent infinite retry loop
    if (
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 4️ If refresh already in progress → queue
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    isRefreshing = true;

    try {
      const refreshResponse = await api.post("/auth/refresh-token");

      if (refreshResponse.status !== 200) {
        throw new Error("Refresh failed");
      }

      processQueue(null);
      return api(originalRequest);
    } catch (refreshError: any) {
      processQueue(refreshError);

      /**
       * 🚨 Logout ONLY if refresh token itself is invalid (401)
       * Do NOT logout on:
       * - 500
       * - 403
       * - network error
       */
      if (refreshError.response?.status === 401) {
        const currentPath = window.location.pathname;

        if (!isPublicPath(currentPath)) {
          logoutFromContext?.();
        }
      }

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;