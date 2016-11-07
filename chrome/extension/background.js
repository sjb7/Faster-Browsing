const bluebird = require('bluebird');
global.Promise = bluebird;

function promisifier(method) {
  return function promisified(...args) {
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);

promisifyAll(chrome.storage, [
  'local',
]);

chrome.commands.onCommand.addListener(function (command) {
  if (command == "Add Tab") {
      let id = null;
      chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
        chrome.storage.local.get({urls: []}, function (result) {
        let urls = result.urls;
        let url = tabArray[0].url.trim();
        id = tabArray[0].id;
        if(url!="chrome://newtab/") {
          if(urls.every(elem => elem.url!=url)) {
            let title = tabArray[0].title;
            urls.push({url:url, id:id, title:title});
          }
        }
        chrome.storage.local.set({urls: urls}, function () {});
        chrome.tabs.remove(id, function() { });
      });
    });
  }
  if (command == "Save Tab") {
      let id = null;
      chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
        chrome.storage.local.get({urls: []}, function (result) {
        let urls = result.urls;
        let url = tabArray[0].url.trim();
        id = tabArray[0].id;
        if(url!="chrome://newtab/") {
          if(urls.every(elem => elem.url!=url)) {
            let title = tabArray[0].title;
            urls.push({url:url, id:id, title:title});
          }
        }
        chrome.storage.local.set({urls: urls}, function () {});
      });
    });
  }
  if(command  == "Clear Urls") {
    chrome.storage.local.clear(function() {

    });
  }
});

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');