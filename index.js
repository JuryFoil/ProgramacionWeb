class Producto {
    constructor(codigo, nombre, precio, cantidad) {
        this.nombre = nombre;
        this.codigo = codigo;
        this.precio=precio;
        this.cantidad=cantidad;
    }
}
class Inventario {
    constructor() {
        this.productos = [];
    }

    agregar(producto) {
        if(this.buscar(producto.codigo)){
            return null
        }else{
        this.productos.push(producto);
        return producto;
        }
    }

    eliminar(codigo) {
        let indice = this.buscarIndice(codigo);

        if(indice !== -1) {
            this.productos.splice(indice, 1);
            return true;
        } else {
            return false;
        }
    }

    listar() {
        let res="";
        this.productos.forEach(producto => {
            res+=`Nombre: ${producto.nombre}, Codigo: ${producto.codigo}, Precio:${producto.precio}, Cantidad:${producto.cantidad}`;
        });
        return this.productos;
    }
    buscar(codigo) {
        return this.productos.find(producto => producto.codigo === codigo);
    }
    buscarIndice(codigo){
        return this.productos.findIndex(producto => producto.codigo === codigo);
    }
}

let inventario=new Inventario();

let express=require("express");
let cors = require("cors");
let app = express()
app.use(express.json());
app.use(cors());

//buscar
app.get('/productos/:codigo',(req,res)=>{
    let codigo=req.params.codigo;
    let resp=inventario.buscar(codigo);
    if(resp==true)
        res.json({msg:"producto encontrado", producto:resp})
    else
        res.json({msg:"No se encontro el producto"})
        console.log(resp);

})
//eliminar
app.delete('/productos/:codigo', (req, res) => {
    let codigo = parseInt(req.params.codigo); // Convertir a número
    let resp = inventario.eliminar(codigo);
    if (resp==true) {
        res.json({msg: true, codigo: codigo})
    }else{
        res.json({msg: false, error: "Producto no encontrado"})

    }
  /*  if (resp == false)
        res.json({msg: false, error: "Producto no encontrado"})
    else
        res.json({msg: true, codigo: codigo})*/
});
//listar
app.get('/productos',(req,res)=>{
    let resp=inventario.listar();
    if(resp=="")
        res.json({msg:"No hay productos"})
    else
        res.json({listaDeProductos:resp})
})
//agregar

app.post('/productos', (req, res) => {
    let codigo = req.body.codigo; // Convertir a número
    let nombre = req.body.nombre;
    let precio= req.body.precio;
    let cantidad = req.body.cantidad;	
    let nuevo= new Producto(codigo, nombre, precio, cantidad);
   /* let resp= inventario.agregar(nuevo);
    if (resp) {
        res.json({tipo:1, codigo:codigo})
    }
    else {
        res.json({tipo:-1})
    }*/
    
    let resp = inventario.agregar(nuevo);
    if (resp == null)
        res.json({ msg: false });
    else
        res.json({ msg: true, producto: resp });
});
/*
app.get('/', (req, res) => {
    res.send('Hola World')
  })
// app.get('/productos',(req,res)=>{
//     res.json(inventario.productos)
// })
*/
app.listen(3000, ()=>console.log("Escuchando en..... 3000") );