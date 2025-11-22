const getErrorMessage = (error) => {
  if (error.response) {
    return `API Error: ${error.response.status} - ${error.response.statusText}`;
  }
  if (error.request) {
    return 'No response from server';
  }
  return error.message;
};

export const handleServiceError = (error, serviceName) => {
  const message = getErrorMessage(error);
  console.error(`[${serviceName}]`, message);
  return {
    status: 'error',
    message,
    serviceName
  };
};

export const retryRequest = async (fn, maxRetries = 3, delay = 1000) => {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  }
  throw lastError;
};
