export async function authorizedFetch(url, options = {}) {
  const jwt = localStorage.getItem("jwt");

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${jwt}`,
    },
    credentials: "include",
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw {
      status: response.status,
      message: errorBody?.message || "Request failed",
      data: errorBody,
    };
  }

  return response.json();
}

export async function nonAuthorizedFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);

    throw {
      status: response.status,
      message: errorBody?.message || "Request failed",
      data: errorBody,
    };
  }

  return response.json();
}
