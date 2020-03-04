import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from  './app_container';
import  './main.css'


class OrderManager{
    constructor(){
        //TODO USER
        window.addEventListener('load', () => {
            const element = document.getElementsByClassName('order_manager_containter')
            const user = {
                id: 2
            }
            ReactDOM.render(
                <AppContainer user={user}/>, element[0]
            )
        })
    }       
}

const orderManager = new OrderManager()

export default OrderManager;