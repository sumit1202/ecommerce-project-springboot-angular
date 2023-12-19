export default {
  oidc: {
    clientId: '{{clientId}}',
    issuer: '{{issuer}}',
    redirectUri: 'http://localhost:4200/login/callback',
    scopes: ['openid', 'profile', 'email'],
  },
};
