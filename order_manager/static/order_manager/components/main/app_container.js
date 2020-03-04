import React from 'react';
import Receiver from  '../receiver/receiver';
import Sender from '../sender/sender';
import Switcher from './switcher/switcher'

class AppContainer extends React.Component{
  constructor(props){
    super(props)
    this.user = this.props.user
    this.state = {
        appType: '',
        loading: false,
        json: {},
        menuVisible: true
    }
  }

  chooseRestItFunction = (choice) => {
    const employeeId = this.user.id //solaris 
    switch(choice){
      case "sender": {
        this.getEmployeeData(employeeId, 'sender')
        break;
      }
      case "receiver": {
        this.getEmployeeData(employeeId, 'receiver')
        break;
      }
      default:
        console.log("??")
    }
  }

  getEmployeeData(employeeId, appType)
  {
    let base = window.location.origin;
    let url = base + "/rest/employee/" + employeeId + ".json";
    console.log(url)
    this.setState({
        loading: true
    })
    $.getJSON(url, (data) => {
    })
    .fail(() => {
        console.log("wrong employee ID")
        this.setState({
            loading: false,
            menuVisible: true
        })
    })
    .success((data) => {
        console.log(data)
        this.setState({
            appType: appType,
            json: data,
            loading: false,
            menuVisible: false
        })
    })
  }


  render(){
    console.log(this.state)
    if(this.state.menuVisible){
        return(
           <Switcher chooseRestItFunction = { this.chooseRestItFunction }/> 
        )
    }
    else{
        if(!this.state.loading){
            switch(this.state.appType){
                case 'sender': {
                    return(
                        <Sender companyID = { this.state.json.workplace }/>
                    )
                }
                case 'receiver': {
                    return(
                        <Receiver companyID = { this.state.json.workplace }/>
                    )
                }
            }
        }
        else{
            return(
                <button>loading</button>
            )
        }
    }
  }

}

export default AppContainer;