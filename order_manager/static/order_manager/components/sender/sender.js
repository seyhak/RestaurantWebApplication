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
      this.companyID = this.companyID[0];
      this.products = "";
      this.base_url = window.location.origin;
      var me = this;
      // TODO company choosing
      let id_list = [1]
      $.when(this.getProducts(id_list)).done((data) => {
        me.products = data;
        me.runSenderUI();
      });
    }
    //id filtering todo
    getProducts(id_list){
      const seller_prefix = "seller="
      let sellers = []
      id_list.forEach((item) => {
        sellers.push(seller_prefix+item)
      })
      sellers.join("&")
      let url = window.location.origin + "/rest/product/?" + sellers
      return $.getJSON(url,function(data){
      });
    }

    runSenderUI(){
      console.log(this.products)
      ReactDOM.render(
        <OrdersSender products = { this.products }/>, $("#order_manager_containter"));
    }
}

export default Sender;