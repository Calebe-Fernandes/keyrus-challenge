import React from 'react'
import {Link} from 'react-router-dom'
import "./header.css"
import logo from '../../assets/smartphone.svg'
import perfil from '../../assets/usuario-de-perfil.svg'
import carrinho  from '../../assets/shopping-cart.svg'

export default function Header() {
   
    return (
       
       <div className ="header">
          
                <div id = "logo"className = "menu-header">
                <Link to='/'><img  src={logo} alt=""/> </Link>
                        <h1>PHOTO STORE</h1>
                </div>
          
  
           
          
           <div className="menu-header">
                <a href="/"><img src={perfil} alt=""/></a>
                <a href="/"><img src={carrinho} alt=""/></a>
           </div>

       </div>
    )
}
