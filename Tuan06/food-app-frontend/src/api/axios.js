import axios from "axios";

const gatewayUrl =
  import.meta.env.VITE_GATEWAY_URL || "http://192.168.1.5:8080";
const useViteProxy =
  import.meta.env.DEV && import.meta.env.VITE_USE_VITE_PROXY !== "false";

const serviceBaseUrls = {
  food: import.meta.env.VITE_FOOD_SERVICE_URL,
  user: import.meta.env.VITE_USER_SERVICE_URL,
  order: import.meta.env.VITE_ORDER_SERVICE_URL,
  payment: import.meta.env.VITE_PAYMENT_SERVICE_URL,
  notification: import.meta.env.VITE_NOTIFICATION_SERVICE_URL,
};

const api = axios.create({
  baseURL: gatewayUrl,
});

api.interceptors.request.use((config) => {
  if (useViteProxy) {
    config.baseURL = "";
  }

  const requestUrl = config.url || "";
  const serviceKey = requestUrl.replace(/^\//, "").split("/")[0];

  if (!useViteProxy) {
    if (serviceBaseUrls[serviceKey]) {
      config.baseURL = serviceBaseUrls[serviceKey];
    } else {
      config.baseURL = gatewayUrl;
    }
  }

  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
