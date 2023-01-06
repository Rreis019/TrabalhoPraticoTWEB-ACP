/* Como usar
    <ui-modal for="openModal">
        <button type="exit">x</button>
        <p>ola</p>
    </ui-modal>

    <button id="openModal">Abrir modal</button>
*/
class Modal extends HTMLElement
{

    constructor(){
        super();
    }


    /*
        O método estático "observerAttributes" retorna um array contendo os nomes dos atributos que devem ser observados pelo elemento modal.
        Isso significa que se o valor de um desses atributos for alterado, o método "attributeChangedCallback" será chamado.
    */
    static get observerAttributes(){
        return ["for"];
    }

    /*
        É um getter torna mais facil de obter atributo for
        ex: this.for
    */
    get for(){return this.getAttribute("for");}

    get content(){return this.querySelector(".modal-content");}

    //Quando o valor do atributo "for" muda, o método "attributeChangedCallback" é chamado e o método "render" é chamado para atualizar o conteúdo do modal.
    attributeChangedCallback(prop,oldVal,newVal)
    {
        if(prop == "for"){this.render()}
    }

    //Quando o elemento é adicionado ao DOM, o método "connectedCallback" é chamado
    connectedCallback(){
        this.render();

        let btnOpenModal = document.getElementById(this.for);

        console.log(this.for);
        btnOpenModal.addEventListener("click", () => {
            this.classList.add("active");
            document.body.style.overflow = 'hidden';
        });

        var btnCloseModal = this.querySelector("[type='exit']");
        if(btnCloseModal != undefined){
                btnCloseModal.addEventListener("click", () => {
                    this.classList.remove("active");
                document.body.style.overflow = 'auto';
            });
        }
        
        this.addEventListener("click", (event) => {
            if(event.target == this){
                this.classList.remove("active");
                document.body.style.overflow = 'auto';
            }
        });

    }

    //O método "render" substitui o conteúdo interno do elemento modal por uma div com a classe "modal-content" e o conteúdo original do elemento.
    render(){
        this.innerHTML = `<div class="modal-content">` + this.innerHTML + "</div>";
    }
}

customElements.define("ui-modal",Modal);



/*
    Estas regras de css são inseridas no início da tag head do documento 
    As regras definem a aparência de um elemento modal 
*/ 
document.head.insertAdjacentHTML("afterbegin", `
<style>
ui-modal{display: none;}
ui-modal.active{
    position: fixed;
    top: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    z-index:1000;
}

ui-modal button[type="exit"]
{
    border: none;
    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgb(235, 95, 95);
    color: white;
    border-radius: 50%;
    position: absolute;
    right: -11px;
    top:   -16px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    z-index:4444;
} 

ui-modal button[type="exit"]:hover{
    background-color: rgb(209, 94, 94);
}



.modal-content{
    box-sizing: border-box;
    position: relative;
 
    min-height: 300px;
    width:auto;
    height:auto;
    background-color: white;
    z-index: 999;
    border: 2px solid black;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: clamp(5px,2vw,40px)

}

@media screen and(max-width:768px) {
    .body{
    
    }
}

<style/>
`);
