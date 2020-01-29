import OrdersBoard from './order_board/order_board';
class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
    constructor(props){
      super(props);
      const orders = this.props.orders.results;
      this.state = {
        currentOrders:orders,
      }
    }
    render()
    {
      console.log(this.state);
      return(
        <div className="order_board_container">
          <OrdersBoard 
            orders={this.state.currentOrders}
            onOrderClick={id=>this.onOrderBoxClick(id)}
          />
        </div>
      );
    }
    onOrderBoxClick(id){
      // delete  order box from order board
      console.log(this.state.currentOrders.results);
      // let id = this.state.currentOrders.orders.indexOf(id);
      let temp_arr = this.state.currentOrders.orders.splice(id, 1);
      console.log(temp_arr);
      this.setState({
        currentOrders: temp_arr,
        });
      alert(id);
      console.log(this.state.currentOrders.orders);
      console.log(this.state)
    }
    renderBoard(){
      return(
        <div className="order_board_container">
        <OrdersBoard 
          orders={this.state.currentOrders}
          onOrderClick={id=>this.onOrderBoxClick(id)}
        />
        </div>
      );
    }
  
  }
export default OrdersReceiver;