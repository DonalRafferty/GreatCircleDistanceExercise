'use strict';

module.exports = function(app){
    var customers = require('../../app/controllers/customers.server.controller');

    // Customers routes
    app.route('/customers/local')
        .post(customers.list);

};
