import React from 'react';
import ReactDOM from 'react-dom';


class Cards extends React.Component{
    constructor(props){
        super(props)
        this.state({
            visible: true
        })
    }

    onCardClick(msg){
        this.setState({
            visible: false
        })
        this.props.chooseRestItFunction(msg)
    }

    render(){
        if(this.state.visible){
            return(
                <div className="d-flex justify-content-around">
                    <div className="card m-4">
                        <button className="btn btn-outline-dark" onclick={this.onCardClick('sender')}>
                                <img className="card-img-top"  alt="Card image cap"/>
                                <div className="card-body">
                                    <p className="card-text text-center">Sender</p>
                                </div>
                        </button>
                    </div>
                    <div className="card m-4">
                        <button className="btn btn-outline-dark" onclick={this.onCardClick('receiver')}>
                            <img className="card-img-top"  alt="Card image cap"/>
                            <div className="card-body">
                                <p className="card-text text-center">Receiver</p>
                            </div>
                        </button>
                    </div>
                </div>
            )
        }
    }
}
