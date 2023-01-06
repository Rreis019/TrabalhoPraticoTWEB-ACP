//multistepper 
/*  exemplo do que deve colocar no html para usar
    <multistepper id="teste">
        <breadcumbs></breadcumbs>

        <tab class="active">...</tab>
        <tab>...</tab>

        <button type="next">Avançar</button>
        <button type="back">Recuar</button>
    </multistepper>
*/
class Multistepper
{
    constructor(multistepperId){
        this.stepper = document.getElementById(multistepperId);
        this.breadCumbs = this.stepper.querySelector("breadcumbs");
        console.log(this.breadCumbs);
        this.nextBtn = this.stepper.querySelector("button[type=next]");
        this.backBtn = this.stepper.querySelector("button[type=back]");
        this.backBtn.style.display = "none";
        this.tabs = this.stepper.querySelectorAll("tab");
        this.nextBtn.addEventListener("click",() => { this.nextStep(this); });
        this.backBtn.addEventListener("click",() => { this.backStep(this); });
        this.id = multistepperId;
        this.currentTab = 0;
        this.tabCount = 0;
        this.tabFunc = [];
    }

    //func -> function must return true or false
    addStep(name,func = null) {
        let step = document.createElement("span"); step.innerHTML = name;
        this.breadCumbs.appendChild(step);
        this.tabFunc.push(func);
        this.tabCount++;

        this.breadCumbs.childNodes[0].classList.add("active");
    }

    nextStep(this_){
        if(this_.currentTab < this_.tabCount-1){
            if(this_.tabFunc[this_.currentTab]()) //if function return true go to next tab
            {
                this_.currentTab++;
                this_.breadCumbs.childNodes[this_.currentTab].classList.add("active");
                this_.breadCumbs.childNodes[this_.currentTab-1].classList.remove("active");
                this_.tabs[this_.currentTab].classList.add("active"); //show next tab
                this_.tabs[this_.currentTab-1].classList.remove("active"); //hide current tab
                this_.backBtn.style.display = "block"; //show back button
            }
        }
    }

    backStep(this_){
        if(this_.currentTab > 0){
            this_.currentTab--;
            this_.breadCumbs.childNodes[this_.currentTab].classList.add("active");
            this_.breadCumbs.childNodes[this_.currentTab+1].classList.remove("active");
            this_.tabs[this_.currentTab+1].classList.remove("active"); //hide current tab
            this_.tabs[this_.currentTab].classList.add("active"); //show next tab
            if(this_.currentTab == 0){this_.backBtn.style.display = "none";}
        }
    }
}

///////////////////////////////////

var finalPrice = 0;
var vehicle = 
{
    brand:"",
    model:"",
    price:0,
    km:0,
    licenseYear:0
};

const LOWEST_PRICE = 500;
function callVehiclePrice(acquisitionPrice, yearMatricula, km) {
    const currentYear = 2022
    const years = currentYear - yearMatricula;
    let ageDiscount = 0;
  
    if (years > 10) {
      ageDiscount = 10 * 0.05;
      ageDiscount += (years - 10) * 0.04;
    } else {
      ageDiscount = years * 0.05;
    }
  
    let mileageDiscount = 0;
    if (km > 70000) {mileageDiscount = 0.9;
    } else if (km > 30000) {mileageDiscount = 0.95;
    } else {mileageDiscount = 1;}
  
    const finalPrice = acquisitionPrice * (1 - (ageDiscount)) * mileageDiscount;
    if (finalPrice < LOWEST_PRICE) {
      return LOWEST_PRICE;
    }
  
    return finalPrice;
}
  
function selectCard(selectedCard)
{
    var cards = document.querySelectorAll("tab .card");
    for (let index = 0; index < cards.length; index++) {
        cards[index].classList.remove("active");
    }
    
    selectedCard.classList.add("active");
    
    var priceStr = selectedCard.querySelector(".price").innerHTML;
    
    finalPrice = priceStr.match("[0-9]+")[0];
}

////////////////////////////////////
var vendaCarroForm = 0;
function sellCarFirstTab()
{

    var sliderKm = document.querySelector("#slider-km");
    var sliderPrice = document.querySelector("#slider-price");
    var marca = document.querySelector("#inputMarca");
    var modelo = document.querySelector("#inputModelo");
    var inputDate = document.querySelector("input[type='date']");
    var erro = document.querySelector("#sellVehicle-erro");
    
    if(marca.value.length == 0){
        erro.style.display = "block";
        erro.innerHTML = "O campo Marca esta vazio";
        return false;
    }
    if(modelo.value.length == 0){
        erro.style.display = "block";
        erro.innerHTML = "O campo Modelo esta vazio";
        return false;
    }

    if(sliderPrice.value == 0)
    {
        erro.style.display = "block";
        erro.innerHTML = "Preço invalido";
        console.log("preco invalido");
        return false;
    }

    if(inputDate.value.length == 0){
        erro.style.display = "block";
        erro.innerHTML = "Selecione a data da matricula";
        return false;
    }

    
    const regex = new RegExp('[0-9]{4}');
    var currentYear = new Date().getFullYear();
    var year = inputDate.value.match(regex);
    
    if(year > currentYear){
        erro.style.display = "block";
        erro.innerHTML = "Data matricula invalida";
        return false;
    }
    
    vehicle = {
        brand: marca.value,
        model: modelo.value,
        price: sliderPrice.value,
        km:sliderKm.value,
        licenseYear:year
    };


    erro.style.display = "none";
    finalPrice = callVehiclePrice(sliderPrice.value,year,vehicle.km);
    
    //update cards
    var cards = document.querySelectorAll("tab .card");

    for (let index = 0; index < cards.length; index++) {
        var info = cards[index].querySelectorAll(".info div")[1];
        var spans = info.querySelectorAll("span");
        spans[0].innerHTML = vehicle.brand;
        spans[1].innerHTML = vehicle.model;
        spans[2].innerHTML = vehicle.licenseYear;
        spans[3].innerHTML = vehicle.km + " Km";
    }

    var prices = document.querySelectorAll("tab .card .price");
    prices[0].innerHTML = Math.round(finalPrice * 0.6) + "€";
    prices[1].innerHTML = Math.round(finalPrice) + "€";
    prices[2].innerHTML = Math.round(finalPrice * 1.1) + "€";

    return true;
}

