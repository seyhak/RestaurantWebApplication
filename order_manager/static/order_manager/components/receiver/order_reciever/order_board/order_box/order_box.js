import React from 'react';


function OrderFieldTitle(props){
    return(
      <h4>{props.id} {props.time.slice(11,19)}</h4>
    );
  }
function OrderFieldContent(props){
  var content = [];
  console.log(111111111111111);
  console.log(props.products);
  for(var i = 0; i < props.products.length; i++){
  console.log(props.products[i]);
    if(i==0){
      content.push(<li> {props.products[i]}</li>);
    }
    else{
      content.push(<li> {props.products[i]}</li>);
    }
  }
  return(
    <div className="order_box_content">
      <ol>
        {content}
      </ol>
    </div>
  );
}
class OrderBox extends React.Component{

  render()
  {
    console.log(1111);
    console.log(this.props.order);
    return(
      <button className="order_box" id = {this.props.order.id} onClick={this.props.onOrderClick}>
        <OrderFieldTitle id= {this.props.order.id} time = {this.props.order.order_date}/>
        <OrderFieldContent products = {this.props.order.products}/>
      </button>
    );
  }
}
export default OrderBox;