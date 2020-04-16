import React from 'react'
import CurrentOrdersList from './current_orders_list/current_orders_list'
import './sender_current_orders_container.css'



function CurrentOrderPriceButton(props){
  let content = [];
  console.log(props)
  return(
      <div className = "font-weight-bold current_order_list_price">
        <hr className = "title_underlane"></hr>
        {props.price}
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
        <div className='current_orders_container border-dark'>
          <CurrentOrdersList currentOrders={this.props.currentOrders}/>
          <CurrentOrderPriceButton price={price}/>
        </div>
      </div>
    );
  }
}
export default SenderCurrentOrderContainer