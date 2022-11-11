export const axiosConfig = {
  baseUrl: '/api',
  jsonOptions: {
    headers: {
      'Content-Type': 'application/json',
    },
  },
  tokenOptions: (token: string) => {
    return {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };
  },
};