function sellCarSecondTab()
{
  //verfica se ja selecionou algum card
  var form =  document.getElementById("carroForm");
  var activeCard = form.querySelectorAll("tab .card.active");
  var erro = document.querySelector("#sellVehicle-erro");      
  if(activeCard.length == 0){
      erro.style.display = "block";
      erro.innerHTML = "Selecione uma das cartas";
      return false;
  }
  
  erro.style.display = "none";
  document.querySelector("#final-price").innerHTML = "O preço final sera " + finalPrice + "$";
  return true;
}


////////////////////////////////////////

function financingCarSecondTab()
{
    var form =  document.getElementById("finaciamentoForm");
    var activeCard = form.querySelectorAll("tab .card.active");
    var erro = document.querySelector("#sellVehicle-erro");      
    if(activeCard.length == 0){
        erro.style.display = "block";
        erro.innerHTML = "Selecione uma das cartas";
        return false;
    }
    
    erro.style.display = "none";
    document.querySelector("#final-financing-price").innerHTML = "O preço final sera " + finalPrice + "$";
    return true;
}


function generateSpreads() {
    const spreads = [];
    for (let i = 0; i < 3; i++) {
      spreads.push(Math.floor(Math.random() * 5) + 1);
    }
    return spreads;
}

function calcMonthlyInstallment(loanValue,months,totalInterest)
{
    return  parseFloat(loanValue) * (Math.pow(1 + parseFloat(totalInterest), parseFloat(months)) * parseFloat(totalInterest) / (Math.pow(1 + parseFloat(totalInterest), parseFloat(months)) - 1));
}
  
function financingCarFirstTab()
{
    var form = {
        this_ : document.getElementById("finaciamentoForm"),
        inputTotalAmount : document.getElementById("slider-totalAmount"),
        inputInitialEntry : document.getElementById("slider-initialEntry"),
        inputYears :  document.getElementById("slider-years"),
        error : document.getElementById("financing-erro")
    };

    if(form.inputYears.value <= 0){
        form.error.style.display = "block";
        form.error.innerHTML = "Prazo invalido";
        return false;
    }

    if(form.inputTotalAmount.value <= 0){
        form.error.style.display = "block";
        form.error.innerHTML = "O montante total não pode ser 0";
        console.log("batata");
        return false;
    }


    if(parseInt(form.inputInitialEntry.value) > parseInt(form.inputTotalAmount.value)){
        form.error.style.display = "block";
        form.error.innerHTML = "O montante total não pode ser menor que valor de entrada incial";
        return false;
    }

    form.error.style.display = "none";

    var loanValue = parseInt(form.inputTotalAmount.value) - parseInt(form.inputInitialEntry.value);
    var months = form.inputYears.value * 12;
    var spreads = generateSpreads();
    
    var cards = form.this_.querySelectorAll("tab .card");
    var prices = form.this_.querySelectorAll("tab .card .price");
    for (let index = 0; index < spreads.length; index++) {
        var totalInterest = 5 + spreads[index];
        var monthlyInstallment = calcMonthlyInstallment(loanValue,months,totalInterest/100);

        var info = cards[index].querySelectorAll(".info div")[1];
        var spans = info.querySelectorAll("span");
        spans[0].innerHTML = form.inputTotalAmount.value + "$";
        spans[1].innerHTML = loanValue + "$";
        spans[2].innerHTML = months;
        spans[3].innerHTML = totalInterest + "%";
        spans[4].innerHTML = spreads[index] + "%";
        spans[5].innerHTML = form.inputInitialEntry.value + "$";

        console.log(monthlyInstallment);
        prices[index].innerHTML =  Math.round(monthlyInstallment) + "$";
    }

    

    return true;
}


window.addEventListener("DOMContentLoaded",() => {
    vendaCarroForm = new Multistepper("carroForm");
    vendaCarroForm.addStep("1. Automovel",sellCarFirstTab);
    vendaCarroForm.addStep("2. Estado",sellCarSecondTab);
    vendaCarroForm.addStep("3. Resultado");

    var finaciamentoCarroForm = new Multistepper("finaciamentoForm");
    finaciamentoCarroForm.addStep("1. Compra",financingCarFirstTab);
    finaciamentoCarroForm.addStep("2. Possiveis Cenarios",financingCarSecondTab);
    finaciamentoCarroForm.addStep("3. Resultado");


});
