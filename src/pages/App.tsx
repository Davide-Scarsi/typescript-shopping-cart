import React from 'react';
import './App.css';
import AddItem from "../components/addItem/addItem";
import Item from "../components/item/item";

function App() {


  return (
    <>

      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />


      <div className="vh-100 bg-dark text-white">

        <div className='container'>
          <div className='row'>
            <div className='col-12 all-centered'>
              <span className="material-symbols-outlined shopping-cart-icon">shopping_cart</span>

              <h1>Carrello della spesa</h1>
            </div>
          </div>

          {/* row */}
          <AddItem />

          <div className='row'>
            <div className='col-12 all-centered'>
              <Item />
            </div>
          </div>

        </div>

      </div>
    </>
  );
}

export default App;
