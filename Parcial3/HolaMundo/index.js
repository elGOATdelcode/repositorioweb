const express= require('express');
const app =express();
//Interpreta el json que viene el body y lo agrega como propiedades del objeto body
app.use(express.json())


app.get('/',(req,res)=>{res.send('Hola mundo')})

const PORT =3000;
app.listen(PORT,()=>{
    console.info(`Servidor corriendo en el puerto ${PORT}`);
});
