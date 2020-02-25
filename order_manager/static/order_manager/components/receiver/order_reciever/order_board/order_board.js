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
    this.rowsInOrderboard = 4
    this.columnsInOrderboard = 4
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

  countOrderSize(ordersWithSizes){
    // orders
    let amountOfOrdersDisplayed = 0;
    // squares
    let amountOfBoxesToDisplay = 0; 
    const maxAmountOfBoxesOnBoard = this.rowsInOrderboard * this.columnsInOrderboard; 
    const maxBoxSize = 5;
    for (let index = 0; index < ordersWithSizes.length; index++) {
        //case all order boxes are busy
        if(amountOfBoxesToDisplay == maxAmountOfBoxesOnBoard){
          break;
        }
        // case one order require more order boxes than there is left -> revert one step
        if(amountOfBoxesToDisplay > maxAmountOfBoxesOnBoard){
          amountOfBoxesToDisplay -= ordersWithSizes[index-1].size;
          amountOfOrdersDisplayed --;
          break;
        }
        else{
          amountOfBoxesToDisplay += ordersWithSizes[index].size;
          amountOfOrdersDisplayed ++;
          // one huge order case todo
        }
      }
    return {
      amount_of_orders_display: amountOfOrdersDisplayed,
      amount_of_boxes_to_display: amountOfBoxesToDisplay
    }
  }

  prepare_order_boxes(orders, return_orders){
    const ordersToDisplay = [];
    // create object with data and size
    for (let i = 0; i < orders.length; i++) {
      ordersToDisplay.push(new OrderBoxData(orders[i]));
    }
    // console.log(ordersToDisplay);
    let orderBoardBoxesSizeInfo = this.countOrderSize(ordersToDisplay);
    const amountOrdersToDisplay = orderBoardBoxesSizeInfo['amount_of_orders_display'];
    const amountBoxesRequired = orderBoardBoxesSizeInfo['amount_of_boxes_to_display'];
    // console.log(amount_orders_to_display);
    // split orders_to_display for columns array
    let orderColumns = [];
    let tmpArr = [];
    let columnOrderSize = 0;
    for(let i = 0; i < amountOrdersToDisplay; i++){
      tmpArr.push(ordersToDisplay[i]);
      columnOrderSize += ordersToDisplay[i].size;
      // 3 - amount of rows
      if(columnOrderSize >= this.rowsInOrderboard ||
         i + 1 == amountOrdersToDisplay
        ){
        orderColumns.push(tmpArr);
        tmpArr=[];
        columnOrderSize = 0;
      }
    }
    // console.log(order_columns);
    let index = 0;
    for(let i = 0; i < orderColumns.length; i++){
      let column_of_boxes = []
      for (let j = 0; j < orderColumns[i].length; j++) {
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