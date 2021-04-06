import React from 'react'

import './carrinho.css'




export default function Carrinho(props) {
    let {name,quantity,total} = props
  
    return (
      <>
        {quantity > 0 ? (
             <div className="background">
                <h1>You have these items on cart:</h1>
             <div className="item">
               <h2>Product: {name}</h2>
               <h2>Quantity:{quantity}</h2>
               <h2>Total: ${total.toFixed([2])}</h2>
             </div>
 
         </div>
        ): <div className="background">
              <h1>There are no products</h1>
          </div>
      }
       
      </>
    )

  }


