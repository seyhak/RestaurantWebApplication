import React from 'react';


function OrderFieldTitle(props){
    return(
      <h6 className="text-left pl-1">{props.id} {props.time.slice(11,19)}</h6>
    );
  }

function CountProducts(products){
  const content_set = CreateProductsSet(products);
  //TODO create dictionary product name: counted
  for (let i = 0; i < products.length; i++) {
    
  }
}

function CreateProductsSet(products){
  var products_list = [];
  for (let i = 0; i < products.length; i++) {
    products_list.push(products[i].name);
  }
  return new Set(products_list);
}

function OrderFieldContent(props){
  var content = [];
  var counted_products = CountProducts(props.products);
  console.log(content_set);
  for(var i = 0; i < props.products.length; i++){
    if(i==0){
      content.push(<li> {props.products[i].name}</li>);
    }
    else{
      content.push(<li> {props.products[i].name}</li>);
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
    // console.log(1111);
    // console.log(this.props.order);
    return(
      <button className="order_box btn btn-outline-dark m-1" id={this.props.order.id} onClick={this.props.onOrderClick}>
        <OrderFieldTitle id={this.props.order.id} time={this.props.order.order_date}/>
        <OrderFieldContent products = {this.props.order.products}/>
      </button>
    );
  }
}
export default OrderBox;