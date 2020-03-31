import React from 'react'
import SenderProductBox from './sender_product_box/sender_product_box'
import SenderCurrentOrdersContainer from './sender_current_orders_container/sender_current_orders_container'
import './order_sender.css'

class OrderSender extends React.Component{//waiting for extensions(? no idea what kind of yet)
    constructor(props){
        super(props)
        this.products = this.props.products
        this.state = {
        currentOrderProducts: []
        }
    }

    handleClick = (product) => {
    // console.log(product)
        let currentOrderProducts = this.state.currentOrderProducts
        currentOrderProducts.push(product)
        this.setState({
        currentOrderProducts: currentOrderProducts
        })
    }

    getMenu = () => {
        let content = []
        let products = this.props.products
        for(let i = 0; i < products.count; i++){
            content.push(
                <SenderProductBox
                name={products.results[i].name}
                id={products.results[i].id}
                price={products.results[i].price}
                onClick={() => this.handleClick(products.results[i])}
                />
            )
        }
        return content
    }

    render(){
        // console.log(this.props)
        let menu = this.getMenu()
        // console.log(content)
        // console.log(this.state.currentOrderProducts)
        return(
            <div className='order_sender_container'>
            <div className='order_sender_menu_container'>
                {menu}
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