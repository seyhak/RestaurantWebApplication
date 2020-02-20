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

class OrdersBoard extends React.Component{
  constructor(props){
    super(props);
    this.rows_in_orderboard = 4;
    this.columns_in_orderboard = 4;
  }
  renderBox(i){
    return(
      <OrderBox
        key = {i}
        order = {this.props.orders[i]}
        onOrderClick = {()=>this.props.onOrderClick(this.props.orders[i])}
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

  countOrderSize(orders_with_sizes){
    // orders
    let amount_of_orders_display = 0;
    // squares
    let amount_of_boxes_to_display = 0; 
    const max_amount_of_boxes_on_board = this.rows_in_orderboard * this.columns_in_orderboard; 
    const max_box_size = 5;
    for (let index = 0; index < orders_with_sizes.length; index++) {
        //case all order boxes are busy
        if(amount_of_boxes_to_display == max_amount_of_boxes_on_board){
          break;
        }
        // case one order require more order boxes than there is left -> revert one step
        if(amount_of_boxes_to_display > max_amount_of_boxes_on_board){
          amount_of_boxes_to_display -= orders_with_sizes[index-1].size;
          amount_of_orders_display --;
          break;
        }
        else{
          amount_of_boxes_to_display += orders_with_sizes[index].size;
          amount_of_orders_display ++;
          // one huge order case todo
        }
      }
    return {
      amount_of_orders_display: amount_of_orders_display,
      amount_of_boxes_to_display: amount_of_boxes_to_display
    }
  }

  prepare_order_boxes(orders, return_orders){
    let orders_to_display = [];
    // create object with data and size
    for (let i = 0; i < orders.length; i++) {
      orders_to_display.push(new OrderBoxData(orders[i]));
    }
    // console.log(orders_to_display);
    let order_board_boxes_size_info = this.countOrderSize(orders_to_display);
    const amount_orders_to_display = order_board_boxes_size_info['amount_of_orders_display'];
    const amount_boxes_required = order_board_boxes_size_info['amount_of_boxes_to_display'];
    // console.log(amount_orders_to_display);
    // split orders_to_display for columns array
    let order_columns = [];
    let temp_arr = [];
    let column_orders_size = 0;
    for(let i = 0; i < amount_orders_to_display; i++){
      temp_arr.push(orders_to_display[i]);
      column_orders_size += orders_to_display[i].size;
      // 3 - amount of rows
      if(column_orders_size >= this.rows_in_orderboard ||
         i + 1 == amount_orders_to_display
        ){
        order_columns.push(temp_arr);
        temp_arr=[];
        column_orders_size = 0;
      }
    }
    // console.log(order_columns);
    let index = 0;
    for(let i = 0; i < order_columns.length; i++){
      let column_of_boxes = []
      for (let j = 0; j < order_columns[i].length; j++) {
        const element = column_of_boxes.push(this.renderBox(index));
        index++;
      }
      return_orders.push(
        <div className="column">
          {column_of_boxes}
        </div>
      );
    }
  }

  render(){
    let order_boxes = [];
    // console.log(this.props.orders);
    this.prepare_order_boxes(this.props.orders, order_boxes);
    // console.log(order_boxes);
    return(
      <div className="order_board">
        {order_boxes}
      </div>
    );
  }
}
export default OrdersBoard