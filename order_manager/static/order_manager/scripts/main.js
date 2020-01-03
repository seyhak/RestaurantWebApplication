import React from 'react';
import ReactDOM from 'react-dom';
/*require.config({
  config: {
    es6: {
      resolveModuleSource: function(source) {
        return 'es6!'+source;
      }
    }
  },
  paths: {
    es6: "./es6",
    babel: "./babel-5.8.34.min"
  },
});
console.log("reading ...");
require(["https://unpkg.com/babel-standalone@6/babel.min"],()=>{//console.log("1");
});
require(["es6!csrf"],()=>{//console.log("2");
});
require(["es6!../components/main/order_manager_home"],()=>{
  var dupa = require("../components/main/order_manager_home");
  //console.log("3");
  //console.log(dupa);
});
require(["es6!../components/receiver/receiver"],()=>{console.log("4");
});
//require(["es6!../components/main/cards/cards.js"],()=>{console.log("cards loaded from main");});
//import {Switcher} from  '../components/main/cards/cards.js';*/