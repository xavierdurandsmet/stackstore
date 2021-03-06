 'use strict';
 var router = require('express').Router();
 module.exports = router;


 router.use('/users', require('./users'));
 router.use('/instructor', require('./instructor'));
 router.use('/products', require('./products'));
 router.use('/cart', require('./cart'));
 router.use('/transaction', require('./transaction'));

 // Make sure this is after all of
 // the registered routes!
 router.use(function(req, res) {
   res.status(404).end();
 });