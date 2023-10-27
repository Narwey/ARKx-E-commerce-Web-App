require('./config/db')
const app = require('./app');


const port = process.env.PORT || 3000 ;

// create a server 
app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`);
});