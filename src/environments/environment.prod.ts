const environment = {
  production: true,
  configFile: 'assets/config/config.json', // not pointing towards the prod file as values from this file are written into the config on nginx step in Dockerfile
};

export default environment;
