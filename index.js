// import express from 'express'
// import path from 'path';
const express = require('express');
const path = require('path');
const port = 5000;    

const app = express();  


// webapack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('./webpack.config.js');

// middlewares
app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(express.static(__dirname + '/public'))


// const __dirname = path.resolve();

/*app.use('/static', express.static('public'));           
             
app.get('/', (req, res) => {      
    res.sendFile(path.join(__dirname, '/index.html'));                     
});*/

app.listen(port, () => {          
    console.log(`Now listening on port ${port}`); 
});
