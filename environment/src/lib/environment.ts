let port = process.env['NX_PORT'];
export const environment = {
  PORT: port,
  API_URL: `http://localhost:${port}/`,
  DB_USERNAME: 'postgress',
  DB_PASSWORD: 'mysecretpassword',
};
