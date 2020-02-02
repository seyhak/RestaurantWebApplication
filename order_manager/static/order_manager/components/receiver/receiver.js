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
      this.base_url = "http://127.0.0.1:8000/";
      var me = this;
      $.when(this.getUndoneOrders()).done(function(data){
        me.orders=data;
        
      // console.log(data);
        me.runReceiverUI();
      });
    }
  
    runReceiverUI(){
      ReactDOM.render(
      <OrdersReceiver orders = { this.orders }/>, document.getElementById("order_board"));
    }
  
     getUndoneOrdersJsonUrl(){
      var url = this.base_url + "rest/order/?delivered=false&deliverant="+ this.companyID;
      return url;
    }
  
    getUndoneOrders(){
      var url = this.getUndoneOrdersJsonUrl();
      return $.getJSON(url,function(data){
      });
    }

    static closeOrder(closing_order){
      let csrftoken = getCookie('csrftoken');
      let id = closing_order.id;
      let url = "http://127.0.0.1:8000/rest/order/" + id.toString() + "/";
      $.getJSON(url,function(data)
      {
        let jsonFile = JSON.stringify(data);
        jsonFile = JSON.parse(jsonFile);
        jsonFile.delivered = true;
        jsonFile = JSON.stringify(jsonFile);
        $.ajax({
          type: "PUT",
          url: url,
          CSRF: csrftoken,
          data: jsonFile,
          contentType: "application/json",
          success: (id) => {
            console.log("order closed" + id.toString());
          },
          error: (id) => {
            console.log("failed to close the order" + id.toString() + " failed");
          }
        });
      });
    }
  };
  export default Receiver;