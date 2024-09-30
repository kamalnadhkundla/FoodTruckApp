import { useContext } from 'react';
import Modal from './UI/Modal.jsx';
import CartContext from '../store/CartContext';
import { currencyFormatter } from '../util/formatting';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext.jsx';
import CartItem from './CartItem.jsx';

export default function Cart() {
    const cartctx = useContext(CartContext);
    const userprogressctx = useContext(UserProgressContext);

    // Fixing the reduce function
    const cartTotal = cartctx.items.reduce(
        (totalprice, item) => totalprice + item.quantity * item.price,
        0
    );
    function handleCloseCart(){
        userprogressctx.hideCart();
    }
 function goToCheckOut(){
    userprogressctx.showCheckout();
 }
    return (
        <Modal className="cart" open={userprogressctx.progress === 'cart'} onClose={userprogressctx.progress === 'cart'?handleCloseCart:null}>
            <h2>Your Cart</h2>
            <ul>
                {cartctx.items.map(item => (
                   <CartItem 
                   key={item.id} name={item.name} 
                   quantity={item.quantity} price={item.price}
                   onIncrease={()=> cartctx.addItem(item)} onDecrease={()=> cartctx.removeItem(item.id)}/>
                ))}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textonly onClick={handleCloseCart}>Close</Button>
            {cartctx.items.length>0 && <Button onClick={goToCheckOut}>Go to checkout</Button> }    
            </p>
        </Modal>
    );
}
