
document.addEventListener('DOMContentLoaded', function(){
  // var aboutModel = document.querySelector('#about-model');
  // var ad = document.querySelector('#ad');
  // aboutModel.addEventListener('click', function(e){
  //   document.querySelector('.description').style.display = 'none';
  //   document.querySelector('.about__model').style.display = 'block';
  //   aboutModel.parentElement.classList.add('bg-dark');
  //   ad.parentElement.classList.remove('bg-dark');
  //   e.preventDefault();
  // });
  
  // ad.addEventListener('click', function(e){
  //   document.querySelector('.description').style.display = 'block';
  //   document.querySelector('.about__model').style.display = 'none';
  //   aboutModel.parentElement.classList.remove('bg-dark');
  //   ad.parentElement.classList.add('bg-dark');
  //   e.preventDefault();
  // });
  
  
  ////////////
  // Show side bar nav
  const sideLink = document.querySelectorAll('.sidebar__link');
  
  sideLink.forEach((link, index) => {
    link.addEventListener('click', function(e){
      const sideList = document.querySelectorAll('.sub__list');
      sideList[index].classList.toggle('show');
      link.childNodes[1].classList.toggle('rotate');
  
  
      e.preventDefault();
    })
  
  })
})
//OGLASI

