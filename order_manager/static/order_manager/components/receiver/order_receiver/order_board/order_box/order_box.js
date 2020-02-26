import React from 'react';
import './order_box.css'

function OrderFieldTitle(props){
    return(
      <div className = "order_field_title_box">
        <h6 className = "text-center font-italic">{props.id} - {props.time.slice(11,19)}</h6>
        <hr className = "title_underlane"></hr>
      </div>
    );
  }

function CountProducts(products){
  let content = CreateProductsSet(products);
  content = Array.from(content);
  let content_counts = Array(content.length).fill(0);
  for (let i = 0; i < products.length; i++) {
    for(let j = 0; j < content.length; j++){
      if(products[i].name == content[j]){
        content_counts[j]++;
        break;
      }
    }
  }
  let counted_products = {};
  for (let i = 0; i < content.length; i++) {
    counted_products[content[i]] = content_counts[i];
  }
  return counted_products;
}

function CreateProductsSet(products){
  var products_list = [];
  for (let i = 0; i < products.length; i++) {
    products_list.push(products[i].name);
  }
  return new Set(products_list);
}

function OrderFieldContent(props){
  let content = [];
  let counted_products = CountProducts(props.products);
  Object.entries(counted_products).forEach(([key, value]) => {
    content.push(<li className = "d-flex justify-content-between">
       <div className = "font-weight-bold order_field_product_name">{key}</div>
       <div className = "order_field_product_count"> x {value}</div></li>);
    content.push(<hr className = "order_product_underlane"></hr>);
  });
  return(
    <div className="order_box_content">
      <ul>
        {content}
      </ul>
    </div>
  );
}


class OrderBox extends React.Component{

  render()
  {
    let style = {};
    return(
      <div className="order_box">
        <button className="order_box_btn btn btn-outline-dark m-1" id={this.props.order.id} style={style} onClick={this.props.onOrderClick}>
          <OrderFieldTitle id={this.props.order.id} time={this.props.order.order_date}/>
          <OrderFieldContent products = {this.props.order.products}/>
        </button>
      </div>
    );
  }
}
export default OrderBox;