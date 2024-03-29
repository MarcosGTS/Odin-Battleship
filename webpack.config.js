const path = require("path");

module.exports = {
    entry: './src/index.js',
    mode: "none", 
    watch: true,
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
}