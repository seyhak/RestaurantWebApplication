import React from 'react';
import OrdersSender from './order_sender/order_sender';
import Cookies from 'js-cookie';

class Sender extends React.Component{
  constructor(props){
    super(props)
    this.companyID = this.props.companyID[0]//choice TODO;
    this.state = ({
      loading: false,
      products: null
    })
  }
  //id filtering todo
  getProducts(){
    this.setState({
      loading: true
    })
    // console.log(this.state)
    const seller = "seller=" + this.companyID
    let url = window.location.origin + "/rest/product/?" + seller
    $.getJSON(url, function(data){
    })
    .fail(() => {
      console.log("wrong company ID")
      this.setState({
          loading: false
      })
  })
  .success((data) => {
      console.log(data)
      this.setState({
          products: data,
          loading: false
      })
  })
  }

  render(){
    if(this.state.products == null && !this.state.loading){
      this.getProducts()
    }
    if(this.state.products != null && !this.state.loading){
      // console.log('rendering order_sender')
      return(
        <OrdersSender products = { this.state.products }/>
      )
    }
    else {
      //loading here
      // console.log('loading sender products')
      return(
        <button className='btn-1'>loading</button>
      )
    }
  }
  
}

export default Sender;