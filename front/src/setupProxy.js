const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/recommend",
    createProxyMiddleware({
      target: "https://project-py-5lx0.onrender.com",
      changeOrigin: true,
    })
  );

  app.use(
    "/wedding-halls",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "http://localhost:8081",
=======
      target: "http://192.168.219.50:8081",
>>>>>>> origin/JSG3
      changeOrigin: true,
      pathRewrite: {
        "^/wedding-halls": "/boot/wedding-halls" 
      }
    })
  );
};