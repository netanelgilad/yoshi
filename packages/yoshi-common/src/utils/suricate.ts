import url from 'url';
import getGitConfig from 'parse-git-config';

const getPathname = (stringUrl: string) => url.parse(stringUrl).pathname;

const suricateURL = 'https://bo.wix.com/suricate';

const WIX_EMAIL_PATTERN = '@wix.com';

const getTunnelId = (namespace: string) => {
  const gitConfig = getGitConfig.sync({ include: true, type: 'global' });
  const gitEmail = gitConfig.user ? gitConfig.user.email : '';
  const processUser = process.env.USER;
  let uniqueTunnelId;
  if (gitEmail.endsWith(WIX_EMAIL_PATTERN)) {
    uniqueTunnelId = gitEmail.replace(WIX_EMAIL_PATTERN, '');
  } else if (processUser) {
    uniqueTunnelId = processUser;
  } else if (process.env.SURICATE_TUNNEL_ID) {
    uniqueTunnelId = process.env.SURICATE_TUNNEL_ID;
  } else {
    return undefined;
  }

  const normalizedNamespace = namespace.replace('/', '-');

  return `${uniqueTunnelId}.${normalizedNamespace}`;
};

export const createSocket = (namespace: string, targetPort: number) => {
  // The consumer project needs to install @wix/suricate-client > 0.0.3
  // by itself because this is a private dependency
  // eslint-disable-next-line import/no-extraneous-dependencies
  const { socket } = require('@wix/suricate-client');

  return socket({
    target: { port: targetPort },
    url: suricateURL,
    tunnelID: getTunnelId(namespace),
  });
};

export const getUrl = (namespace: string) =>
  `${suricateURL}/tunnel/${getTunnelId(namespace)}/`;

export const getDevServerUrl = (appName: string) =>
  getUrl(`${appName}-dev-server`);

export const createDevServerSocket = (appName: string, port: number) =>
  createSocket(`${appName}-dev-server`, port);

export const getDevServerSocketPath = (appName: string) => {
  const devServerUrl = getDevServerUrl(appName);

  return `${devServerUrl}?&sockPath=${getPathname(devServerUrl)}sockjs-node`;
};
