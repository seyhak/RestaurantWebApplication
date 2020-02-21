import React from 'react';
import ReactDOM from 'react-dom';
import Receiver from  '../../receiver/receiver';
import Sender from '../../sender/sender';

class Switcher{
  static hideMenu(){
    $(".card").hide();
  }

  static getEmployeeData(userId)
  {
    let base = window.location.origin;
    let url = base + "/rest/employee/" + userId + ".json";
    return $.getJSON(url, (data) => {
    });
  }

  static chooseRestItFunction(foo, userId){
    this.hideMenu();
    switch(foo){
      case "sender":{
        $.when(this.getEmployeeData(userId)).then(
          (data) => {
            let sender = new Sender(data.workplace);
          }
        )
        break;
      }
      case "receiver":{
        $.when(this.getEmployeeData(userId)).then(
          (data) => {
            ReactDOM.render(
              <Receiver workplace = { data.workplace }/>, document.getElementById('order_manager_containter'))
            }
        )
        break;
      }
      default:
        console.log("??")
    }
  }
}
export default Switcher;