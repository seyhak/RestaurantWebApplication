import React from 'react';
import OrdersReceiver from './order_receiver/order_receiver';

class Receiver extends React.Component{
  constructor(props){
    super(props)
    // this.companyID = companyID;
    this.companyID = this.props.workplace[0];//decision for workplace - todo
  }
  
  render(){
    return(
      <OrdersReceiver workplace={this.companyID}/>
    )
  }
};
export default Receiver;