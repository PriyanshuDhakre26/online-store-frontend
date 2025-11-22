export const getEnvironmentVariables = () => {
  const isDev = import.meta.env.MODE === 'development';

  return {
    USERS_API: import.meta.env.VITE_USERS_API,
    ORDERS_API: import.meta.env.VITE_ORDERS_API,
    NOTIFY_API: import.meta.env.VITE_NOTIFY_API,
    isDevelopment: isDev,
    environment: import.meta.env.VITE_ENVIRONMENT || 'production'
  };
};

export const validateEnvironment = () => {
  if (import.meta.env.MODE === 'production') {
    const required = ['VITE_USERS_API', 'VITE_ORDERS_API', 'VITE_NOTIFY_API'];
    const missing = required.filter(key => !import.meta.env[key]);

    if (missing.length > 0) {
      console.warn(`Missing environment variables: ${missing.join(', ')}`);
      return false;
    }
  }
  return true;
};
