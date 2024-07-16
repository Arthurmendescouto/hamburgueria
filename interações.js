// abrir carrinho
let screenHidden=document.getElementById('Modal')
let btn_Screen=document.getElementById('button-cart')
let cartTot=document.getElementById('cart-total')
let adressInput=document.getElementById('adress')
let checkoutBtn=document.getElementById('finish')
let adressworn=document.querySelector('#conceal')
const IsOpen=checkoutBtnRestaurantOpen()

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

   //enviar endereço
  adressInput.addEventListener('input',function(e){
    let inputValue=e.target.value
    if(adressInput.value !=''){
        adressworn.classList.add('hidden')
        adressInput.classList.remove('border-red-600')
    }
        
  })
  //finalizar pedido
 checkoutBtn.addEventListener('click',function(){
    if(!IsOpen){
        Toastify({
            text: "O restaurante está fechado",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "#ef4444",
            },
    }).showToast()
    return}
    if(cart.length===0) return
    if(adressInput.value===''){
        adressworn.classList.remove('hidden')
        adressInput.classList.add('border-red-600')
        return
    }
    //enviar api whats
    const cartItems=cart.map((item)=>{
        return (
            `${item.name} Quantidade: ${item.quantity} Preço: R$${item.price}`
        )

    }).join("\n")
    const message=encodeURIComponent(`${cartItems}\nEndereço: ${adressInput.value}`)
    const phone='7382314739'
    window.open(`https://wa.me/${phone}?text=${message}`,"_blank")
    cart=[]
    updateCartModal()
 })
 function checkoutBtnRestaurantOpen(){
    const data=new Date()
    const hora=data.getHours()
    return hora>=18 && hora<22
 }
 const spanItem=document.getElementById('date-span')
//const corrigir isopen
if(IsOpen){
    spanItem.classList.remove('bg-red-500')
    spanItem.classList.add('bg-green-600')
}else{
    spanItem.classList.add('bg-red-500')
    spanItem.classList.remove('bg-green-600')
}