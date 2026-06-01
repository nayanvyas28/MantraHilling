// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
// No exclusionList import – newer Metro versions no longer export it.

// Alias @opentelemetry/api to a no‑op shim so Metro doesn't try to parse the dynamic import
defaultConfig.resolver.extraNodeModules = {
  ...(defaultConfig.resolver.extraNodeModules || {}),
  '@opentelemetry/api': path.resolve(__dirname, 'src/shim/otelShim.js'),
};

// No blockList needed – Metro will ignore the problematic bundle automatically.

module.exports = defaultConfig;
