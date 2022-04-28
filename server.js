require('dotenv').config();
const express =require('express');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended:true}));
app.use(express.json());

// router
const dataRouter = require('./routes/route_student.js');


app.listen(PORT,()=>{
    console.log('listening on port'+PORT);

});
app.use('/api/datas',dataRouter);