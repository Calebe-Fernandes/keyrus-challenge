import React from 'react'


import Footer from '../../components/footer/footer'
import Header from '../../components/header/header'

import './product.css'


class Product extends React.Component{
    
    state = {
        api: [],
        loading: false
    }

    
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
                    return alert(`Cant communicate with API, error : ${res.error}`)

                
                return this.setState({
                
                loading: false,
                api: res
            
           })}
            
        )
                   
    }

    constructor(props) {
        super(props);
        this.state = {
            cart:0,
            description: false
        }
        
    }


    increment(){

        this.setState({
            cart: this.state.cart + 1
        })
    }

    decrement(){
        if(this.state.cart === 0){
            return 
        }

        this.setState({
            cart: this.state.cart - 1
        })
    }

    setCart(){
        this.content = this.state.cart
        console.log(this.content)
    }

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

  render() {
    return (
       
     <>  
       <header>
           <Header/>
       </header>
       
       <div className="main-content">
                        
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
                                

                                {this.state.api.stock.stockLevel  > 0 && this.state.api.stock.stockLevel >= this.state.cart ? (<button  className='active' onClick={this.setCart.bind(this)}>Add to Cart</button>):
                                    <>
                                        <button disabled className='off'> Add to Cart</button> 
                                    </>
                                }

                                    
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
                 
            
                
        </div>

        <footer>
            <Footer/>
        </footer>
        
    
    
    </>


    );
}
}

export default Product