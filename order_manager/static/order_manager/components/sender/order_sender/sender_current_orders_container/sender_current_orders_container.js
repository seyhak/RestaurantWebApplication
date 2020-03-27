import React from 'react'
import CurrentOrdersList from './current_orders_list/current_orders_list'
import './sender_current_orders_container.css'



function CurrentOrderPriceButton(props){
  let content = [];
  console.log(props)
  return(
    <div className="sender_box_content">
      <ul>
        <li className = "d-flex justify-content-between">
          <div className = "font-weight-bold sender_field_product_name">{props.price}</div>
        </li>
        {/* <hr className = "sender_product_underlane"></hr> */}
      </ul>
    </div>
  );
}

class SenderCurrentOrderContainer extends React.Component{
  constructor(props){
	super(props)
  }

  countPrice = () => {
      let price = 0
      console.log(this.props.currentOrders)
      for(i = 0; i < this.props.currentOrders.length; i++){
          price += parseFloat(this.props.currentOrders[i].price)
      }
      return price
  }

  render()
  {
	let price = this.countPrice()
    let style = {};
    return(
      <div className='order_sender_current_orders'>
        <button className='product_box_btn btn btn-outline-dark m-1' onClick={this.handleClick}>
          <CurrentOrdersList currentOrders={this.props.currentOrders}/>
          <CurrentOrderPriceButton price={price}/>
        </button>
      </div>
    );
  }
}
export default SenderCurrentOrderContainer