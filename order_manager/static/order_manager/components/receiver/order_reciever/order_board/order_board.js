import React from 'react';
import OrderBox from './order_box/order_box';
import './order_board.css'

class OrderBoxData{
  constructor(data){
    this.size = this.setSize(data);
    this.data = data;
  }
  setSize(data){
    return Math.round(data.products.length/5 + 1);
  }
}

  class OrdersBoard extends React.Component{//4x3 board for the start
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

    countOrderSize(orders_with_sizes){
      //TODO
      let amount_of_orders = 0;
      let amount_of_boxes = 0;  
      for (let index = 0; index < orders_with_sizes.length; index++) {
          if(amount_of_orders == 12){
            amount_of_boxes = index;
            break;
          }
          else{
            if(amount_of_orders>12 && index > 0){
              amount_of_orders -= orders_with_sizes[index-1].size;
              amount_of_boxes = index - 1;
              break;
            }
          }
          amount_of_orders += orders_with_sizes[index].size;
        }
        return amount_of_boxes + 1;
    }

    prepare_order_boxes(orders, return_orders){
      let orders_to_display = [];
      for (let i = 0; i < orders.length; i++) {
        orders_to_display.push(new OrderBoxData(orders[i]));
      }
      console.log(orders_to_display);
      let amount_orders_to_display = this.countOrderSize(orders_to_display);
      console.log(amount_orders_to_display);
      console.log(orders);
      for(var i = 0; i < amount_orders_to_display; i++){
        if(i < orders_to_display.length){
          return_orders.push(this.renderBox(i, orders_to_display[i].size));
        }
        else{
          break;
        }
      }
    }

    render()
    {
      let order_boxes = [];
      this.prepare_order_boxes(this.props.orders, order_boxes);
      return(
        <div className="order_board">
          {order_boxes}
        </div>
      );
    }
  }
  export default OrdersBoard
