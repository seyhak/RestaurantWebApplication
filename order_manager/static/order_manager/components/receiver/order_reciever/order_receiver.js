//import OrdersBoard from './order_board/order_board';
class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
    constructor(props){
      super(props);
      const orders = this.props.orders.results;
      this.state = {
        currentOrders:{orders},
      }
    }
    render()
    {
      return(
        <div className="order_board_container">
          <OrdersBoard 
            orders={this.state.currentOrders}
            onOrderClick={id=>this.onOrderClick(id)}
          />
        </div>
      );
    }
    onOrderClick(id){
      alert(id);
  
    }
  
  }