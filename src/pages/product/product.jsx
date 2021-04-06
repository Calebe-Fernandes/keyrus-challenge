import React from 'react'
import {Link} from 'react-router-dom'
//STYLES
import './product.css'
import "../../components/header/header.css"

//COMPONENTS
import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'
import Carrinho from '../../components/carrinho/carrinho'

//assets
import logo from '../../assets/smartphone.svg'
import perfil from '../../assets/usuario-de-perfil.svg'
import carrinho  from '../../assets/shopping-cart.svg'




class Product extends React.Component{
    
    state = {
        api: [],
        loading: false
    }

    // API CALL
    componentWillMount() {
        let id = this.props.match.params

        this.setState(state => ({
            ...state,
            loading: true
        }));

         fetch(`http://challenge-front-end.us-east-2.elasticbeanstalk.com/retrieve-product/${id.code}`)
           .then(res => res.json())
           .then(res => {
                if(res.error)
                    return alert(`There is no product with code ${id.code}, error : ${res.error}`)

                
                return this.setState({
                
                loading: false,
                api: res
            
           })}
            
        )
                   
    }

    //STATES
    constructor(props) {
        super(props);
        this.state = {
            cart:0,
            description: false,
            cartProducts:0,
            open:false
        }
        
    }

    // INCREMENT BUTTON FOR PRODUCT QUANTITY
    increment(){

        this.setState({
            cart: this.state.cart + 1
        })
    }

    //DECREMENT BUTONN FOR PRODUCT QUANTITY - IT CANNOT BE LESS THAN 0.
    decrement(){
        if(this.state.cart === 0){
            return 
        }

        this.setState({
            cart: this.state.cart - 1
        })
    }

    //SHOW FULL PRODUCT DESCRIPTION
    showDetails(){
        if(this.state.description){
            this.setState({
                description: false
            });
        }
        else{
            this.setState({
                description: true
            });
        }
    }

    //ADD ITEMS TO CART
    addToCart = () => {
        
            
         if((this.state.cartProducts < this.state.api.stock.stockLevel) && !this.state.loading){
            let cartState = this.state.cartProducts  + this.state.cart

            if(cartState <= this.state.api.stock.stockLevel){
                this.setState({
                    cartProducts:cartState
                })
            }
         

        }
  
    }

    //CLEAR CART
    clearCart(){
        this.setState({
            cartProducts:0
        })
    }

    //SHOW / HIDE CART
    cart(){
        const isOpen = !this.state.open
        this.setState({
            open:isOpen
        })
    }

    //THE STOCK VALIDATION WAS MADE BY RENDERING BUTTONS DEPENDING ON THE QUANTITY THA THE USER WANTS, AND THE QUANTITY IN STOCK AT LINE 118

  render() {
    return (
       
     <>  
       <header>
            <div className ="header">
            
                <div id = "logo"className = "menu-header">
                    <Link to='/'><img  src={logo} alt=""/> </Link>
                    <h1>PHOTO STORE</h1>
                </div>
                
                <div className="menu-header">
                    <a href="/"><img src={perfil} alt=""/></a>
                    <button className = "cart" onClick ={this.cart.bind(this)}><img src={carrinho} alt=""/> 
                    {this.state.cartProducts > 0 && (
                    <p>{this.state.cartProducts}</p>
                           
                    )}
                   
                   
                    </button>
                </div>

            </div>
       </header>
        
       {this.state.open ? (  
            
            <Carrinho
                key={this.state.api.name}
                name= {this.state.api.name}
                quantity={this.state.cartProducts}
                total = {this.state.cartProducts * this.state.api.price.value}
            />
           
         )
         : <></> 
         }


       
       <div className="main-content">
                {!this.state.loading ? 
                (
                    <>
                        <div className="product-card">
                            <div className="wrapper">
                        
                                <img id = "product-img"src="https://pixnio.com/free-images/2019/01/13/2019-01-13-09-47-37.jpg" alt=""/>
                                {!this.state.loading && (
                                    <div className = 'infos'>
                                        <h1>{this.state.api.name}</h1>
                                        <h3>{this.state.api.summary}</h3>
                                        <h2>${this.state.api.price.value}</h2>

                                        <div className="counter">
                                            <button  className='activeb' onClick = {this.decrement.bind(this)}> - </button>
                                            <p>{this.state.cart}</p>
                                            <button  className='activeb' onClick = {this.increment.bind(this)}> + </button>
                                        </div>
                                        

                                        {this.state.api.stock.stockLevel  > 0 && this.state.api.stock.stockLevel >= this.state.cart && this.state.api.stock.stockLevel > this.state.cartProducts ? (<button  className='active' onClick = {this.addToCart.bind(this)}>Add to Cart</button>):
                                            <>
                                                <button disabled className='off'> Add to Cart</button> 
                                            </>
                                        }
                                        
                                        <button className = 'clear' onClick = {this.clearCart.bind(this)}>Clear Cart</button>
                                            
                                    </div>)
                                }   
                                
                            </div> 
                                
                                <button className = 'show-hide' onClick ={this.showDetails.bind(this)}>Description</button>

                                {this.state.description && 
                                    <div className ='description'>
                                            {!this.state.loading ? (<div dangerouslySetInnerHTML={{__html:this.state.api["description"]}}></div>): <></>}
                                    </div> 
                                }
                            
                        </div>

                      
                        
                    </>
                 
                ): <h1>Loading...</h1>}     
                
            
                
        </div>

        <footer>
            <Footer/>
        </footer>
        
    
    
    </>


    );
}
}

export default Product