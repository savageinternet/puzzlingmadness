'use strict';

const fs = require('fs');

const Hapi = require('hapi');
const Good = require('good');
const Inert = require('inert');

const server = new Hapi.Server({
  connections: {
    routes: {
      security: true
    }
  }
});
var tls = {
  key: fs.readFileSync('ssl/localhost.key'),
  cert: fs.readFileSync('ssl/localhost.crt')
};
server.connection({port: 3000, tls});

// Register webpack HMR, fallback to development environment
if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {

  const WebpackConfig = require('./config/webpack.config.js'); // Webpack config
  const HapiWebpackDevMiddleware = require('hapi-webpack-dev-middleware');
  const HapiWebpackHotMiddleware = require('hapi-webpack-hot-middleware');

  server.register([{
    register: HapiWebpackDevMiddleware,
    options: {
      config: WebpackConfig,
      options: {
        noInfo: true,
        publicPath: WebpackConfig.output.publicPath,
        stats: {
          colors: true
        }
      }
    }
  }, {
    register: HapiWebpackHotMiddleware
  }], function (err) {
    if (err) {
      throw err;
    }
  });

}

const goodConfig = {
  reporters: {
    console: [{
      module: 'good-squeeze',
      name: 'Squeeze',
      args: [{
          response: '*',
          log: '*'
      }]
    }, {
      module: 'good-console'
    }, 'stdout']
  }
};

server.register([
  Inert,
  { register: Good, options: goodConfig }
], function (err) {

  if (err) {
    throw err;
  }

  // STATIC ASSETS

  server.route({
    method: 'GET',
    path: '/favicon.ico',
    config: {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    },
    handler: {
      file: './favicon.ico'
    }
  });

  server.route({
    method: 'GET',
    path: '/assets/{filepath*}',
    config: {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: __dirname + '/public/assets/',
        listing: false,
        index: false
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/build/{filepath*}',
    config: {
      auth: false,
      cache: {
        expiresIn: 24 * 60 * 60 * 1000,
        privacy: 'public'
      }
    },
    handler: {
      directory: {
        path: __dirname + '/public/build/',
        listing: false,
        index: false
      }
    }
  });

  // API ENDPOINTS

  server.route({
    method: 'GET',
    path: '/api/call',
    handler: function (request, reply) {
      reply({
        message: 'Hello!'
      })
    }
  });

  // WEB PAGES

  server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
      reply.file('./public/index.html');
    }
  });
});

server.start((err) => {
  if (err) {
    throw err;
  }
  server.log('info', 'Server running at: ' + server.info.uri);
});

module.exports = server;
