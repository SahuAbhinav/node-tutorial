const log = require('./LogEvent');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

const myEmitter = new MyEmitter();

myEmitter.on('log', (msg) => {log("log \t "+msg);});
myEmitter.on('logs', (msg) => {log("logs\t" +msg);});


setTimeout(() => {

myEmitter.emit('logs', 'This is Emiiter log')


}, 2000);




