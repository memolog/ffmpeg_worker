"use strict";
const greeting = require('./greeting/greeting');
exports.greeting = function () {
    return greeting.say();
};
