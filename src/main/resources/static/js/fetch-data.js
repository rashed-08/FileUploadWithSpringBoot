var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       var response = JSON.parse(xhttp.responseText);
       output = '';
       for(var i = 0; i < response.length; i++){
         output += `<li><label>${response[i].brand}</label></li>`

       }
       const list = document.getElementById('show');
       list.innerHTML += output;
       // MAKER INPUT

       const makerInput = document.getElementById('maker');

       // MODELS
       const dropModel = document.getElementById('models');

       // ON FOCUS INPUT SHOW
       function inputOnFocus(){
        document.querySelector('.wrap').classList.add('showList');
        makerInput.value = '';
       }

       makerInput.addEventListener('focus', function(){
        inputOnFocus();
       })

       makerInput.addEventListener('keyup', filterNames);

       function filterNames(){
         let filterValue = document.getElementById('maker').value.toUpperCase();
         let ul = document.getElementById('show');

         // get ITEMS
         let mi = ul.querySelectorAll('li');
        let li = ul.querySelectorAll('li label');
        // LOOP THROUGH COLLECTON ITEMS

        mi.forEach(item => {
          if(item.children[0].innerHTML.toUpperCase().indexOf(filterValue) > -1){
            item.style.display = '';
          }else {
            item.style.display = 'none';
          }
        })
       }
       
       
       const li = document.querySelectorAll('#show li');
      
      // SELECT MAKER
      
       li.forEach(label => {
         label.addEventListener('click', function(e){
          
          makerInput.value = label.textContent;
          
          disableModels();
          // GET MODELS OF CAR

          function runOver(){
            let auto = makerInput.value;
            let result = response.find(car => car.brand === auto);
            outputModel = '';
            for(let i = 0; i < result.models.length; i++){
              
              outputModel += `
              <li>
              <label class="m_li_item"><span class="m_li_item_text">${result.models[i]}</span>
                <input type="checkbox">
                <span class="checkmark"></span>
              </label>
            </li>`;
            }

            

            return outputModel;
          }
          
          runOver();
          
          const mode = document.getElementById('modelsList')
          mode.innerHTML = outputModel;
          
          // CHECK ALL




          dropModel.classList.add('active');
          /////////////
          // MODELS DIV ID 
          document.getElementById('modeling').classList.remove('showList');
          

         });
       });

       //Show subclass
       dropModel.addEventListener('click', function(e){
        function loadCheck(){
          let checkAll = document.querySelector('#check');

            checkAll.addEventListener('change', function(e){
              
              var isIt = checkAll.querySelector('label input').checked;
            
              if(isIt == true){
                checkAll.parentElement.querySelectorAll('.list li label input').forEach(item => {
                  item.checked = true;
                  })
              } else {
                checkAll.parentElement.querySelectorAll('.list li label input').forEach(item => {
                  item.checked = false;
                })
              }
            })
          

          checkAll.parentElement.querySelectorAll('.list li label input').forEach(item => {
              item.addEventListener('change', function(e){
                console.log('lalalalala')
                if(item.checked == false){
                  item.parentElement.parentElement.parentElement.parentElement.querySelector('input').checked = false;
                }
                })
              })
      
        }
        loadCheck();
        document.querySelector('#modeling').classList.toggle('showList');
        if(makerInput.value == ''){
          disableModels();
        } 
        
      })


      var create = document.querySelector('.create');

    }
};
xhttp.open("GET", "../json/car-info.json", true);
xhttp.send();

let checkAll = document.querySelectorAll('.check-all');

checkAll.forEach(item => {
  item.addEventListener('change', function(e){
    
    var isIt = item.querySelector('label input').checked;
  
    if(isIt == true){
      item.parentElement.querySelectorAll('.list li label input').forEach(item => {
        item.checked = true;
        })
    } else {
      item.parentElement.querySelectorAll('.list li label input').forEach(item => {
        item.checked = false;
      })
    }
  })
})

checkAll.forEach(item => {
  item.parentElement.querySelectorAll('.list li label input').forEach(item => {
    item.addEventListener('change', function(e){
      console.log('lalalalala')
      if(item.checked == false){
        item.parentElement.parentElement.parentElement.parentElement.querySelector('input').checked = false;
      }
      })
    })
})



 function disableModels(){
  document.querySelector('.models').classList.remove('active');
  document.querySelector('#modeling').classList.remove('showList');
  document.querySelector('.models span').textContent = 'Odaberite model';
 }


// MIN AND MAX VALUE

let maxValue = document.getElementById('maxValue');
maxValue.addEventListener('focus', function(){
  let minValue = document.getElementById('minValue').value;
  maxValue.min = minValue;
})

///////////////////////



// item.addEventListener('click', function(){
              
//   item.firstChild.classList.toggle('checked');
//   if(item.firstChild.classList.contains('checked')){
//     document.querySelector('#models span').textContent = '';
//     outputing += item.lastChild.textContent + ' ';
    
//   } 

//   document.querySelector('#models span').innerHTML = outputing;

document.addEventListener('click', (e) => {
  const list = document.getElementById('modelsList');
  const p = document.getElementById('models');
  const makerInput = document.getElementById('maker');
  const gas = document.getElementById('gorivo');
  const location = document.getElementById('lokacija');
  let checkAll = document.querySelector('.check-all')
  let years = document.getElementById('years').parentElement.parentElement;
  let subYears = document.getElementById('subYears').parentElement.parentElement;
  let targetElement = e.target;

  do {
    if (targetElement == list || targetElement == p || targetElement == makerInput || targetElement == location || targetElement == gas || targetElement == checkAll || targetElement == years || targetElement == subYears) {
        // This is a click inside. Do nothing, just return.
        
        return;
    }
    // Go up the DOM
    targetElement = targetElement.parentNode;
} while (targetElement);

  
   document.querySelector('#modeling').classList.remove('showList');
   document.querySelector('.wrap').classList.remove('showList');
   gas.lastElementChild.classList.remove('showList');
   location.lastElementChild.classList.remove('showList');
   years.querySelector('.allWrap').classList.remove('showList');
   subYears.querySelector('.allWrap').classList.remove('showList');

   if(makerInput.value == ''){
    disableModels();
  } 
 })



 const years = document.getElementById('years');
 function listYears(){
  let d = new Date();
  let nowYear = d.getUTCFullYear();
  for(nowYear;nowYear >= 1930; nowYear--){
    years.innerHTML += `<li class="year__item"><span>${nowYear} god.</span></li>`;
  }
}

listYears();


const subYears = document.getElementById('subYears');

function listSubYears(){
  let d = new Date();
  let nowYear = d.getUTCFullYear();
  for(nowYear;nowYear >= 1930; nowYear--){
    subYears.innerHTML += `<li class="year__item"><span>${nowYear} god.</span></li>`;
  }
}

listSubYears();

const toYears = document.querySelector('.godisteDo');

subYears.querySelectorAll('.year__item').forEach(yearsItem => {
  yearsItem.addEventListener('click', function(){
    toYears.textContent = yearsItem.textContent;
    yearsItem.parentElement.parentElement.classList.remove('showList')
  })
})

const fromYears = document.querySelector('.godisteOd');
years.querySelectorAll('.year__item').forEach(yearsItem => {
  yearsItem.addEventListener('click', function(){
    fromYears.textContent = yearsItem.textContent;
    yearsItem.parentElement.parentElement.classList.remove('showList')
  })
})





 