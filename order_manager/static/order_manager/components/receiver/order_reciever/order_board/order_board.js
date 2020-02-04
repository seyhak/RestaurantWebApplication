import React from 'react';
import OrderBox from './order_box/order_box';
import './order_board.css'


  class OrdersBoard extends React.Component{//3x3 board for the start
    renderBox(i, size=1){
      return(
        <OrderBox
          key = {i}
          order = {this.props.orders[i]}
          onOrderClick = {()=>this.props.onOrderClick(this.props.orders[i])}
          size = {size}
        />
      );
    }

    longOrderInOrders(orders){
      for (let i = 0; i < orders.length; i++) {
        if(orders[i].length > 5){
          return true;
        }
      }
    }

    resizeOrderBox(orders){
      let return_orders = [];
      let free_space = orders.length;
      for (let i = 0; i < free_space; i++) {
        if(orders[i].length > 5){
          free_space --;
//TODO
        }
        if(orders[i].length > 5 && i > 8){
          
        }
      }
    }


    prepare_order_boxes(orders){
      let amount_orders_to_display = 12;
      let orders_to_display = [];
      if(this.longOrderInOrders(this.props.orders)){
        orders_to_display = this.resizeOrderBox(this.props.orders, orders_to_display);
      }
      else{
        orders_to_display = this.props.orders;
      }
      for(var i = 0; i < amount_orders_to_display; i++){
        console.log(this.orders);
        if(i < orders_to_display.length){
          console.log(i);
          order_boxes.push(this.renderBox(i, size = 1));
        }
        else{
          break;
        }
      }
    }

    render()
    {
      var order_boxes = [];
      order_boxes = prepare_order_boxes(this.props.orders);
      return(
        <div className="order_board">
          {order_boxes}
        </div>
      );
    }
  }
  export default OrdersBoard
