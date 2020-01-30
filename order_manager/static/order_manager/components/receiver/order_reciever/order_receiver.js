import OrdersBoard from './order_board/order_board';
import './order_receiver.css';
import Receiver from '../receiver';

class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
    constructor(props){
      super(props);
      let orders = this.props.orders.results;
      console.log(orders);
      this.state = {
        currentOrders:orders,
      }
    }
    render()
    {
      console.log(this.state);
      return(
        <div className="order_board_container float-left">
          <OrdersBoard 
            orders={this.state.currentOrders}
            onOrderClick={id=>this.onOrderBoxClick(id)}
          />
        </div>
      );
    }

    onOrderBoxClick(id){
      // delete  order box from order board
      // let id = this.state.currentOrders.orders.indexOf(id);
      let temp_arr =  this.state.currentOrders;
      temp_arr.splice(id, 1);
      // console.log("temp+arr");
      // console.log(temp_arr);
      this.setState({
        currentOrders: temp_arr,
        });
      Receiver.closeOrder(id);
      // console.log(this.state.currentOrders);
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