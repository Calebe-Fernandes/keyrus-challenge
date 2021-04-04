import React from 'react'
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'

import './product.css'


class Product extends React.Component{

    render(){
        return(
            <>
                <header>
                    <Header/>
                </header>

                <div className="main-content">
                        
                        <div className="product-card">
                            <img id = "product-img"src="https://pixnio.com/free-images/2019/01/13/2019-01-13-09-47-37.jpg" alt=""/>
                            
                            <div className = 'infos'>
                                <h1>Product Name</h1>
                                <h2>Product summary</h2>
                                <h2>Product price</h2>
                                <button>Add to Cart</button>
                            </div>
                        </div>
                        

                </div>
                       

                <footer>
                    <Footer/>
                </footer>
            </>
        )
    }

}

export default Product