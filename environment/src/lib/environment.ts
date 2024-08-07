let port = process.env['NX_PORT'];
let host = process.env['NX_BACKEND_HOST'];
export const environment = {
  PORT: port,
  API_URL: `http://${host}:${port}/`,
};
