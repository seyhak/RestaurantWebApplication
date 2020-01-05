import React from 'react';
import ReactDOM from 'react-dom';
import Switcher from  '../components/main/cards/cards';

console.log("reading ...");
/*class Switcher{
    static hideMenu(){
      $(".card").hide();
    }
    static getCompanyID(userId)
    {
      var base = "http://127.0.0.1:8000/";
      var url = base + "rest/employee/"+userId+".json";
      var companyID;
      return $.getJSON(url,function(data){
      });
    }
  
    static chooseRestItFunction(foo,userId){
      if(foo==="sender"){
        hideMenu();
        runRecieverUI(getCompanyID(userId));
      }
      else{
        if(foo==="receiver"){
          this.hideMenu();
          var companyID;
          $.when(this.getCompanyID(userId)).done(function(data){
            var employee = data;
            companyID = employee.workplace;
            var receiver = new Receiver(companyID);
          });
        }
      }
    }
  }
*/
window.Switcher = Switcher;