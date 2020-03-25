import React from 'react';
import SenderProductBox from './sender_product_box/sender_product_box'
import SenderCurrentOrdersContainer from './sender_current_orders_container'

class OrderSender extends React.Component{//waiting for extensions(? no idea what kind of yet)
  constructor(props){
    super(props)
    this.products = props.products
    this.state = {
      currentOrderProducts: []
    }
  }

  handleClick = (product) => {
    let currentOrderProducts = this.state.currentOrderProducts
    currentOrderProducts.push(product)
    this.setState({
      currentOrderProducts: currentOrderProducts
    })
  }

  prepareContent = () => {
    let content = []
    let products = this.products
    for(let i = 0; i < products.count; i++){
      content.push(
        <SenderProductBox
          name={products.results[i].name}
          id={products.results[i].id}
          price={products.results[i].price}
          //probably TODO properly
          onClick={this.handleClick}
        />
      )
    }
    return content
  }
  render(){
    console.log(this.props)
    let content = this.prepareContent()
    console.log(content)
    return(
        <div className='order_sender_container'>
          <div className='order_sender_products_boxes_container'>
            {content}
          </div>
          <div className='order_sender_current_orders_container'>
            <SenderCurrentOrdersContainer
              currentOrders={this.state.currentOrderProducts}
            />
          </div>
        </div>
        
    );
  }
}  
export default OrderSender;