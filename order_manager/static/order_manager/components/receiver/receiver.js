import React from 'react';
import ReactDOM from 'react-dom';
import OrdersReceiver from './order_reciever/order_receiver';
// import getCookie from '../../scripts/csrf';
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}
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

    static closeOrder(id){
      let csrftoken = getCookie('csrftoken');
      let url = "http://127.0.0.1:8000/rest/order/" + id.toString() + "/";
      console.log(url);
      $.ajax({
        type: "PUT",
        url: url,
        CSRF: csrftoken,
        data: {"delivered": true},
        contentType: "application/json",
        success: (id) => {
          console.log(id);
        },
        error: (id) => {
          console.log(id.toString() + " failed");
        }
        // dataType: dataType
      });
    }
  };
  export default Receiver;