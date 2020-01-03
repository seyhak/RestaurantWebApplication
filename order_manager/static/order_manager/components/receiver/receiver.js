class Receiver{

    constructor(companyID){
      this.companyID = companyID;
      this.companyID = this.companyID[0];///decision for workplace - todo
      this.orders="";
      var me = this;
      $.when(this.getUndoneOrders()).done(function(data){
        me.orders=data;
        me.runReceiverUI();
      });
    }
  
    runReceiverUI(){
      //console.log(this.orders);
      //var reactReceiver = new OrdersReciever(this.orders);
      ReactDOM.render(<OrdersReceiver orders = { this.orders }/>, document.getElementById("order_board"));
    }
  
     getUndoneOrdersJsonUrl(){
      var base = "http://127.0.0.1:8000/";
      var url = base + "rest/order/?delivered=false&deliverant="+ this.companyID;
      return url;
    }
  
    getUndoneOrders(){
      var url = this.getUndoneOrdersJsonUrl();
      //console.log(url);
      return $.getJSON(url,function(data){
      });
    }
  };
  export {Receiver};