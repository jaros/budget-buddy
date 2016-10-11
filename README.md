# That is ionic framework based application

- please install ionic-cli: ```npm install -g ionic```
- to start hacking in web-browser run: ```ionic serve```
-- we use backed and have CORS requests: please setup the proxy in ionic.config.json : e.g. ```"proxyUrl": "http://localhost:8080/api"```
-- ionic proxy works only in "ionic serve" mode
-- for using app on real device proxy is ignored and full URL has to be specified in services.js, just uncomment and use correct API service point in .constant('serviceApiUrl','http://fhvdpoayoq.localtunnel.me')
- to add a platform use: ```ionic platform add [ios, android]```
- to build the platform use: ```ionic build ios``` or ```ionic build android```
- to deploy ionic run android --device

TODO:
- on ios devices the charts are not clickable (native browser issue), please use android to demonstrate the chart actions 