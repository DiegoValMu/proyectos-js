const carrito = document.querySelector("#carrito");
const contenedorCesta = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector("#vaciar-carrito");
const listaProductos = document.querySelector("#lista-productos");

let cesta = [];
let total = 0;
let totalDsct = [];
calcularDsct();

console.log(cesta);

cargarEventsListeners();
function cargarEventsListeners() {
    listaProductos.addEventListener("click", agregarProductos);

    carrito.addEventListener("click", eliminarProducto);   

    
    btnVaciarCarrito.addEventListener("click", () => {
        cesta = [];
        limpiarHTML();
        totalEn0();
    });    
        
        //calcularTotal(total);

}




   

    


    if(carrito.querySelector('.precio-total-sd span').textContent == "" || cesta.lenght < 1 ){
      totalEn0();
       
    }

function totalEn0(){
    carrito.querySelector('.precio-total-sd span').textContent = "$"+0;
    carrito.querySelector('.precio-total-cd span').textContent = "$"+0;
}


function calcularTotal(e){
   
    let valor = e.querySelector('.precio').textContent;
    valor = valor.split('$');
    const valorSd = parseInt(valor[1]);
    console.log(valorSd);

    total = total + valorSd;

    return total;

    
    
}

function calcularDsct(){
    let valor = document.querySelectorAll('.precio');
    let valor3 = document.querySelectorAll('.precio span');

    for(i=0,j=valor.length; i<j; i++){

        totalDsct = valor[i].textContent.split('$');
        valor3[i].textContent = "$"+totalDsct[1]*0.50; 
        
      

        //document.querySelector('.precio span').textContent = totalDsct[1];
                console.log(totalDsct[1]*0.50);
        
    }



     
   
    //const valorSd = parseInt(valor[1]);

    
 

}

function agregarProductos(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const productoSeleccionados = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionados);
        
        const total2 = calcularTotal (productoSeleccionados);
        carrito.querySelector('.precio-total-sd span').textContent = "$"+total2;
        carrito.querySelector('.precio-total-cd span').textContent = "$"+total2*0.50;
        
    }
   
    
}


function eliminarProducto(e){
    const totalTo = carrito.children[2].textContent;
    const totalF = totalTo.split('$');
  
    let totalCd = totalF[1];
    totalCd = parseInt(totalCd);

    if(e.target.classList.contains('borrar-curso')){
        const idproducto = e.target.getAttribute('data-id')
        const productos = cesta.find(producto => producto.id === idproducto)
        //console.log(productos);
        const valor = productos.precio.split('$');

            //disminuye la cantidad en 1 por cada vez que se presiona
            const valorNuevo = parseInt(valor[1]);
       
            total = total - valorNuevo*2;
            console.log(total);
        //si existe mas de uhn producto en la cesta
        if(productos.cantidad>1){
            //disminuye la cantidad en 1 por cada vez que se presiona
            productos.cantidad--;
            carrito.querySelector('.precio-total-sd span').textContent = "$"+total;
            carrito.querySelector('.precio-total-cd span').textContent = "$"+total*0.50;
            
            carritoHTML();
        }else{
            //eliminar producto por el data-id
            cesta = cesta.filter(producto => producto.id !== idproducto);
            carrito.querySelector('.precio-total-sd span').textContent = "$"+total;
            carrito.querySelector('.precio-total-cd span').textContent = "$"+total*0.50;
            carritoHTML();
       }
        
    }
}


function leerDatosProducto(producto) {
    //console.log(producto);
    //crear objeto con datos del producto
    const infoProductos ={
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

 
    
    const existe = cesta.some(producto => producto.id === infoProductos.id);
    if (existe){
        const productos = cesta.map(producto =>{
           if(producto.id === infoProductos.id){
                producto.cantidad++;
                return producto;
           } else{
                return producto;
           }
        });
        cesta = [...cesta];
    }else{
        //console.log(infoProductos);
        cesta = [...cesta, infoProductos];
    }
   

    console.log(cesta);

    carritoHTML();
}


//muestra elñ carrito en el html 

function carritoHTML(){

    limpiarHTML();

    cesta.forEach(producto => {
        const { imagen, nombre, precio, cantidad, id} = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${imagen}" width="${producto.width}" height="100"></td>
        <td> ${nombre}</td>
        <td> ${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}" > X </a> </td> 
        `;  

        contenedorCesta.appendChild(row);
    });
    
}

function limpiarHTML(){
    //forma lenta de limnpiar
   // contenedorCesta.innerHTML = '';
   //console.log(contenedorCesta.firstChild);


while(contenedorCesta.firstChild){
    contenedorCesta.removeChild(contenedorCesta.firstChild);
}

}