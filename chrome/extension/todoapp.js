import React from 'react';
import ReactDOM from 'react-dom';
import Root from '../../app/Root';
import './todoapp.css';

chrome.tabs.query({active:true,currentWindow:true},function(tabArray){
    chrome.storage.local.get({urls: []}, function (result) {
    	let urls = result.urls;
      ReactDOM.render(<Root tabs={urls}/>,document.querySelector('#root'));
    });
});

