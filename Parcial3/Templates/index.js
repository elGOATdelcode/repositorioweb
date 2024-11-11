const express= require('express');
const path= require('path');
const pug = require('pug');
const app =express();

app.set('view engine','pug')
app.set('views',path.join(__dirname,'vistas'))

app.use(express.json())


app.get("/administrativos",(req,res)=>{
    console.log(req.query);
    //res.send('Servidor contestando a peticion GET con parametros en el query')
    res.render('vista1')
    })

app.get("/maestros",(req,res)=>{
console.log(req.body);
res.send('Servidor contestando a peticion GET con parametros en el body')
})

app.get("/estudiantes/:carrera",(req,res)=>{
    console.log(req.params.carrera);
    console.log(req.params.control);
    res.send('Servidor contestando a peticion GET con parametros')
    })

const PORT =3000;
app.listen(PORT,()=>{
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});

