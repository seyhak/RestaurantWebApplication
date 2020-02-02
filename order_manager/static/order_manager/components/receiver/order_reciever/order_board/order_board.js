import React from 'react';
import OrderBox from './order_box/order_box';

  class OrdersBoard extends React.Component{//3x3 board for the start
    renderBox(i){
      return(
        <OrderBox
          key = {i}
          order = {this.props.orders[i]}
          onOrderClick = {()=>this.props.onOrderClick(this.props.orders[i])}
        />
      );
    }
    render()
    {
      var order_boxes = [];
      for(var i=0; i < 12; i++){
        if(i<this.props.orders.length){
          order_boxes.push(this.renderBox(i));
        }
        else{
          break;
        }
      }
      //console.log(order_boxes);
      return(
        <div className="order_board">
          {order_boxes}
        </div>
      );
    }
  }
  export default OrdersBoard
