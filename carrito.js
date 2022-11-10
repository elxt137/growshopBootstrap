//Variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-producto');
let articulosCarrito = [];



cargarEventListeners();
function cargarEventListeners() {
    //agregar curso cuando presiono agregar carrito
    listaProductos.addEventListener('click', agregarProducto);

    //elimina curso carrit
    carrito.addEventListener('click' , eliminarCurso)  
}

//vaciar el carri

vaciarCarritoBtn.addEventListener('click', ()=> {
    articulosCarrito = []; //reset carrito

        limpiarHTML();
})

//funciones

function agregarProducto(e){
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')){

        const productoSeleccionado = e.target.parentElement.parentElement;
        
        

        leerDatosProducto(productoSeleccionado);

    }
    
}

//elimina curso del carrito
function eliminarCurso(e) {
    
        if(e.target.classList.contains('borrar-producto')){
            const productId=e.target.getAttribute('data-id')

            //elimina del arreglo articuloscarrito por data id
            articulosCarrito = articulosCarrito.filter(producto => producto.id !== productId);
       
            carritoHTML();
        }

}

// lee el contenido del html al que le dimos click y extrae info

function leerDatosProducto(producto){
    
    
    //crear un objeto con el contenido
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('p').textContent,
        
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad : 1 
        

    }
    //revisa si un elemento si ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
        if(existe){
            //actualizamos cantidad
            const productos2 = articulosCarrito.map( producto => {
                if(producto.id === infoProducto.id){
                    producto.cantidad++;
                    return producto; //retorna el obj  actualizado

                } else {
                    return producto; //retorna obj q no son duplicados
                }
            });
            articulosCarrito = [...productos2];

        } else {
            //agregamos el curso al carrito
            articulosCarrito = [...articulosCarrito, infoProducto];
        }

    //agrega elementos al carrit
    //articulosCarrito = [...articulosCarrito, infoProducto];
    
    console.log(articulosCarrito);

    carritoHTML();
}

//muestra el carrito de compras en el html

function carritoHTML (){
    //limpiar el html
    limpiarHTML();

    

    articulosCarrito.forEach( producto => {

        const {imagen, titulo, precio, cantidad , id} = producto;
        const row = document.createElement("tr");
        row.innerHTML = `
                
                <td>
                    <img src="${imagen}" width="100">
                </td> 
                <div class=".formatoCarrito">
                <td> ${titulo} </td>
                <td>${ precio} </td> 
                <td>${ cantidad}</td> 
                

                <td>

                    <a href="#" class="borrar-producto" data-id="${id}" > x </a>
                </td>
                </div>
                
                `;
                


        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
       
        
    });



}

function limpiarHTML(){
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
    //activar permiso de las notificaciones-

const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click' , () => {
    Notification
        .requestPermission()
        .then(resultado => {
            console.log('El resultado es ' , resultado)
        })
});

    //imprimo una notificacion

const verNotificacion = document.querySelector('#verNotificacion');
verNotificacion.addEventListener('click' , () => {
    if(Notification.permission ==='granted') {
        const notificacion = new Notification('Esta es la notificacion', {
            icon: '/img/WhatsApp Image 2022-08-03 at 7.18.06 PM.jpeg'
        }
        );

        notificacion.onclick = function() {
                window.open('./ubicacion.html')
        }
    }
}
);





