///////////////////////
// LOKACIJA CHECKING.....

  let searching = document.querySelectorAll('.allDrops');

searching.forEach(item => {
  item.addEventListener('click',dropDownEndToggle);
});

function dropDownEndToggle(){
  let subItem = this.nextElementSibling;
  ////////////  
  // COLAPSING DIV
  subItem.classList.toggle('showList');

}


  let checkLocations = document.querySelector('.check-all-location label input');

  checkLocations.addEventListener('change', selectAll);
  
  function selectAll(){
    let checkLocations = document.querySelector('.check-all-location label input');
    let checkboxes = checkLocations.parentElement.parentElement.parentElement.querySelectorAll('ul li label input');
  
    if(checkLocations.checked){
      checkboxes.forEach(item => {
        item.checked = true;
      })
    } else {
      checkboxes.forEach(item => {
        item.checked = false;
      })
    }
  }
  
  let checkSubHead = document.querySelectorAll('.check-subList');
  let checkSubList = document.querySelectorAll('.subList');
  
  checkSubHead.forEach(sub => {
    sub.addEventListener('change', checkSub);
  })
  
  function checkSub(){
    if(this.checked){
      this.parentElement.parentElement.nextElementSibling.
      querySelectorAll('li label input').forEach(item => {
        item.checked = true;
      });
    }else {
      this.parentElement.parentElement.nextElementSibling.
      querySelectorAll('li label input').forEach(item => {
        item.checked = false;
      });
      checkLocations.checked = false;
    }
  }
  
  checkSubList.forEach(list => {
    list.querySelectorAll('li label input').forEach(li => {
      li.addEventListener('change', function(){
        let checkLocations = document.querySelector('.check-all-location label input');
        let checkSubHead = document.querySelectorAll('.check-subList');
  
        if(li.checked == false){
          checkLocations.checked = false;
        } else {
          checkLocations.checked = true;
        }
      })
    })
  })



