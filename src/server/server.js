import express from 'express';
import dotenv from 'dotenv';
import webpack from 'webpack';
import React from 'react';
import helmet from 'helmet'
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import serverRoutes from '../frontend/routes/serverRoutes'
import getManifest from './getManifest';

dotenv.config();

const { ENV, PORT } = process.env;

const app = express();

if (ENV === 'development') {
  console.log('Development config');
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const { publicPath } = webpackConfig.output;
  const serverConfig = { serverSideRender: true, publicPath };
  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.disable('x-powered-by')
  app.use((req, res, next) => {
    if(!req.hashManifest) req.hashManifest = getManifest();
    next();
  })
  app.use(express.static(`${__dirname}/public`));
  app.use(helmet());
  app.use(helmet.permittedCrossDomainPolicies({
    permittedPolicies: 'by-content-type'
  }))
}


const setResponse = (html, manifest) => {

  const mainStyles = manifest ? manifest['main.css'] : 'assets/app.css';
  const mainBuild = manifest ? manifest['main.js'] : 'assets/app.js'
  const vendorBuild = manifest ? manifest['vendor.js'] : 'assets/vendor.js'
  return(
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <link rel="stylesheet" href="${mainStyles}" type="text/css">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>PlatziGrom</title>
    </head>
    <body>
        <div id="app">${html}</div>
        <script src="${mainBuild}" type="text/javascript"></script>
        <script src="${vendorBuild}" type="text/javascript"></script>
    </body>
    </html>
    `
  )
  }

const renderApp = (req, res) => {
  const html = renderToString(
      <StaticRouter location={req.url} context={{}}>
        {renderRoutes(serverRoutes)}
      </StaticRouter>
  );
  res.set('Content-Security-Policy', "default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'")
  res.send(setResponse(html, req.hashManifest))
}

app.get('*', renderApp)

app.listen(PORT, (err) => {
  if (err) console.log(err);
  else console.log(`Listening on port ${PORT}`);
});
