import React from 'react';
import ReactDOM from 'react-dom';
import OrdersSender from './order_sender/order_sender';
import Cookies from 'js-cookie';
// import {getCookie, csrfSafeMethod} from '../../scripts/csrf';
// const csrftoken = Cookies.get('csrf_token');        
// const url = window.location.origin + '/api/v2/me/change-password/';
// let headers = new Headers();
// const csrftoken = Cookies.get('csrf_token');
// headers.append('X-CSRFToken', csrftoken);
// headers.append('Content-Type', 'application/json');

class Sender{
    constructor(companyID){
      this.companyID = companyID;
      this.companyID = this.companyID[0];///decision for workplace - todo
      console.log(this.companyID);
      this.products = "";
      this.base_url = window.location.origin;
      var me = this;
      // TODO company choosing
      let id_list = [1]
      $.when(this.getProducts()).done((data) => {
        me.products = data;
        me.runSenderUI();
      });
    }
    //id filtering todo
    getProducts(id_list){
      const seller_prefix = "seller="
      let sellers = []
      id_list.forEach((item) => {
        sellers.push(item)
      })
      sellers.join("&")
      let url = window.location.origin + "/products/?" + sellers + "/?visible=true"
      return $.getJSON(url,function(data){
      });
    }

    runSenderUI(){
        ReactDOM.render(
        <OrdersReceiver products = { this.products }/>, $("#order_board"));
    }
}

export default Sender;