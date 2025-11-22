const testServices = async (baseUrls) => {
  const results = {};

  try {
    const usersResponse = await fetch(`${baseUrls.USERS}/users`, {
      method: 'GET'
    });
    results.users = {
      status: usersResponse.status,
      data: await usersResponse.json()
    };
  } catch (err) {
    results.users = { error: err.message };
  }

  try {
    const ordersResponse = await fetch(`${baseUrls.ORDERS}/orders`, {
      method: 'GET'
    });
    results.orders = {
      status: ordersResponse.status,
      data: await ordersResponse.json()
    };
  } catch (err) {
    results.orders = { error: err.message };
  }

  try {
    const notifyResponse = await fetch(`${baseUrls.NOTIFY}/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Test notification' })
    });
    results.notify = {
      status: notifyResponse.status,
      data: await notifyResponse.json()
    };
  } catch (err) {
    results.notify = { error: err.message };
  }

  return results;
};

export default testServices;
