import Cookies from 'js-cookie'
import OrdersBoard from './order_board/order_board'
import './order_receiver.css'

class OrdersReceiver extends React.Component{//waiting for extensions(? no idea what kind of yet)
  constructor(props){
    super(props);
    this.workplace = this.props.workplace
    this.state = {
      orders: [],
      timeGap: 1000
    } 
  }

  componentDidMount() {
    alert("closing is blocked - change url")
    this.interval = setInterval(() => {
      $.when(this.getUndoneOrders()).done((data) => {
        this.setState({
            orders: data.results
          }
        )
      });
    }, this.state.timeGap);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate(prevState) {
    if(this.state.timeGap <= 1000){
      clearInterval(this.interval)
      this.interval = setInterval(() => {
        $.when(this.getUndoneOrders()).done((data) => {
          this.setState({
            timeGap: 10000
          })
        });
      }, 10000);
    }
  }

  getUndoneOrdersJsonUrl(){
    return window.location.origin + "/rest/order/?delivered=false&deliverant=" + this.workplace;
  }
  
  getUndoneOrders(){
    let url = this.getUndoneOrdersJsonUrl();
    return $.getJSON(url, function(data){
    });
  }

  closeOrder(closingOrder){
    const csrftoken = Cookies.get('csrftoken');
    const id = closingOrder.id;
    console.log(id.toString())
    console.log(closingOrder)
    const url = window.location.origin + '/rest/orderWRONGLINK/' + id.toString() + "/";
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
    const tempArr =  this.state.orders;
    // console.log(orderToClose.id)
    // console.log(tempArr)
    const index = tempArr.indexOf(orderToClose)
    tempArr.splice(index, 1)
    // tempArr.splice(orderToClose.id, 1);
    // console.log(tempArr)
    this.closeOrder(orderToClose);
    this.setState({
      orders: tempArr,
      });
  }

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