// abrir carrinho
let screenHidden=document.getElementById('Modal')
let btn_Screen=document.getElementById('button-cart')
let cartTot=document.getElementById('cart-total')
let adressInput=document.getElementById('adress')
let checkoutBtn=document.getElementById('finish')
let cart=[];
btn_Screen.addEventListener('click',function(){
    screenHidden.classList.remove('hidden');
        screenHidden.classList.add('flex');
        updateCartModal()

})
//levar pro carrinho
let addCart=document.querySelectorAll('.add-to-cart-btn')
let numberCart=document.getElementById('cart-count')
addCart.forEach(function (e){
e.addEventListener('click',function(event){
    
    let parentButton=event.target.closest('.add-to-cart-btn')
    if(parentButton){
        let name=parentButton.getAttribute('data-name')
        let price=parseFloat(parentButton.getAttribute('data-price'))
        addToCart(name,price)
    }
})
})
//fechar
let closeBtn=document.getElementById('close')

closeBtn.addEventListener('click',function(){
    screenHidden.classList.add('hidden');
        screenHidden.classList.remove('flex');
        
    })
//fechar quando clicar fora
screenHidden.addEventListener('click',function(e){
    if(e.target===screenHidden){
        screenHidden.classList.add('hidden');
        screenHidden.classList.remove('flex');
    }
})
//função para adicionar os valores no carrinho

function addToCart(name,price){
    const ExistingItem=cart.find(item=>item.name===name)
    if(ExistingItem){
    ExistingItem.quantity+=1
    
    } else{
        cart.push({
            name,
            price,
            quantity: 1,
        });
    }
    updateCartModal()
    updateCartCount()
    }
    //registro dos pedidos
let reg=document.getElementById('cart-items')
function updateCartModal(){
reg.innerHTML=''
let total=0

cart.forEach(item=>{
    const carItemsContainer=document.createElement('div')
    carItemsContainer.classList.add('mb-4')

    carItemsContainer.innerHTML=`
    <div class='flex items-center  justify-between'>
    <div>
    <p class='font-medium'>${item.name}</p>
    <p> Qtd:${item.quantity}</p>
    <p class='font-medium mt-2'>R$ ${item.price}</p>
    </div>
    <button class='remove-from-cart-btn ' data-name="${item.name}">
    Remover
    </button>
    </div>`  
    total+=item.price*item.quantity
    reg.appendChild(carItemsContainer)
    cartTot.textContent=total.toLocaleString('pt-BR',{
        style:'currency',
        currency:'BRL'
    })

    carItemsContainer.addEventListener('click',function(event){
        if(event.target.classList.contains('remove-from-cart-btn')){
            const name=event.target.getAttribute('data-name')
            
            removeItemCart(name)
        }
        })
})

} 
//função para remover o item do carrinho
function removeItemCart(name){
    const index=cart.findIndex(item =>item.name===name)
    if(index!==-1){
        const item=cart[index]
        if(item.quantity>1){
            item.quantity-=1 
        }else{
            cart.splice(index,1)
        }
        
        updateCartModal()
        updateCartCount()
    }
   }
   function updateCartCount(){
    const totalItems =cart.reduce((total,item)=>total+item.quantity,0)
    
    if(totalItems===0){
        numberCart.innerHTML=' '
    }else{
        numberCart.innerHTML=`(${totalItems })`
    }
   }
  adressInput.addEventListener('input',function(e){
    let inputValue=e.target.value

  })
 checkoutBtn.addEventListener