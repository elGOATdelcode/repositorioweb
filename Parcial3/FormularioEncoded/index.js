const express= require('express');
const app =express();

app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({extended:true}))


app.post("/Formulario",(req,res)=>{
    console.log(req.body);
    res.send(`Hola ${req.body.Apellido}`)
    })


const PORT =3000;
app.listen(PORT,()=>{
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});

