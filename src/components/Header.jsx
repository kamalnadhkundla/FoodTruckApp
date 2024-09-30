import logoImg from '../assets/logo.jpg'
import CartContext from '../store/CartContext.jsx'
import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from './UI/Button.jsx'
import { useContext } from 'react'

export default function Header(){
const cartctx=  useContext(CartContext);
const userprogressctx=useContext(UserProgressContext);
const totalcartItems = cartctx.items.reduce((totalNumberOfItems,item)=>{
    return totalNumberOfItems+item.quantity;
},0);

function handleShowCart(){
    userprogressctx.showCart();
}
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restuarant"/>
            <h1>Kamal Food Truck</h1>
          
        </div>
        <nav>
            <Button  onClick={handleShowCart} textOnly={true}>cart-{totalcartItems}</Button>
        </nav>
    </header>
}