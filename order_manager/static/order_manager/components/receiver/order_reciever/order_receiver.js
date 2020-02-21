import Cookies from 'js-cookie'
import OrdersBoard from './order_board/order_board'
import './order_receiver.css'
// import {getCookie, csrfSafeMethod} from '../../scripts/csrf';


// $.ajaxSetup({
//   beforeSend: function(xhr, settings) 
//   {     
//       var csrftoken = Cookies.get('csrftoken');
//       if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
//           xhr.setRequestHeader("X-CSRFToken", csrftoken);
//       }
//   }
// });

class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
  constructor(props){
    super(props);
    this.workplace = this.props.workplace
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    console.log("Update: " + Date.now())
    this.interval = setInterval(() => {
      $.when(this.getUndoneOrders()).done((data) => {
        this.setState(
          { orders: data }
        )
      });
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getUndoneOrdersJsonUrl(){
    return window.location.origin + "/rest/order/?delivered=false&deliverant=" + this.workplace;
  }
  
  getUndoneOrders(){
    let url = this.getUndoneOrdersJsonUrl();
    return $.getJSON(url,function(data){
    });
  }

  closeOrder(closingOrder){
    const csrftoken = Cookies.get('csrftoken');
    const id = closingOrder.id;
    console.log(id.toString())
    console.log(closingOrder)
    const url = window.location.origin + '/rest/order/O/' + id.toString() + "/";
    $.getJSON(url, function(data)
    {
      const headers = new Headers();
      const csrftoken = Cookies.get('csrf_token');
      headers.append('X-CSRFToken', csrftoken);
      headers.append('Content-Type', 'application/json');
      jsonFile.delivered = true;
      jsonFile = JSON.stringify(jsonFile);
      $.ajax({
        headers: headers,
        type: "PUT",
        url: url,
        CSRF: csrftoken,
        data: jsonFile,
        success: () => {
          console.log("order closed " + id.toString());
        },
        error: () => {
          console.log("failed to close the order " + id.toString() + " failed");
        }
      })
    })
  }

  onOrderBoxClick(orderToClose){
    let tempArr =  this.state.orders;
    console.log(orderToClose.id)
    //TODO delete array obj where ID...
    console.log(tempArr)
    console.log(tempArr.splice(orderToClose.id, 1))
    tempArr.splice(orderToClose.id, 1);
    console.log(tempArr)
    this.closeOrder(orderToClose);
    this.setState({
      orders: tempArr,
      });
  }

  // renderBoard(){
  //   return(
  //     <div className="order_board_container">
  //     <OrdersBoard 
  //       orders={this.state.currentOrders}
  //       onOrderClick={id=>this.onOrderBoxClick(id)}
  //     />
  //     </div>
  //   );
  // }

  render()
  {
    return(
      <div className="order_board_container float-left">
        <OrdersBoard 
          orders={this.state.orders}
          onOrderClick={id=>this.onOrderBoxClick(id)}
        />
      </div>
    );
  }
}
export default OrdersReceiver;