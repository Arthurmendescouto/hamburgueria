// abrir carrinho
let screenHidden=document.getElementById('Modal')
let btn_Screen=document.getElementById('button-cart')
let cart=[];
btn_Screen.addEventListener('click',function(){
    screenHidden.classList.remove('hidden');
        screenHidden.classList.add('flex');
        updateCartModal()

})
//levar pro carrinho
let addCart=document.querySelectorAll('.add-to-cart-btn')
let numberCart=document.getElementById('cart-count')
let cont=0
addCart.forEach(function (e){
e.addEventListener('click',function(event){
    
    let parentButton=event.target.closest('.add-to-cart-btn')
    if(parentButton){
        let name=parentButton.getAttribute('data-name')
        let price=parseFloat(parentButton.getAttribute('data-price'))
        addToCart(name,price)
    }
    cont++
    numberCart.innerHTML=`(${cont})`
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
    }
    //registro dos pedidos
let reg=document.getElementById('cart-items')
function updateCartModal(){
reg.innerHTML=''
let total=0

cart.forEach(item=>{
    const carItemsContainer=document.createElement('div')
    carItemsContainer.classList.add('flex','justify-between','mb-4','flex-col')

    carItemsContainer.innerHTML=` <div>
    <div class='flex items-center  justify-between' >
    <p class='font-medium'>${item.name}</p>
    <p>Qtd: ${item.quantity}</p>
    <p>${item.price}</p>
    </div>

    <div>
    <button class='remove-from-cart-btn ' data-name="${item.name}">
    Remover
    </button>
    </div> 
    </div>`  
    total+=item.price*item.quantity
    reg.appendChild(carItemsContainer)


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
            updateCartModal()
            return
        }
        cart.splice(index,1)
        updateCartModal()
    }
   }
  
 