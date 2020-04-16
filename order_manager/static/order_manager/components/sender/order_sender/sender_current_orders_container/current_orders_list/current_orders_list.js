import React from 'react'
import SenderProductBox from '../../sender_product_box/sender_product_box'
import './current_orders_list.css'

class CurrentOrdersList extends React.Component{
    constructor(props){
        super(props)
        let currentOrders = this.props.currentOrders
        this.state = {
            currentOrders: currentOrders
        }
    }

    handleClick = (i) => {
        console.log('delete ' + i)
    } 

    getListObjects = () => {
        let content = []
        let products = this.state.currentOrders
        console.log(products)
        for(let i = 0; i < products.length; i++){
          content.push(
            <SenderProductBox
                name={products[i].name}
                id={products[i].id}
                price={products[i].price}
                onClick={() => this.handleClick(products[i])}
                className={'product_box_current_orders'}
            />
          )
        }
        return content
    }

    render(){
        let orderListObjects = this.getListObjects()
        console.log(this.state.currentOrders)
        return(
            <div className = "current_order_list_container">
                <div className = "current_order_list_title">
                    <h6 className = "text-center font-italic">Current Orders:</h6>
                    <hr className = "title_underlane"></hr>
                </div>
                <div className = "current_order_list">
                    {orderListObjects}
                </div>
            </div>
        )
    }
}

export default CurrentOrdersList