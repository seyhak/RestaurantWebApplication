//import OrderBox from '.order_box/order_box';

  class OrdersBoard extends React.Component{//3x3 board for the start
    renderBox(i){
      //console.log(this.props.orders.orders[i]);
      return(
        <OrderBox
          key = {i}
          order = {this.props.orders.orders[i]}
          onOrderClick = {()=>this.props.onOrderClick(i)}
        />
      );
    }
    render()
    {
      var order_boxes = [];
      for(var i=0; i<9;i++){
        if(i<this.props.orders.orders.length){
          order_boxes.push(this.renderBox(i));
        }
        else{
          break;
        }
      }
      console.log(order_boxes);
      return(
        <div className="order_board">
          {order_boxes}
        </div>
      );
    }
  }
