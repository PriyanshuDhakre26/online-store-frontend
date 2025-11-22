import axios from "axios";

const isDevelopment = import.meta.env.MODE === 'development';

const getAPIBase = () => {
  if (isDevelopment) {
    return {
      USERS: "http://localhost:7071/api/users",
      ORDERS: "http://localhost:7072/api/orders",
      NOTIFY: "http://localhost:7073/api/notify",
    };
  }

return {
  USERS: "https://users-service-func-fffretdjdmcefjet.centralus-01.azurewebsites.net/api/users",
  ORDERS: "https://orders-service-func-hwgafmebaxc3cgc3.centralus-01.azurewebsites.net/api/orders",
  NOTIFY: "https://notifications-service-func-a6cyavhebtfeasek.centralus-01.azurewebsites.net/api/notify",
};

};

export const API_BASE = getAPIBase();

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  withCredentials: false
});

apiClient.interceptors.request.use(
  config => {
    console.log('API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => Promise.reject(error)
);

apiClient.interceptors.response.use(
  response => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', error.message, error.response?.status, error.response?.data);
    if (error.response?.status === 404 || error.response?.status === 500) {
      console.error("Service unavailable:", error.message);
    }
    return Promise.reject(error);
  }
);
