const hamburguer = document.querySelector('.hamburguer');
const menu = document.querySelector('.menu');

hamburguer.addEventListener('click', function(){

    hamburguer.classList.toggle('active')
    menu.classList.toggle('active')
})


Toastify({

  text: "This is a toast",
  
  duration: 3000
  
  }).showToast();







