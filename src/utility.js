import { API_URL } from "./config";

export async function authorizedFetch(url, options = {}) {
  const jwt = sessionStorage.getItem("jwt");

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${jwt}`,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "include",
    }
  );

  // If the request fails with 401, try to refresh
  if (response.status === 401) {
    console.warn("JWT expired, attempting to refresh...");

    try {
      const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();
        const newToken = refreshData.object;

        sessionStorage.setItem("jwt", newToken);

        // RETRY the original request with the new token
        return await authorizedFetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          },
        });
      }
    } catch (refreshError) {
      console.error("Refresh attempt failed", refreshError);
    }

    // If we reach here, refresh failed or returned an error
    handleAuthFailure();
    return;
  }
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

function handleAuthFailure() {
  sessionStorage.removeItem("jwt");
  window.location.href = "/";
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
