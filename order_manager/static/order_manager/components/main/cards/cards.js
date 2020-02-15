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
            console.log(data);
            let sender = new Sender(data.workplace);
          }
        )
        break;
      }
      case "receiver":{
        $.when(this.getEmployeeData(userId)).then(
          (data) => {
            let receiver = new Receiver(data.workplace);
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