import {cart,del,updateCartQuantity,updateCart, calculatePrice,updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

import { deliveryOptions } from '../data/deliveryOptions.js';
// document.querySelector('.cart-count').innerHTML=cart.length;

// const today= dayjs();
// const delivery7Date=today.add(7,'days').format('dddd, MMMM D')

// const delivery3Date=today.add(3,'days').format('dddd, MMMM D')

// const delivery2Date=today.add(2,'days').format('dddd, MMMM D')
// // const finalDate=deliveryDate.format('dddd, MMMM D')





document.querySelector('.return-to-home-link').innerText=`${updateCartQuantity()} items`

document.querySelector('.num').innerText=`${updateCartQuantity()}`;



calculatePrice(cart,products,deliveryOptions);

function renderOrderSummary(){
  const orderSummaryContainer = document.querySelector('.order-summary');
  orderSummaryContainer.innerHTML = '';
  cart.forEach((obj,index)=>{

    let i=products.findIndex((p)=>{
      return p.id===obj.productId;
    })

    let deliveryOption='';
    deliveryOptions.forEach(delivery=>{
      if(delivery.id===obj.deliveryOptionId){
        deliveryOption=delivery
      }
    })

    const deliveryDate= dateToDeliver(deliveryOption);
    let html=`<div class="cart-item-container-${products[i].id}">
    <div class="delivery-date">
      Delivery Time: ${deliveryDate}
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
            Quantity: <span class="quantity-label-${products[i].id}">${obj.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link-${products[i].id}" data-product-id='${products[i].id}'>
            Update
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${products[i].id}'>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryHTML(products[i].id,obj)}
      </div>
    </div>
  </div>`
  document.querySelector('.order-summary').innerHTML+=html;
  })



  function dateToDeliver(delivery){
    const today = dayjs();
    return today.add(delivery.deliveryDays,'days').format('dddd, MMMM D');
  }

  function deliveryHTML(id,obj){
    let html='';
    deliveryOptions.forEach((delivery)=>{
      
      let deliveryDate= dateToDeliver(delivery);
      const p= delivery.priceCents===0?'FREE':`$${(delivery.priceCents/100).toFixed(2)} -`

      let isChecked;
      if(delivery.id===obj.deliveryOptionId){
        isChecked=true;
      }
    

      
      

      html +=`
      <div class="delivery-option js-delivery-option"
      data-product-id="${id}"
      data-delivery-option-id="${delivery.id}"
      
      >
        <input type="radio"
          ${isChecked?'checked':''}
          class="delivery-option-input"
          name="delivery-option-${id}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate}
          </div>
          <div class="delivery-option-price">
            ${p} Shipping
          </div>
        </div>
      </div>`
    })
    return html
  }




  function handleUpdateQuantityClick(event) {
    const link = event.target;
    const productId = link.dataset.productId;
    const quantityInput = `<input type="number" autofocus class="qnt-${productId}" style="width:50px;">`;
    const saveButton = `<button class="save-${productId}" >Save</button>`;

    
    const quantityLabel = document.querySelector(`.quantity-label-${productId}`);
    quantityLabel.innerHTML = quantityInput;

    
    link.innerHTML = saveButton;

    
    const saveBtn = document.querySelector(`.save-${productId}`);
    saveBtn.onclick = () => {
      
      const updatedQuantity = updateCart(productId,products,deliveryOptions);

      
      quantityLabel.textContent = updatedQuantity;
      link.textContent = "Update";
    };
  }


  document.querySelectorAll('.update-quantity-link').forEach(link => {
    link.addEventListener('click', handleUpdateQuantityClick);
  });


  document.querySelectorAll('.delete-quantity-link').forEach((obj,i)=>{
    
    obj.onclick=()=>{
      const productId= obj.dataset.productId;
      del(productId,products,deliveryOptions);
      
    }

  })

  document.querySelectorAll('.js-delivery-option').forEach((obj,i)=>{
    obj.onclick=()=>{
      const productId=obj.dataset.productId;
      const deliveryOptionId=obj.dataset.deliveryOptionId;
      updateDeliveryOption(productId,deliveryOptionId)

      calculatePrice(cart,products,deliveryOptions);
      renderOrderSummary();
      
    }
  })

}

renderOrderSummary();

  
  




