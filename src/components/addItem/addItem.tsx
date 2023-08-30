import React from "react";
import './addItem.css'
import { useState, useEffect } from 'react';



export default function FunctionalComponentAddItem() {



    const [shoppingList, setShoppingList] = useState<any>([]);
    const [counter, setCounter] = useState<number>(1);


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

        let insert = (document.getElementById('insert') as HTMLInputElement)

        if (insert.value) {

            const item = [insert.value, counter]


            await setShoppingList((shoppingList: string[] | number[]) => [...shoppingList, item])

            insert.value = ""
            setCounter(1)

        }

    }


    // Contatore di item agganciato come Key al frame
    let itemCounter: number = 0

    // BOTTONE PER CANCELLARE CARRELLO

    function deleteCart() {
        setShoppingList([])
        itemCounter = 0
    }

    //CONTATORE
    function counterIncrease() {
        setCounter((counter: number) => Math.min((counter + 1), 99))
    }
    function counterDecrease() {
        setCounter((counter: number) => Math.max((counter - 1), 1))
    }

    //ELIMINA SINGOLO OGGETTO
    const deleteItem = (e: any): void => {

        let buttonValue: number = Number(e.value)

        setShoppingList(JSON.parse(JSON.stringify(shoppingList.toSpliced(buttonValue, 1))))


    }

    

    //COLORA OGGETTO
    const changeItemStatus = (e: any): void => {

       
        let buttonValue: number = Number(e.value)

       

        const getItem = document.getElementById(`item-${buttonValue}`)
        getItem?.classList.toggle(`marked`)

        const getStatusButton = document.getElementById(`status-button-${buttonValue}`)
        getStatusButton!.classList.toggle(`status-button`)
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

        <div className="row all-centered mt-5">
            <div className='col-6 d-flex flex-column cart-list-container'>
                {shoppingList &&
                    shoppingList.map((shoppingList: string) => {
                        return <React.Fragment key={itemCounter++}>
                            <div className="d-flex">

                                <button id={`status-button-${itemCounter}`} className="mx-4 changeItemStatus-button all-centered material-symbols-outlined" value={itemCounter} onClick={e => changeItemStatus(e.target as HTMLButtonElement)} >check_circle</button>
                                {/* <span className="all-centered" >ID: {itemCounter}</span> */}
                                <span className="mx-4 all-centered">N° {shoppingList[1]}</span>
                                <div className="mx-4 item-name-box" id={`item-${itemCounter}`}>
                                    <span className="ms-2">{shoppingList[0]}</span>
                                </div>
                                <button className="mx-4 deleteItem-button material-symbols-outlined " value={itemCounter} onClick={e => deleteItem(e.target as HTMLButtonElement)}>cancel</button>
                                

                            </div>


                        </React.Fragment>
                    })}

            </div>
        </div>


    </>)
}