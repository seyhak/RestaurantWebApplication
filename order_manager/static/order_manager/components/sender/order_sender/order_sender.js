import React from 'react';

class OrderSender extends React.Component{//waiting for extensions(? no idea what kind of yet)
    constructor(props){
      super()
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