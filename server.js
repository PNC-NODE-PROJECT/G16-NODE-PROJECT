require('dotenv').config();
const express =require('express');
var cors = require('cors');
const app = express();
app.use(cors({origin: '*'})); // To allow any origin

const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended:true})); 
app.use(express.json());



// Define static route
app.use(express.static("public"));
// router
const questionRouter = require('./routes/route_question.js');


app.listen(PORT,()=>{
    console.log('listening on port'+PORT);

});
app.use('/api',questionRouter);