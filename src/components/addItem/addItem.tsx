import React from "react";
import './addItem.css'
import { useState, useEffect } from 'react';



export default function FunctionalComponentAddItem() {
    
    

    const [shoppingList, setShoppingList] = useState<any>(null);


    // Questa funzione parte la prima volta che viene caricata la pagina e va a caricare INVENTARIO dal local storage
    useEffect(() => {
        const data = window.localStorage.getItem('LISTASPESA')
        if (data !== null) { setShoppingList(JSON.parse(data)) }
    }, [])

    // Questa funzione è alle dipendenze di "inventory" e parte ogni volta che inventory cambia
    useEffect(() => {
        window.localStorage.setItem('LISTASPESA', JSON.stringify(shoppingList))
    }, [shoppingList])


    
    
    function addToChart (): void{
        console.log("click");
        
        const insert = (document.getElementById('insert') as HTMLInputElement).value
        console.log(insert);
        
        const shoppingCart : string[] = []
        shoppingCart.push(insert)
        setShoppingList(shoppingCart)
    }





    return (<>

        <div className='row'>
            <div className='col-12 all-centered'>
                <div className='AddItem-container all-centered'>
                    <input id="insert" placeholder="Inserisci un articolo" type="text" />
                    <span>N°</span>
                    <button className="minus-button all-centered">-</button>
                    <span className="counter all-centered">0</span>
                    <button className="plus-button all-centered">+</button>
                    <button className="confirm-button all-centered ms-3" onClick={()=>{addToChart()}}>CONFERMA</button>
                </div>
            </div>
        </div>


    </>)
}