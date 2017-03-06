# web-template

Based on [hapi-vue](https://github.com/Belar/hapi-vue), this adds some extra pieces specific to our setup here at Savage Internet.

To use this template as the starting point for a new repository, first create a new GitLab repository as usual:

- go to [Savage Internet on GitLab](https://gitlab.com/savageinternet);
- click "New Project";
- enter a name for the new project (e.g. `locatrix-web`);
- leave visibility as "Private";
- click "Create Project".

Next, [download a tarball of `web-template`](https://gitlab.com/savageinternet/web-template/repository/archive.tar.gz?ref=master) or [get it from Dropbox](https://www.dropbox.com/s/y640cbonr14plhc/web-template-master-ec5708eb5375b2e0a1666781e8489af9b0a0dc8c.tar.gz?dl=0), then:

``` bash
# replace "locatrix-web" with name of new project
git clone git@gitlab.com:savageinternet/locatrix-web.git
cd locatrix-web

mv /path/to/web-template-master-{hash}.tar.gz .
tar --strip-components=1 -xzvf web-template-master-{hash}.tar.gz
rm web-template-master-{hash}.tar.gz
git add .
git commit -a -m "Initial commit"
git push -u origin master
```

At the end of this process, you should have a shiny copy of `web-template`, and you can continue with the rest of Dev Setup below.

## Mini-doc

**/build/** - Contains files needed for build and hot development  
**/build/index_dev.html** - Template for index.html, it will be used by HMR when developing in memory and during production build   
**/client/** - Vue.js app source  
**/config/** - Configuration files  
**/public/** - Public folder served by Hapi  
**/server/** - Server side logic  
**/test/** -   Contains test files  
**/app.js**  - Production server  
**/gulpfile.js**  - Gulp setup file   

## Dev Setup

``` bash
# use version of node defined in .nvmrc (may need to install nvm first)
nvm use

# install dependencies
npm install

# run unit tests
npm run unit

# run api unit tests
npm run unit-api

# serve with hot reload at localhost:4000 (proxy from localhost:3000)
npm run dev
```

## Production Setup

``` bash
# install dependencies
npm install

# build for production with minification
npm run build

# run application at localhost:3000
node app.js
```

Credits:
[Vue 2](https://vuejs.org/)  
[Hapi](http://hapijs.com/)  
[Gulp](https://gulpjs.com/)  
[BrowserSync](https://www.browsersync.io/)  
[Webpack](https://webpack.github.io/)  
