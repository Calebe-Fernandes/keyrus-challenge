import React from 'react'

import "./home.css"
import promo from '../../assets/mobile.svg'


import leftArrow from '../../assets/left-arrow.svg'
import righttArrow from '../../assets/right-arrow.svg'




import '../../components/card/card.css'

class Home extends React.Component {
    state = {
        api: [],
        loading: false
    }

    
    componentWillMount() {
        this.setState(state => ({
            ...state,
            loading: true
        }));

         fetch('http://challenge-front-end.us-east-2.elasticbeanstalk.com/retrieve-product/products')
           .then(res => res.json())
           .then(res => {
                if(res.error)
                    return alert(`Cant communicate with API, error : ${res.error}`)

                
                return this.setState({
                
                loading: false,
                api: res.products
            
           })}
            
        )
                    
    }

    constructor(props) {
        super(props);
        this.carouslRef = React.createRef();

    }

   prev = () => {
        this.carouslRef &&
        this.carouslRef.current &&
        this.carouslRef.current.scrollTo({
            behavior: "smooth",
            top: 0,
            left:
            this.carouslRef.current.scrollLeft - this.carouslRef.current.clientWidth * 0.5,
        });
  }


   next = () => {
    this.carouslRef &&
      this.carouslRef.current &&
      this.carouslRef.current.scrollTo({
        behavior: "smooth",
        top: 0,
        left:
          this.carouslRef.current.scrollLeft + this.carouslRef.current.clientWidth * 0.5,
      });
  }


  lowestPrice = () => {
   if(!this.state.loading){ 
    var list = []

    for (let index = 0; index < this.state.api.length; index++) {
        const element = this.state.api[index].price.value;
        list.push(element)  
          
    }

    let min = Math.min(...list)


    let position = list.indexOf(min)
   

    let lowest= this.state.api[position]
  
    return (
        <>
            <h1>{lowest.name}</h1>
            <p>{lowest.summary}</p>
            <h2>${lowest.price.value}</h2>
            {lowest.stock.stockLevel  > 0 ? (<button className = 'active'> Add to Cart</button>):
                <div id ='off'>
                    <button  className = 'off' disabled> Add to Cart</button>
                    <p>Out of Stock</p>
                </div>
            }
           
        </>
    )
   }
  }





    render() {

        return (
           
         <>  
           
           

            <div>
            
                <div className="banner">
                    
                    <img src={promo} alt=""/>

                    <div className="banner-description">
                    
                        {this.state.loading && (<h1>Loading...</h1>)}  
                            {!this.state.loading && (
                                this.state.api.length < 1 ? (<h1>There are no products</h1>)  :
                                this.lowestPrice()
                             )} 

                       
                                
                    </div>

                </div> 

                <div className="our-products">
                        
                    <h1>Our products</h1>

                    <div className= 'carousel'>
                        <button className='direction' onClick={this.prev}>
                            <img className='arrow' src={leftArrow} alt="left button" />
                        </button>

                        <div className='card-div'>
                            <main className='card-scroll' ref={this.carouslRef}>
                                {this.state.loading && (<h1>Loading...</h1>)}  
                                {!this.state.loading && (
                                    this.state.api.length < 1 ? (<h1>There are no products</h1>)  :
                                    this.state.api.map(item => ( 
                                        <div className='card' key = {item.code}>

                                            <img src="https://img.freepik.com/psd-gratuitas/modelo-de-postagem-do-instagram-na-maquete-de-celular-preto-flutuante-premium_200619-41.jpg?size=626&ext=jpg" alt=""/>
                                            <h1 className='text'>{item.name}</h1>
                                            <p>{item.summary}</p>
                                            <h2> ${item.price.value}</h2>
                                                    
                                            {item.stock.stockLevel  > 0 ? (<button > Add to Cart</button>):
                                                <>
                                                    <button disabled > Add to Cart</button> 
                                                </>
                                            }

                                            <a href={`http://challenge-front-end.us-east-2.elasticbeanstalk.com/retrieve-product/${item.code}`}>View Details</a>
                                            
                                        </div>
                                    )))}  
                            </main>
                        </div>

                        <button className='direction' onClick={this.next}>
                            <img className='arrow' src={righttArrow} alt="right button" />
                        </button>
                    </div>
                </div>
                            
            </div> 
            
        
        
        </>


        );
    }
}

export default Home;