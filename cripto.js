const criptomonedasSelect = document.querySelector('#criptomonedas');
const monedaSelect = document.querySelector('#moneda');
const formulario = document.querySelector('#formulario');
const resultado2 = document.querySelector('#formulario');

const objBusqueda = {
    moneda: '',
    criptomoneda: ''
}
//crear promise

const obtenerCriptomonedas = criptomonedas => new Promise( resolve => {
    resolve(criptomonedas);
})



document.addEventListener('DOMContentLoaded' , () => {
    consultarCriptomonedas();

    formulario.addEventListener('submit', submitFormulario);

    criptomonedasSelect.addEventListener('change', leerValor);
    monedaSelect.addEventListener('change', leerValor);
})

function consultarCriptomonedas () {
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
    fetch(url)
     .then( respuesta => respuesta.json() )
     .then (resultado2 => obtenerCriptomonedas(resultado2.Data))
     .then(criptomonedas => selectCriptomonedas(criptomonedas))
}

function selectCriptomonedas(criptomonedas){
    criptomonedas.forEach( cripto => {
        const { FullName, Name} = cripto.CoinInfo;

        const option = document.createElement('option');
        option.value = Name;
        option.textContent = FullName;
        criptomonedasSelect.appendChild(option);
    });
}

function leerValor(e) {
    objBusqueda[e.target.name] = e.target.value;
    
}

function submitFormulario(e){
    e.preventDefault();

    //validar
    const {moneda , criptomoneda} = objBusqueda;

    if (moneda ==='' || criptomoneda === '') {
        mostrarAlerta('Ambos campos son obligatorios')
        return;
    }

    //consultar la api con los resultados
    consultarAPI();

}

function mostrarAlerta(msg) {

    const existeError = document.querySelector('.error');

    if(!existeError){
        const divMensaje = document.createElement('div');
    divMensaje.classList.add('error');
    divMensaje.textContent = msg;

    formulario.appendChild(divMensaje);

    setTimeout(() => {
       divMensaje.remove();
    }, 3000);
    }
  
}

function consultarAPI() {
     const { moneda, criptomoneda } = objBusqueda;

     const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}` ;
     
     fetch(url)
        .then ( respuesta => respuesta.json() )
        .then ( cotizacion => {
            mostrarCotizacionHTML(cotizacion.DISPLAY[criptomoneda][moneda]);

        })
}

function mostrarCotizacionHTML(cotizacion) {

   

    const { PRICE , HIGHDAY, LOWDAY, CHANGEPCT24HOUR,LASTUPDATE} = cotizacion;
    const precio = document.createElement('p');
    precio.classList.add('precio');
    precio.innerHTML = `el precio es: <span> ${PRICE} </span>`

    const precioAlto = document.createElement('p');
    precioAlto.innerHTML = `el precio mas alto del dia es es: <span> ${HIGHDAY} </span>`
    
    const precioBajo = document.createElement('p');
    precioBajo.innerHTML = `el precio mas bajo del dia es es: <span> ${LOWDAY} </span>`
    
    const ultimasHoras = document.createElement('p');
    precioBajo.innerHTML = `La variacion en las ultimas horas: <span> ${CHANGEPCT24HOUR} % </span>`

    const ultimaActualizacion = document.createElement('p');
    ultimaActualizacion.innerHTML = `ultima actualizacion: <span> ${LASTUPDATE} </span>`

    resultado2.appendChild(precio);
    resultado2.appendChild(precioAlto);
    resultado2.appendChild(precioBajo);
    resultado2.appendChild(ultimasHoras);
    resultado2.appendChild(ultimaActualizacion);
}

function limpiarHTML() {
    while(resultado2.firstChild) {
        resultado2.removeChild(resultado2.firstChild);
    }
}