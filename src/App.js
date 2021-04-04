
import Footer from "./components/footer/footer.jsx";
import Header from "./components/header/header.jsx";
import Home from "./pages/home/home.jsx";

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Product from "./pages/product/product.jsx";


function App() {
  return (
    <BrowserRouter>
        <Switch>
          <Route exact path = '/' component={Home}/>
          <Route exact path = '/product' component={Product}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
