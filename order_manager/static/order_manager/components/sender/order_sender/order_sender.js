import React from 'react';
import SenderProductBox from './sender_product_box/sender_product_box'

class OrderSender extends React.Component{//waiting for extensions(? no idea what kind of yet)
  constructor(props){
    super(props)
    this.products = tprops.products

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
    for(let i = 0; i < products.length; i++){
      content.push(
        <SenderProductBox
          name={products[i].name}
          id={products[i].id}
          price={products[i].price}
          onClick={this.handleClick}
        />
      )
    }
    return content
  }
  render(){
    let content = this.prepareContent()
    return(
        <div className='order_sender_container'>
          {content}
        </div>
    );
  }
}  
export default OrderSender;