document.querySelectorAll('.choose__input__single').forEach(wrap => {
  wrap.addEventListener('click', function(e){
    wrap.parentElement.lastElementChild.classList.toggle('showList');
    wrap.parentElement.querySelectorAll('ul li').forEach(li => {
      li.addEventListener('click', function(){
        wrap.firstChild.innerHTML = li.textContent;
        console.log(wrap.lastElementChild)
        wrap.lastElementChild.innerHTML = `<svg>
        <use xlink:href="../img/sprite.svg#icon-x"></use>
      </svg>`
      wrap.lastElementChild.classList.add('svg');
        wrap.parentElement.lastElementChild.classList.remove('showList');
      })
    })
  })
});

document.addEventListener('click', function(e){
  document.querySelectorAll('.choose__input__single').forEach(wrap => {
    if(e.target == wrap || e.target == wrap.firstChild || e.target == wrap.lastElementChild)return;
    else {
      wrap.parentElement.lastElementChild.classList.remove('showList');
    }
  })
  
})

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var output = '';

      for(var i = 0; i < response.length; i++){
        output += `<li class="dropList__item">${response[i].brand}</li>`
      }
      // SELECT WHERE TO PUT BRAND

      var brand = document.querySelector('.odaberiteMarku');
      brand.innerHTML = output;
      // CHOOSE MODEL BASED ON BRAND

      var models = document.querySelectorAll('.odaberiteMarku li');
      models.forEach(model=> {
        model.addEventListener('click', function(e){
          e.preventDefault();
          var outputModel = '';
          function runOver(){
            let auto = model.textContent;
            
            let result = response.find(car => car.brand === auto);
            console.log(result.models);
            for(let i = 0; i < result.models.length; i++){
              outputModel +=  `<li class="dropList__item">${result.models[i]}</li>`;
            }
            
            return outputModel;
          }
          runOver();
          const whereToStore = document.querySelector('.odaberiteModel');
  
          whereToStore.innerHTML = outputModel;
        })
      })

    }
};
xhttp.open("GET", "../json/car-info.json", true);
xhttp.send();

var yearList = document.querySelector('.yearList');
var outputYears = '';
var theMonths = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
var today = new Date();
var year = today.getUTCFullYear();
var aMonth = today.getMonth();
var i;
for (i=0; i<12; i++) {
outputYears += `<li class="dropList__item">${theMonths[aMonth]} ${year}</li>`;
aMonth++;
if (aMonth > 11) {
aMonth = 0;
year++;
}
}

yearList.innerHTML = outputYears;
