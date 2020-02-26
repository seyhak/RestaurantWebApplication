import React from 'react';
import ReactDOM from 'react-dom';
import Receiver from  '../../receiver/receiver';
import Sender from '../../sender/sender';

class Switcher extends React.Component{
  constructor(props){
    super(props)
    this.state = {
        visible: true
    }
  }

  getEmployeeData(userId)
  {
    let base = window.location.origin;
    let url = base + "/rest/employee/" + userId + ".json";
    return $.getJSON(url, (data) => {
    });
  }

  chooseRestItFunction = (foo, userId) => {
    userId = 0
    this.setState({
      visible: false
    })
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
            const element = document.getElementsByClassName('order_manager_containter')
            ReactDOM.render(
              <Receiver workplace = { data.workplace }/>, element[0])
            }
        )
        break;
      }
      default:
        console.log("??")
    }
  }

  render(){
    console.log(this.state)
    if(this.state.visible){
      return(
          <div className="d-flex justify-content-around">
              <div className="card m-4">
                  <button className="btn btn-outline-dark" onClick={() => {this.chooseRestItFunction('sender')}}>
                          <img className="card-img-top" alt="Card image cap"/>
                          <div className="card-body">
                              <p className="card-text text-center">Sender</p>
                          </div>
                  </button>
              </div>
              <div className="card m-4">
                  <button className="btn btn-outline-dark" onClick={() => {this.chooseRestItFunction('receiver')}}>
                      <img className="card-img-top" alt="Card image cap"/>
                      <div className="card-body">
                          <p className="card-text text-center">Receiver</p>
                      </div>
                  </button>
              </div>
          </div>
      )
    }
  }

}

export default Switcher;