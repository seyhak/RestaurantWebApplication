import React from 'react';
import ReactDOM from 'react-dom';
import Switcher from  './switcher/switcher';
import  './main.css'


class OrderManager{
    constructor(){
        //TODO USER
        window.addEventListener('load', () => {
            const element = document.getElementsByClassName('order_manager_containter')
            ReactDOM.render(
                <Switcher/>, element[0]
            )
        })
    }       
}

const orderManager = new OrderManager()

export default OrderManager;