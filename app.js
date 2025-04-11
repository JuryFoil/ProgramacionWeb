let btnAgregar = document.getElementById('btnAgregar');
let btnEliminar = document.getElementById('btnEliminar');
let btnListar = document.getElementById('btnListar');
let btnBuscar = document.getElementById('btnBuscar');

btnAgregar.addEventListener('click', function() {
    let nombreProd = document.getElementById('nombreProd').value;
    let codigo = document.getElementById('codigo').value;
    let precioProd=document.getElementById('precioProd').value;
    let cantidad=document.getElementById('cantidad').value;
    fetch("http://localhost:3000/productos",{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({codigo:codigo, nombre:nombreProd, precio:precioProd, cantidad:cantidad}),
    })
        .then(response => response.json())
        .then(resp=>{
            /*if(resp.msg==true){
                alert("Producto agregado correctamente");
            }
            else{
                alert("Error al agregar el producto");
            }*/
                let divRespuesta = document.getElementById("divRespuesta");
                divRespuesta.innerHTML = "";
                if (resp.msg ==true) {
                    divRespuesta.innerHTML = `<div>
                        <p>Producto agregado correctamente</p>
                    </div>`;
                } else {
                    divRespuesta.innerHTML = `<div>
                        <p>Producto no agregado</p>
                    </div>`;
                }
        })
});

btnBuscar.addEventListener('click', function() {
    let codigo = document.getElementById('codigo').value;
    fetch(`http://localhost:3000/productos/${codigo}`)
        .then(response => response.json())
        .then(resp => {
            let divRespuesta = document.getElementById("divRespuesta");
            divRespuesta.innerHTML =  '';
            if (resp.msg =="producto encontrado") {
                divRespuesta.innerHTML +=/* `<div>
                    <p>Código: ${resp.producto.codigo} Nombre: ${resp.producto.nombre}</p>
                </div>`;*//*
                    `<tr>
                        <td>${resp.producto.codigo}</td>
                        <td>${resp.producto.nombre}</td>
                        <td>${resp.producto.precio}</td>
                        <td>${resp.producto.cantidad}</td>
                      </tr>`;
                        */
                       `<table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
                    <tbody>

            <thead>
                <tr>
                    <td>${resp.producto.codigo}</td>
                    <td>${resp.producto.nombre}</td>
                    <td>${resp.producto.precio}</td>
                    <td>${resp.producto.cantidad}</td>
                </tr>
            </thead>
            </tbody></table>`
            } else {
                divRespuesta.innerHTML = `<div>
                    <p>Producto no encontrado</p>
                </div>`;
            }
        });
});

btnListar.addEventListener('click', function() {
    fetch("http://localhost:3000/productos")
    .then(response => response.json())
    .then(resp=>{
        let divRespuesta=document.getElementById("divRespuesta");
        divRespuesta.innerHTML="";
        
        let tabla = `<table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                            </tr>
                        </thead>
                        <tbody>`;
                        
        resp.listaDeProductos.forEach(element => {
            tabla += `<tr>
                    
                    <td>${element.codigo}</td>
                    <td>${element.nombre}</td>
                    <td>${element.precio}</td>
                    <td>${element.cantidad}</td>
                </tr>`;
        });
        
        tabla += `</tbody></table>`;
        divRespuesta.innerHTML = tabla;
        
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error en la conexión");
    });
});

btnEliminar.addEventListener('click', function() {
    let codigo = document.getElementById('codigo').value;

    fetch(`http://localhost:3000/productos/${codigo}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(resp => {
            let divRespuesta=document.getElementById("divRespuesta");
            divRespuesta.innerHTML="";
            if(resp.msg === true) {
                divRespuesta.innerHTML="Producto eliminado correctamente";
            }
            else {
                divRespuesta.innerHTML="Error al eliminar el producto: No se encontró el producto";
            }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error en la conexión");
            });
});