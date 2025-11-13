const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adicionar suporte para arquivos .glb
config.resolver.assetExts.push('glb', 'gltf', 'obj', 'fbx');

module.exports = config;
