
export let cart;
loadStorage();

export function loadStorage(){
  cart=JSON.parse(localStorage.getItem('cart'))||[
  
  ]
}


export function addToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart(productId,index,f){
 
  let match;
  cart.forEach(obj=>{
    if(obj.productId===productId){
      match=obj;
    }
    
  })
  let s=document.querySelectorAll('select');
  
  if(s[index]){
    f=Number(s[index].value);
  }
  
  
  if(match){
    match.quantity=match.quantity+f;

  }
  else{
    
    cart.push({
      productId:productId,
      quantity:f,
      deliveryOptionId:'1'
    })
    
  }
  addToStorage()
}

export function updateDeliveryOption(productID,deliveryOptionId){
  let match;

  cart.forEach((cartItem)=>{
    if(cartItem.productId===productID){
      match=cartItem;
    }
  })

  match.deliveryOptionId=deliveryOptionId;

  

  addToStorage();

}
export function del(productId,products,delivery){
  let arr=[]

  cart.forEach(item=>{
    if(item.productId!==productId){
      arr.push(item)
    }
  })
  
  cart=arr;
  addToStorage();
  document.querySelector(`.cart-item-container-${productId}`).remove();
    
  // document.querySelector('.return-to-home-link').innerText=`${updateCartQuantity()} items`

  // document.querySelector('.num').innerText=`${updateCartQuantity()}`;
  // calculatePrice(cart,products,delivery);
  
}

export function updateCart(productId,products,delivery){
  let arr2=cart.slice();
  let v=document.querySelector(`.qnt-${productId}`);
  arr2.forEach(obj=>{
    if(productId===obj.productId){
      obj.quantity=Number(v.value);
    }
  })
  cart=arr2;

  document.querySelector('.return-to-home-link').innerText=`${updateCartQuantity()} items`

  document.querySelector('.num').innerText=`${updateCartQuantity()}`;

  addToStorage();
  calculatePrice(cart,products,delivery);

  return v.value;

}

export function updateCartQuantity(){

  let quantity=0;
  cart.forEach(obj=>{
    quantity+=obj.quantity
  })
  
  return quantity;
}

export function calculatePrice(k,products,delivery){
  let price=0;
  let shipping=0;
  let tbt=0;
  let tax=0;
  let total=0;
  if(cart.length==0){
    price=0;
    shipping='0.00';
    tbt='0.00';
    tax='0.00';
    total='0.00';
  }
  else{
    k.forEach((obj)=>{
      let i=products.findIndex((p)=>{
        return p.id===obj.productId;
      })

      let d=delivery.findIndex((p)=>{
        return p.id===obj.deliveryOptionId;
      })
      
      price+=(Number(products[i].priceCents)/100 * Number(obj.quantity))

      shipping+=Number(delivery[d].priceCents)/100
    }
    )
      

    tbt=Number((price+shipping).toFixed(2));
    tax=Number((tbt*10/100).toFixed(2));
    total=Number(tbt+tax).toFixed(2);
  }  
  document.querySelector('.payment-summary-money').innerText=`$${price.toFixed(2)}`
  document.querySelector('.shipping').innerText=`$${shipping}`

  console.log(tbt)

  document.querySelector('.tbt').innerText=`$${tbt}`

  document.querySelector('.tax').innerText=`$${tax}`

  document.querySelector('.total').innerText=`$${total}`
}

