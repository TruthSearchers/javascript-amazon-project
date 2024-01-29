import {cart, addToCart,updateCartQuantity} from '../data/cart.js'
import {products} from '../data/products.js'



products.forEach(obj=>{
  const html =`<div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${obj.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${obj.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="images/ratings/rating-${obj.rating.stars*10}.png">
    <div class="product-rating-count link-primary">
      ${obj.rating.count}
    </div>
  </div>

  <div class="product-price">
    $${(obj.priceCents/100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select>
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary" data-product-id="${obj.id}">
    Add to Cart
  </button>
</div>`;
  document.querySelector('.products-grid').innerHTML+=html
});





let f=1;
let timeoutid;

document.querySelector('.cart-quantity').innerText=`${updateCartQuantity()}`;




document.querySelectorAll('.add-to-cart-button').forEach((button,index)=>{
  button.onclick=()=>{
    const productId=button.dataset.productId;
    addToCart(productId,index,f);
    document.querySelector('.cart-quantity').innerText=`${updateCartQuantity()}`;
   
    document.querySelectorAll('.added-to-cart')[index].style.opacity=1;

    clearTimeout(timeoutid);

    timeoutid=setTimeout(()=>{
      document.querySelectorAll('.added-to-cart')[index].style.opacity=0;
    },2000)
    
    
        
  }
  }
)











