class Producto {
    constructor(codigo, nombre) {
        this.nombre = nombre;
        this.codigo = codigo;
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

    listarProductos() {
        let res="";
        this.productos.forEach(producto => {
            res+=`Nombre: ${producto.nombre}, Codigo: ${producto.codigo}`;
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

let inv=new Inventario();
inv.agregar(new Producto(0,"producto1"));
inv.agregar(new Producto(1,"producto2"));
inv.agregar(new Producto(2,"producto3"));


const express=require("express");
const cors = require("cors");
const app = express()
app.use(express.json());
app.use(cors());

//buscar
app.get('/productos/:codigo',(req,res)=>{
    let codigo=parseInt(req.params.codigo);
    let resp=inv.buscar(codigo);
    console.log(resp);
    if(resp)
        res.json({msg:"producto encontrado",producto:resp})
    else
        res.json({msg:"No se encontro el producto"})

})
//eliminar
app.delete('/productos/:codigo', (req, res) => {
    let codigo = parseInt(req.params.codigo); // Convertir a número
    let resp = inv.eliminar(codigo);
    
    if (resp === false)
        res.json({msg: false, error: "Producto no encontrado"})
    else
        res.json({msg: true, codigo: codigo})
});
//listar
app.get('/productos',(req,res)=>{
    let resp=inv.listarProductos();
    if(resp=="")
        res.json({msg:"No hay productos"})
    else
        res.json({listaDeProductos:resp})
})
//agregar

app.post('/productos', (req, res) => {
    let codigo = parseInt(req.body.codigo); // Convertir a número
    let nombre = req.body.nombre;
    let resp = inv.agregar(new Producto(codigo, nombre));
    if (resp == null)
        res.json({ msg: false });
    else
        res.json({ msg: true, producto: resp });
});

app.get('/', (req, res) => {
    res.send('Hola World')
  })
// app.get('/productos',(req,res)=>{
//     res.json(inv.productos)
// })

app.listen(3002, ()=>console.log("Escuchando en..... 3002") );