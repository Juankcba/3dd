import { getUid, hasEpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
  const token = getUid();

  if (!token) {
    logout();
  } else {
    if (hasEpiredToken(token)) {
      logout();
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, paramsTemp);
        const result = await response.json();
        return result ? result : null;
      } catch (error) {
        return error;
      }
    }
  }
}
