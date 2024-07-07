//carrinho
let screenHidden=document.getElementById('Modal')
let btn_Screen=document.getElementById('button-cart')
let cart=[];
btn_Screen.addEventListener('click',function(){
    screenHidden.classList.remove('hidden');
        screenHidden.classList.add('flex');
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
    return
    }  
        cart.push({
            name,
            price,
            quantity: 1,
        });
        
    }

