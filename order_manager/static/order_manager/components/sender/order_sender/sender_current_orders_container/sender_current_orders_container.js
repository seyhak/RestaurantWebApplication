import React from 'react';
import CurrentOrdersList from '.'
import './sender_current_orders_container.css'



function CurrentOrderPriceButton(props){
  let content = [];
  console.log(props)
  return(
    <div className="sender_box_content">
      <ul>
        <li className = "d-flex justify-content-between">
        <div className = "font-weight-bold sender_field_product_name">{props.name} : {props.price}</div></li>
        {/* <hr className = "sender_product_underlane"></hr> */}
      </ul>
    </div>
  );
}

class SenderCurrentOrderContainer extends React.Component{
  constructor(props){
    super(props)
    this.currentOrders = this.props.currentOrderProducts
    let price = this.countPrice()
    this.state = {
        price: price
    }
  }

  countPrice = () => {
      price = 0
      for(i = 0; i < this.props.currentOrders.length; i++){
          //TODO
          price += this.currentOrders[i].price
      }
      return price
  }

  render()
  {
    let style = {};
    return(
      <div className='order_sender_current_orders'>
        <button className='product_box_btn btn btn-outline-dark m-1' onClick={this.handleClick}>
          <CurrentOrdersList id={this.id}/>
          <CurrentOrderPriceButton price={this.price}/>
        </button>
      </div>
    );
  }
}
export default SenderCurrentOrderContainer