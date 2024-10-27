export const request = (url, method, data) =>
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => res.json());
