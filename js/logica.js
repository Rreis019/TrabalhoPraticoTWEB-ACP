function openSearch(btnSearch){
    var btnClose = document.getElementsByClassName("btn-close")[0];
    var separate = document.getElementById("separate");
    var inputSearch = document.getElementById("input-search");

    if(btnClose.style.display == '' || btnClose.style.display == 'none'){
        separate.style.display = "block";
        btnClose.style.display = "block";
        btnSearch.style.color = "red";
        inputSearch.style.display = "block";
    }else{
        //faz a pesquisa
        

    }
}

function closeSearch(btnClose)
{
    console.log("dada");
    var btnSearch = document.getElementsByClassName("btn-search")[0];
    var separate = document.getElementById("separate");
    var inputSearch = document.getElementById("input-search");

    if(btnClose.style.display != '' || btnClose.style.display != 'none'){
        separate.style.display = "";
        btnClose.style.display = "";
        btnSearch.style.color = "black";
        inputSearch.style.display = "none";
    }
}


function scrollUp(x,y){
    window.scrollTo({
        top: 0,
        left: 0,
        behavior : "smooth"})
}

/*
var subHeaderRectY = 0;
document.addEventListener("DOMContentLoaded", function(event) { 
    subHeaderRectY = document.getElementsByClassName("subheader")[0].getBoundingClientRect().y;
});
*/

window.addEventListener('scroll',() => {
    var subheaderRect = document.getElementById("subheader").getBoundingClientRect();
    var header = document.getElementsByTagName("header")[0];

    //quando dou scroll para baixo fica so subheader aparecer e com position sticky
    if(window.innerWidth > 970)
    {
        if(window.pageYOffset <= 151){ 
            header.classList.remove('header-scroll');
        }
        else if(subheaderRect.top <= 0)
        {
            header.classList.add('header-scroll');
        }

        var backtop = document.getElementsByClassName("backtotop")[0];
        if(window.pageYOffset < 291){
            backtop.classList.add('backtotop-hidden');
        }
        else{
            backtop.classList.remove('backtotop-hidden');
        }
    } 

});


function toggleMobileMenu(ActiveCheckbox,OtherCheckbox)
{
    document.getElementById(ActiveCheckbox).checked = !document.getElementById(ActiveCheckbox).checked;
    var other = document.getElementById(OtherCheckbox);
    if(other.checked){
        other.checked = false;
    }
}


function toggleHideMenu()
{
   /* Removing the active class from all the li elements in the navbar. */
    var navbar = this.closest(".outer-navbar");
    var li = navbar.children;
    for (let i = 0; i < li.length; i++) {
        li[i].classList.remove('active');
    }

    /* Adding the class `active` to the parent node of the element that triggered the event. */
    this.parentNode.classList.add('active');
}


function showSubMenu(hyperLink,id)
{
    var navbarLinks = document.querySelectorAll("#subheader-navbar a");
    for (let index = 0; index < navbarLinks.length; index++) {
        navbarLinks[index].classList.remove("active");
    }

       /* Hiding all the submenus. */
       var subMenus = document.querySelectorAll(".outer");
       for (let index = 0; index < subMenus.length; index++) {
          subMenus[index].style = " transform: scale(1,0);";
       }



    hyperLink.classList.add("active");
    document.querySelector(id).style = " transform: scale(1,1);";
}

function hideSubMenus()
{
    /* Removing the active class from all the hyperlinks in the subheader. */
    var navbarLinks = document.querySelectorAll("#subheader-navbar a");
    for (let index = 0; index < navbarLinks.length; index++) {
        navbarLinks[index].classList.remove("active");
    }

    /* Hiding all the submenus. */
    var subMenus = document.querySelectorAll(".outer");
    for (let index = 0; index < subMenus.length; index++) {
       subMenus[index].style = " transform: scale(1,0);";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    //adiciona hover active para todas li do primeiro ul
    var navbars = document.querySelectorAll(".outer-navbar");
    for (let index = 0; index < navbars.length; index++) {
        var li = navbars[index].children;
        for (let i = 0; i < li.length; i++) {
            if(li[i].classList.contains("unused")){continue;}
            var hyperlink = li[i].getElementsByTagName("a")[0];
            //console.log(hyperlink);
        
            hyperlink.addEventListener("mouseenter",toggleHideMenu);
        }  
    }
});

function updateSlider(slider) {
    var labelId = slider.getAttribute("for");
    document.getElementById(labelId).value = slider.value;
}

