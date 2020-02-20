import Cookies from 'js-cookie'
import OrdersBoard from './order_board/order_board'
import './order_receiver.css'

class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
  constructor(props){
    super(props);
    let orders = this.props.orders.results
    this.state = {
      currentOrders:orders,
    }
  }

  closeOrder(closingOrder){
    let csrftoken = Cookies.get('csrftoken');
    let id = closingOrder.id;
    // console.log(id.toString())
    // console.log(closing_order)
    let url = "http://127.0.0.1:8000/rest/order/" + id.toString() + "/";
    $.getJSON(url, function(data)
    {
      let jsonFile = JSON.stringify(data);
      jsonFile = JSON.parse(jsonFile);
      jsonFile.delivered = true;
      jsonFile = JSON.stringify(jsonFile);
      // console.log(id)
      $.ajax({
        type: "PUT",
        url: url,
        CSRF: csrftoken,
        data: jsonFile,
        contentType: "application/json",
        success: () => {
          console.log("order closed " + id.toString());
        },
        error: () => {
          console.log("failed to close the order " + id.toString() + " failed");
        }
      });
    });
  }

  onOrderBoxClick(orderToClose){
    let tempArr =  this.state.currentOrders;
    console.log(orderToClose.id)
    //TODO delete array obj where ID...
    console.log(tempArr)
    console.log(
      tempArr.splice(orderToClose.id, 1))
    tempArr.splice(orderToClose.id, 1);
    console.log(tempArr)
    this.closeOrder(orderToClose);
    this.setState({
      currentOrders: tempArr,
      });
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