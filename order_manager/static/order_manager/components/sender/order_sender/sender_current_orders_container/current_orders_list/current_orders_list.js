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

    } 

    getListObjects = () => {
        let content = []
        let products = this.state.currentOrders
        console.log(products)
        for(let i = 0; i < products.count; i++){
          content.push(
            <SenderProductBox
              name={products.results[i].name}
              id={products.results[i].id}
              price={products.results[i].price}
              //probably TODO properly
              onClick={this.handleClick(i)}
            />
          )
        }
        return content
    }

    render(){
        let orderListObjects = this.getListObjects()
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