import React from "react";
import './addItem.css'
import { useState, useEffect } from 'react';



export default function FunctionalComponentAddItem() {



    const [shoppingList, setShoppingList] = useState<any>(null);
    const [counter, setCounter] = useState<any>(0);


    // Questa funzione parte la prima volta che viene caricata la pagina e va a caricare LISTASPESA dal local storage
    useEffect(() => {
        const data = window.localStorage.getItem('LISTASPESA')
        if (data !== null) { setShoppingList(JSON.parse(data)) }
    }, [])

    // Questa funzione è alle dipendenze di "shoppingList" e parte ogni volta che shoppingList cambia
    useEffect(() => {
        window.localStorage.setItem('LISTASPESA', JSON.stringify(shoppingList))
    }, [shoppingList])



    //INPUT PER RIEMPIRE CARRELLO --------------------------------------------------------------------------------------

    async function addToCart() {
        console.log("click");

        let insert = (document.getElementById('insert') as HTMLInputElement)

        const item = [insert.value, counter]

       await setShoppingList((shoppingList: string[] ) => [...shoppingList, item])

       insert.value = ""
       setCounter(0)
    }


    // BOTTONE PER CANCELLARE CARRELLO

    function deleteCart() {
        setShoppingList([])
    }

    //CONTATORE
    function counterIncrease(){
        setCounter((counter: number)=>Math.min((counter +1),99))
    }
    function counterDecrease(){
        setCounter((counter: number)=>Math.max((counter -1),0))
    }




    return (<>

        <div className='row'>
            <div className='col-12 all-centered'>
                <div className='AddItem-container all-centered'>
                    <input id="insert" placeholder="Inserisci un articolo" type="text" />
                    <span>N°</span>
                    <button className="minus-button all-centered" onClick={() => { counterDecrease() }}>-</button>
                    <span className="counter all-centered">{counter}</span>
                    <button className="plus-button all-centered" onClick={() => { counterIncrease() }}>+</button>
                    <button className="confirm-button all-centered ms-3" onClick={() => { addToCart() }}>CONFERMA</button>
                    <button className="confirm-button all-centered ms-3" onClick={() => { deleteCart() }}>CANCELLA</button>
                </div>
            </div>
        </div>

        <div className="row">
            <div className='col-12 all-centered'>
                <div className="mt-5 all-entered flex-column text-center">
                {shoppingList &&
                shoppingList.map((e:string) =>{
                   return <p>{e}</p>
                })}
                </div>
            </div>
        </div>


    </>)
}