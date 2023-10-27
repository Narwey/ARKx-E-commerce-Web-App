const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://benmbarkanouar:dvpenq1xeH4UbUtw@cluster0.jy0hprr.mongodb.net/test?retryWrites=true&w=majority')
   .then(() => {
     console.log('Connected to the database');
   })
   .catch(err => {
     console.error('Error connecting to the database:', err);
   });