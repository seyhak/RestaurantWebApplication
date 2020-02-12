import React from 'react';
import OrderBox from './order_box/order_box';
import './order_board.css'

class OrderBoxData{
  constructor(data){
    this.size = this.setSize(data);
    this.data = data;
  }
  setSize(data){
    let products_names_array = [];
    for (let index = 0; index < data.products.length; index++) {
      products_names_array.push(data.products[index].name);
    }
    const products_set = new Set(products_names_array);
    return Math.floor(products_set.size/5 + 1);
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
      // orders
      let amount_of_orders = 0;
      // squares
      let amount_of_boxes = 0;  
      const max_box_size = 5;
      for (let index = 0; index < orders_with_sizes.length; index++) {
          //case all order boxes are busy
          if(amount_of_boxes == 12){
            break;
          }
          // case one order require more order boxes than there is left
          if(amount_of_boxes > 12){
            // revert
            amount_of_boxes -= orders_with_sizes[index-1].size;
            amount_of_orders --;
            break;
          }
          else{
            amount_of_boxes += orders_with_sizes[index].size;
            amount_of_orders ++;

            // one huge order case todo
          }
        }

      return [amount_of_orders, amount_of_boxes]
    }

    prepare_order_boxes(orders, return_orders){
      let orders_to_display = [];
      // create object with data and size
      for (let i = 0; i < orders.length; i++) {
        orders_to_display.push(new OrderBoxData(orders[i]));
      }
      console.log(orders_to_display);
      let orderBoxSizeInfo = this.countOrderSize(orders_to_display);
      const amount_orders_to_display = orderBoxSizeInfo[0];
      const amount_boxes_required = orderBoxSizeInfo[1];
      console.log(amount_orders_to_display);
      console.log(orders);
      for(var i = 0; i < amount_orders_to_display; i++){
          return_orders.push(this.renderBox(i, orders_to_display[i].size));
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
