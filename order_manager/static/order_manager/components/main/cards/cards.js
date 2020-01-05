import Receiver from  '../../receiver/receiver';
console.log("Switcher loaded");


class Switcher{
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
        this.hideMenu();
        this.runRecieverUI(this.getCompanyID(userId));
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
  export default Switcher;