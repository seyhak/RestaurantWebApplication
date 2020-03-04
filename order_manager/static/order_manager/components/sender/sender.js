import React from 'react';
import OrdersSender from './order_sender/order_sender';
import Cookies from 'js-cookie';

class Sender extends React.Component{
  constructor(props){
    super(props)
    this.companyID = this.props.companyID[0]//choice TODO;
    this.state = ({
      loading = false,
      products = null
    })
  }
  //id filtering todo
  getProducts(id_list){
    this.setState({
      loading: false
    })
    const seller = "seller=" + this.companyID
    let url = window.location.origin + "/rest/product/?" + seller
    $.getJSON(url,function(data){
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
      this.getProducts(this.companyID)
    }
    if(this.state.loading){
      //loading here
    }
    else{
      return(
        <OrdersSender products = { this.state.products }/>//TODO
      )
    }
  }
  
}

export default Sender;