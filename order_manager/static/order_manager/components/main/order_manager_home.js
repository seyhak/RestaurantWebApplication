//require(['../../static/scripts/csrf.js']);
//require(['es6!../../static/components/receiver/receiver.js']);

//import {} from '../scripts/csrf.js';
//import {Receiver} from '../../receiver/receiver';

require(["es6!../components/receiver/receiver"],(x)=>{
  console.log(x);
});

// Importing combination 
//import React, {Component} from 'react'; 
// Importing Module 
//import ReactDOM from 'react-dom'; 
//import ChangeColor from './change-color.js'; 
// Importing CSS 
//import './index.css'; 


/////////////////////////////////////SENDER REACT/////////////////////////////////////////////////
/*define(function runSenderUI()
{
  class Box extends React.Component{
    render()
    {
      return(
        //here box will be rendered
        <div class="order_box">

        </div>
      );
    }
  }
  class OrderManager extends React.Component
  {
    constructor(props)
    {
      super(props);
      this.state = 
      {
        history:[
          {

          }
        ],
        
      }
    }
    render()
    {
      
      return(
        <div class="order_box_container">
          
        </div>
      );
    }
  }

  ReactDOM.render(<Game />, document.getElementById("root"));
});*/