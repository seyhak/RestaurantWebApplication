import React from 'react';

class Switcher extends React.Component{
  constructor(props){
    super(props)
    this.chooseRestItFunction = this.props.chooseRestItFunction
  }


  render(){
    return(
      <div className="d-flex justify-content-around">
          <div className="card m-4">
              <button className="btn btn-outline-dark" onClick={() => {this.chooseRestItFunction('sender')}}>
                      <img className="card-img-top" alt="Card image cap"/>
                      <div className="card-body">
                          <p className="card-text text-center">Sender</p>
                      </div>
              </button>
          </div>
          <div className="card m-4">
              <button className="btn btn-outline-dark" onClick={() => {this.chooseRestItFunction('receiver')}}>
                  <img className="card-img-top" alt="Card image cap"/>
                  <div className="card-body">
                      <p className="card-text text-center">Receiver</p>
                  </div>
              </button>
          </div>
      </div>
    )
  }

}

export default Switcher;