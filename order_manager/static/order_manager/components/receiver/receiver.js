import React from 'react';
import ReactDOM from 'react-dom';
import OrdersReceiver from './order_reciever/order_receiver';
import {getCookie, csrfSafeMethod} from '../../scripts/csrf';


$.ajaxSetup({
  beforeSend: function(xhr, settings) 
  {     
      var csrftoken = getCookie('csrftoken');
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
  }
});

class Receiver{
    constructor(companyID){
      this.companyID = companyID;
      this.companyID = this.companyID[0];///decision for workplace - todo
      this.orders="";
      this.base_url = window.location.origin;
      var me = this;
      $.when(this.getUndoneOrders()).done(function(data){
        me.orders=data;
        me.runReceiverUI();
      });
    }
  
    runReceiverUI(){
      ReactDOM.render(
      <OrdersReceiver orders = { this.orders }/>, document.getElementById("order_board"));
    }
  
     getUndoneOrdersJsonUrl(){
      var url = this.base_url + "/rest/order/?delivered=false&deliverant="+ this.companyID;
      return url;
    }
  
    getUndoneOrders(){
      var url = this.getUndoneOrdersJsonUrl();
      return $.getJSON(url,function(data){
      });
    }
  };
  export default Receiver;