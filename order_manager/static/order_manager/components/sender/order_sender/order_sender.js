class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
    constructor(props){
      super(props);
      let orders = this.props.orders.results;
      this.state = {
        currentOrders:orders,
      }
    }
    render(){
        return(
            <div></div>
        );
    }
}  
export default OrdersReceiver;