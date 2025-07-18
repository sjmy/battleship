# webpack-template

A project template for web development.

#### NPM scripts:

- "test": "jest",<br>
- "build": "webpack --config webpack.prod.js",<br>
- "dev": "webpack serve --open --config webpack.dev.js",<br>
- "deploy": "git subtree push --prefix dist origin gh-pages"<br>

#### Dev Dependencies:

- "@eslint/css": "^0.9.0",<br>
- "@eslint/js": "^9.29.0",<br>
- "@eslint/json": "^0.12.0",<br>
- "@eslint/markdown": "^6.5.0",<br>
- "babel-jest": "^30.0.4",<br>
- "css-loader": "^7.1.2",<br>
- "eslint": "^9.29.0",<br>
- "globals": "^16.2.0",<br>
- "html-loader": "^5.1.0",<br>
- "html-webpack-plugin": "^5.6.3",<br>
- "jest": "^30.0.4",<br>
- "prettier": "3.5.3",<br>
- "style-loader": "^4.0.0",<br>
- "webpack": "^5.99.9",<br>
- "webpack-cli": "^6.0.1",<br>
- "webpack-dev-server": "^5.2.2",<br>
- "webpack-merge": "^6.0.1"

### Values to change

##### package.json

- name, description, main, homepage
- repository > url
- bugs > url

##### webpack.common.js

- entry
- output > filename
- plugins > HTMLWebpackPlugin template

##### webpack.dev.js

- devServer > watchFiles

##### package-lock.json

- run "npm install"
