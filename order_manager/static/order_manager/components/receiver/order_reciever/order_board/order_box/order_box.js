function OrderFieldTitle(props){
    return(
      <h4>{props.id} {props.time.slice(11,19)}</h4>
    );
  }
  function OrderFieldContent(props){//dokonczyc jutro
    var content="";
    for(var i = 0; i<props.products.length; i++){
      content+=(<p> - {props.products.pop()}</p>);
    }
    console.log(content);
    return(
      <div className="order_box_content">
        {content}
      </div>
    );
  }
  class OrderBox extends React.Component{
  
    render()
    {
      console.log(this.props);
      return(
        <button className="order_box" id = {this.props.order.id} onClick={this.props.onOrderClick}>
          <OrderFieldTitle id={this.props.order.id} time = {this.props.order.order_date}/>
          <OrderFieldContent products ={this.props.order.products}/>
        </button>
      );
    }
  }