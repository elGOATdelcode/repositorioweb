const express= require('express');
const app =express();

app.use(express);


const PORT =3000;
app.listen(PORT,()=>{
    console.info(`Hola mundo, servidor corriendo en el puerto ${PORT}`);
});