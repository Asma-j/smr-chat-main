//Nx nest bug
//https://github.com/nestjs/nest/issues/1706
var nodeExternals = require('webpack-node-externals');

module.exports = {
 // externals: [nodeExternals()],
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()]
};