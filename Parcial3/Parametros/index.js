const express= require('express');
const app =express();
//Interpreta el json que viene el body y lo agrega como propiedades del objeto body
app.use(express.json())


app.get('/',(req,res)=>{res.send('Hola mundo')})


app.get("/administrativos",(req,res)=>{
    console.log(req.query);
    res.send('Servidor contestando a peticion GET con parametros en el query')
    })

app.get("/maestros",(req,res)=>{
console.log(req.body);
res.send('Servidor contestando a peticion GET con parametros en el body')
})

//por si la carrera cambia, se agarra con esa variable
app.get("/estudiantes/:carrera",(req,res)=>{
    console.log(req.params.carrera);
    console.log(req.params.control);
    res.send('Servidor contestando a peticion GET con parametros')
    })

const PORT =3000;
app.listen(PORT,()=>{
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});



/*
Middleware es funcion que se ejecuta en el ciclo de ejecucion-respuesta
Con este middleware le contestas al cliente o llamas a la siguiente funcion
app.use((req,res,next)=>{
    res.send()
    next()
})
*/
