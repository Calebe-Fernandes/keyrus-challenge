import React from 'react'
import "./footer.css"
import logo from '../../assets/smartphone.svg'


export default function Footer() {
    return (
       
       <div className ="footer">
           <div id = "logo"className = "menu-footer">
                <img  src={logo} alt=""/>
                <h1>PHOTO STORE</h1>
           </div>
          
           <div className="menu-footer">
               <p>Designed and Coded with ♥ <br></br>by Calebe Fernandes</p>
           </div>

       </div>
    )
}
