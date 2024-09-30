import Modal from './UI/Modal.jsx'
import CartContext from '../store/CartContext'
import { useContext } from 'react'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input.jsx';
import UserProgressContext from '../store/UserProgressContext.jsx';
import Button from './UI/Button.jsx';
export default function CheckOut(){


const cartCtx=useContext(CartContext);
const cartTotal = cartCtx.items.reduce(
    (totalprice, item) => totalprice + item.quantity * item.price,
    0
);
function  handleClose(){
    userProgressCtx.hideCheckout();
}
function handleSubmit(event){
    event.preventDefault();

   const fd= new FormData(event.target);
   const customerData= Object.fromEntries(fd.entries());

   fetch('http://localhost:3000/orders',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body : JSON.stringify({
        order:{
            items: cartCtx.items,
            customer:customerData,

        }
    })
   })

}
const userProgressCtx = useContext(UserProgressContext);
    return <Modal open={userProgressCtx.progress==='checkout'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p> Total amount : {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" type ="text" id="name" />
            <Input label ="E-mail Address" type="email" id="email"/>
            <Input label = "Street" type="text" id="street"/>
            <div className='control-row'>
                <Input label ="Postal Code" type="text" id ="postal-code"/>
                <Input label ="City" type="text" id="city"/>
            </div>
            <p className='modal-actions'>
                <Button type="button" textOnly onClick={handleClose}>Close</Button>
                <Button>Submit</Button>
            </p>

        </form>
    </Modal>

}