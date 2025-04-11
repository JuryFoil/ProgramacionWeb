const btnAgregar = document.getElementById('btnAgregar');
const btnEliminar = document.getElementById('btnEliminar');
const btnListar = document.getElementById('btnListar');
const btnBuscar = document.getElementById('btnBuscar');

btnAgregar.addEventListener('click', function() {
    const nombreProd = document.getElementById('nombreProd').value;
    const codigo = document.getElementById('codigo').value;
    fetch("http://localhost:3002/productos",{
        method:"POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({codigo:codigo, nombre:nombreProd}),
    })
        .then(response => response.json())
        .then(resp=>{
            if(resp.msg==true){
                alert("Producto agregado correctamente");
            }
            else{
                alert("Error al agregar el producto");
            }
        })
});

btnBuscar.addEventListener('click', function() {
    const codigo = document.getElementById('codigo').value;
    fetch(`http://localhost:3002/productos/${codigo}`)
        .then(response => response.json())
        .then(resp => {
            let divRespuesta = document.getElementById("divRespuesta");
            divRespuesta.innerHTML = "";
            if (resp.msg ==="producto encontrado") {
                divRespuesta.innerHTML = `<div class="alert alert-success">
                    <p class="mb-0"><strong>Código:</strong> ${resp.producto.codigo} <strong>Nombre:</strong> ${resp.producto.nombre}</p>
                </div>`;
            } else {
                divRespuesta.innerHTML = `<div class="alert alert-warning">
                    <p class="mb-0">Producto no encontrado</p>
                </div>`;
            }
        });
});

btnListar.addEventListener('click', function() {
    fetch("http://localhost:3002/productos")
    .then(response => response.json())
    .then(resp=>{
        let divRespuesta=document.getElementById("divRespuesta");
        divRespuesta.innerHTML="";
        
        // Crear una tabla para mostrar los productos
        let tabla = `<table class="table table-striped">
                        <thead class="table-primary">
                            <tr>
                                <th>Código</th>
                                <th>Nombre</th>
                            </tr>
                        </thead>
                        <tbody>`;
                        
        resp.listaDeProductos.forEach(element => {
            tabla += `<tr>
                        <td>${element.codigo}</td>
                        <td>${element.nombre}</td>
                      </tr>`;
        });
        
        tabla += `</tbody></table>`;
        divRespuesta.innerHTML = tabla;
    })
});

btnEliminar.addEventListener('click', function() {
    const codigo = document.getElementById('codigo').value;

    fetch(`http://localhost:3002/productos/${codigo}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(resp => {
            if(resp.msg === true) {
                alert("Producto eliminado correctamente");
            }
            else {
                alert("Error al eliminar el producto: No se encontró el producto");
            }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Error en la conexión");
            });
});