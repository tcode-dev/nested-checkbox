const manifest = require('../../public/manifest.json');

/**
 * asset
 * cache busting用のpathを返す
 */
const asset = (path) => {
    return manifest[path] ?? path;
};

module.exports = asset;
