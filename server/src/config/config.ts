export interface Config {
  node_env: 'development' | 'production' | 'test' | 'local' | 'staging';
  port: number;
  db_port: number;
  db_password: string;
  db_username: string;
  db_name: string;
  db_host: string;
  frontend_host: string;
  api_prefix: string;
  jwt_access_secret: string;
  jwt_refresh_secret: string;
  jwt_access_expires_in: string;
  jwt_refresh_expires_in: string;
}

export default () => ({
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_port: process.env.DB_PORT,
  db_password: process.env.DB_PASSWORD,
  db_username: process.env.DB_USERNAME,
  db_name: process.env.DB_NAME,
  db_host: process.env.DB_HOST,
  frontend_host: process.env.FRONTEND_HOST,
  api_prefix: process.env.API_PREFIX,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
});
