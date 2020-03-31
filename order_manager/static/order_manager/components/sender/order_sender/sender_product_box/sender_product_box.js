import React from 'react';
import './sender_product_box.css'

function ProductTitleField(props){
  return(
    <div className = "product_field_title_box">
      <h6 className = "text-center">{props.id}: {props.price}</h6>
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

function ProductContentField(props){
  let content = [];
  // console.log(props)
  return(
    <div className="sender_box_content">
      <ul>
        <li className = "d-flex justify-content-between">
          <div className = "font-weight-bold text-center sender_field_product_name">{props.name}</div>
        </li>
      </ul>
    </div>
  );
}

class SenderProductBox extends React.Component{
  constructor(props){
    super(props)
    this.name = props.name
    // this.category = props.category
    this.id = props.id
    this.price = props.price
    this.handleClick = props.onClick
  }

  render()
  {
    let style = {};
    return(
      <div className='product_box'>
        <button className='product_box_btn btn btn-outline-dark m-1' onClick={this.handleClick}>
          <ProductTitleField id={this.id} price={this.price}/>
          <ProductContentField name={this.name}/>
        </button>
      </div>
    );
  }
}
export default SenderProductBox