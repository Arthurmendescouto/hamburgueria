let screenHidden=document.getElementById('screenHidden')
let btn_Screen=document.getElementById('button-cart')

btn_Screen.addEventListener('click',function(){
    screenHidden.classList.remove('hidden');
    screenHidden.classList.add('flex');
})