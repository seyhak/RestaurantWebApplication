import OrdersBoard from './order_board/order_board';
import './order_receiver.css';

class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
  constructor(props){
    super(props);
    let orders = this.props.orders.results;
    this.state = {
      currentOrders:orders,
    }
  }

  onOrderBoxClick(id){
    let temp_arr =  this.state.currentOrders;
    temp_arr.splice(id, 1);
    this.setState({
      currentOrders: temp_arr,
      });
    this.closeOrder(id);
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

  static closeOrder(closing_order){
    let csrftoken = getCookie('csrftoken');
    let id = closing_order.id;
    let url = "http://127.0.0.1:8000/rest/order/" + id.toString() + "/";
    $.getJSON(url,function(data)
    {
      let jsonFile = JSON.stringify(data);
      jsonFile = JSON.parse(jsonFile);
      jsonFile.delivered = true;
      jsonFile = JSON.stringify(jsonFile);
      $.ajax({
        type: "PUT",
        url: url,
        CSRF: csrftoken,
        data: jsonFile,
        contentType: "application/json",
        success: (id) => {
          console.log("order closed" + id.toString());
        },
        error: (id) => {
          console.log("failed to close the order" + id.toString() + " failed");
        }
      });
    });
  }

  render()
  {
    return(
      <div className="order_board_container float-left">
        <OrdersBoard 
          orders={this.state.currentOrders}
          onOrderClick={id=>this.onOrderBoxClick(id)}
        />
      </div>
    );
  }
}
export default OrdersReceiver;