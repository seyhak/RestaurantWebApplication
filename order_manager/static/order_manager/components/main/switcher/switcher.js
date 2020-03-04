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

  getEmployeeData(employeeId)
  {
    let base = window.location.origin;
    let url = base + "/rest/employee/" + employeeId + ".json";
    console.log(url)
    return $.getJSON(url, (data) => {
    })
    .done(()=>console.log(123123))
    .fail(() => {
      console.log("asdas")
      return null
      this.setState({
        visible: true
      })
    })
    .success((data) => {
      return data
    })
  }

  chooseRestItFunction = (foo, employeeId) => {
    employeeId = 3 //solaris 
    switch(foo){
      case "sender": {
        $.when(this.getEmployeeData(employeeId)).then(
          (data) => {
            let sender = new Sender(data.workplace);
          }
        )
        break;
      }
      case "receiver": {
        let gg = this.getEmployeeData(employeeId)
        console.log(gg)
        console.log("pizda")
        const element = document.getElementsByClassName('order_manager_containter')
        ReactDOM.render(
          <Receiver workplace = { gg.workplace }/>, element[0]
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