import isEmpty from 'lodash/isEmpty';

interface IENVS {
  DOMAIN_URL: string;
  MODE: string;
  API_URL: string;
  PORT: string;
  __DEV__: boolean;
}

const defaultEnvs = {
  DOMAIN_URL: 'http://localhost:8080',
  API_URL: 'http://api.localhost:3000',
  PORT: '8080',
  MODE: 'development',
  __DEV__: true,
};

export const getEnvs = () => {
  let envs: any = {};
  try {
    const PROCCESS_ENV = process?.env;
    if (!isEmpty(PROCCESS_ENV)) {
      Object.keys(PROCCESS_ENV).map((key) => (envs[key] = PROCCESS_ENV[key]));
    }
  } catch (error) {
    console.debug(`ERROR`, error);
  } finally {
    envs = isEmpty(envs) ? defaultEnvs : envs;
  }
  console.debug(`ENVS`, envs);
  return envs;
};

export const ENVS: IENVS = getEnvs();
