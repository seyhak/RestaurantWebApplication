import React from 'react'

class CurrentOrdersList extends React.Component{
    constructor(props){
        super(props)
        this.currentOrders = this.props.currentOrders
        this.state = {
            currentOrders: this.currentOrders
        }
    }
    //TODO THIS THING
    prepareListObjects = () => {
        let content = []
        let products = this.state.currentOrders
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
        let orderListObjects = this.prepareListObjects()
        return(
            <div className = "current_order_list">
                <div>
                    <h6 className = "text-center font-italic">Current Orders:</h6>
                    <hr className = "title_underlane"></hr>
                </div>
                {orderListObjects}
            </div>
        )
    }
}

export default CurrentOrdersList