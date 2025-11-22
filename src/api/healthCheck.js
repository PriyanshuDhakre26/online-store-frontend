export const healthCheck = async (serviceUrl) => {
  try {
    const response = await fetch(serviceUrl, {
      method: 'OPTIONS',
      headers: { 'Content-Type': 'application/json' }
    });
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const checkAllServices = async (apis) => {
  const results = {};

  for (const [name, url] of Object.entries(apis)) {
    try {
      const isHealthy = await healthCheck(url);
      results[name] = {
        status: isHealthy ? 'healthy' : 'unhealthy',
        url,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      results[name] = {
        status: 'error',
        url,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }

  return results;
};

export const monitorServices = (apis, intervalMs = 30000) => {
  const checkServices = async () => {
    const health = await checkAllServices(apis);
    console.log('Health Check:', health);
    return health;
  };

  checkServices();
  return setInterval(checkServices, intervalMs);
};
