const express = require('express');
const config = require('./config/config');
const apiRouter = require('./routers/app.router');

const app = express();

//App middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Routes
app.use('/api', apiRouter);

const server = app.listen(config.PORT, ()=> {
    console.log(`[${config.NODE_ENV.trim()}] Using ${config.DATA_SOURCE} as project's data source`);
    console.log(`[${config.NODE_ENV.trim()}] Server is up runnig on port => ${config.PORT}`);

});

server.on('error' , (error) => {
    console.log('There was an unexpected error in the server');
    console.log(error);
});
