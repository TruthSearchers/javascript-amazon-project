import {cart} from '../data/cart.js';
import {products} from '../data/products.js';


// document.querySelector('.cart-count').innerHTML=cart.length;

let k= cart.reduce((acc, obj)=>{
    return acc+obj.quantity;
  },0)

document.querySelector('.return-to-home-link').innerText=`${k} items`

document.querySelector('.num').innerText=`${k}`;

let price=0;
for(let i=0;i<cart.length;i++){
  if(cart[i].productId===products[i].id){
    price+=Number(products[i].priceCents)/100 * Number(cart[i].quantity)
    
  }
}
let tbt=Number(price+4.99);
let tax=Number((tbt*10/100).toFixed(2));
let total=Number(tbt+tax).toFixed(2);

document.querySelector('.payment-summary-money').innerText=`$${price.toFixed(2)}`

document.querySelector('.tbt').innerText=`$${tbt}`

document.querySelector('.tax').innerText=`$${tax}`

document.querySelector('.total').innerText=`$${total}`

let t=document.querySelectorAll('.delete-quantity-link')
console.log(t);

function del(obj,i){
    console.log(obj);
    cart.splice(i,1);
    document.querySelectorAll('.cart-item-container')[i].innerHTML=''
    localStorage.setItem('cart',JSON.stringify(cart))
}



cart.forEach((obj,index)=>{

  let i=products.findIndex((p)=>{
    return p.id===obj.productId;
  })
  let html=`<div class="cart-item-container">
  <div class="delivery-date">
    Delivery date: Tuesday, June 21
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${products[i].image}">

    <div class="cart-item-details">
      <div class="product-name">
        ${products[i].name}
      </div>
      <div class="product-price">
        $${(products[i].priceCents/100).toFixed(2)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${obj.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary">
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options">
      <div class="delivery-options-title">
        Choose a delivery option:
      </div>
      <div class="delivery-option">
        <input type="radio" checked
          class="delivery-option-input"
          name="delivery-option-${products[i].id}">
        <div>
          <div class="delivery-option-date">
            Tuesday, June 21
          </div>
          <div class="delivery-option-price">
            FREE Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${products[i].id}">
        <div>
          <div class="delivery-option-date">
            Wednesday, June 15
          </div>
          <div class="delivery-option-price">
            $4.99 - Shipping
          </div>
        </div>
      </div>
      <div class="delivery-option">
        <input type="radio"
          class="delivery-option-input"
          name="delivery-option-${products[i].id}">
        <div>
          <div class="delivery-option-date">
            Monday, June 13
          </div>
          <div class="delivery-option-price">
            $9.99 - Shipping
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`
document.querySelector('.order-summary').innerHTML+=html;
})