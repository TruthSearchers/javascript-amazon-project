export const cart=JSON.parse(localStorage.getItem('cart'))||[
  
]

export function addToCart(productId,index,f){
 
    
  let match=false;
  cart.forEach(obj=>{
    if(obj.productId===productId){
      match=true;
    }
    
  })
  let s=document.querySelectorAll('select');
  
  f=Number(s[index].value);
  
  

  if(match){
    cart[index].quantity=cart[index].quantity+f;

  }
  else{
    
    cart.push({
      productId:productId,
      quantity:f
    })
    
  }
}

