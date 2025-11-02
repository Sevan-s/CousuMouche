const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/mr', // préfixe local
    createProxyMiddleware({
      target: 'https://api.mondialrelay.com',
      changeOrigin: true,
      pathRewrite: { '^/mr': '' },
    })
  );
};