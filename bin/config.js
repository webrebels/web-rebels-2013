/*jshint es5:true node:true*/

"use strict";

var convict = require('convict');


// Configuration schema

var conf = convict({
env: {

    doc: "Applicaton environments",
        format  : ["development", "production"],
        default : "development",
        env     : "NODE_ENV"
    },

    httpServerPort: {
        doc     : "The port the server should bind to",
        format  : "port",
        default : 8000,
        env     : "NODE_HTTP_SERVER_PORT"
    },

    docRoot: {
        doc     : "Document root for static files to be served by the http server",
        format  : "*",
        default : "./src",
        env     : "NODE_HTTP_DOC_ROOT"
    },

    logConsoleLevel: {
        doc     : "Which level the console transport log should log at",
        format  : "*",
        default : "info",
        env     : "NODE_LOG_CONSOLE_LEVEL"
    },

    logConsoleSilent: {
        doc     : "If the console transport log should be silent or not",
        format  : "*",
        default : false,
        env     : "NODE_LOG_CONSOLE_SILENT"
    },

    logFileLevel: {
        doc     : "Which level the file transport log should log at",
        format  : "*",
        default : "info",
        env     : "NODE_LOG_FILE_LEVEL"
    },

    logFileSilent: {
        doc     : "If the file transport log should be silent or not",
        format  : "*",
        default : false,
        env     : "NODE_LOG_FILE_SILENT"
    },

    logFileFileName: {
        doc     : "Which file the file transport log should log to",
        format  : "*",
        default : './logs/web-rebels-2013.log',
        env     : "NODE_LOG_FILE_FILE_NAME"
    },

    ircServer: {
        doc     : "URL to the web-rebels-irc server is exposed at",
        format  : "*",
        default : 'localhost',
        env     : "NODE_IRC_SERVER"
    },

    ircServerPort: {
        doc     : "Port to the web-rebels-irc server is exposed at",
        format  : "port",
        default : 8100,
        env     : "NODE_IRC_SERVER_PORT"
    }

});



// Load and validate configuration depending on environment
var env = conf.get('env');
conf.loadFile('./config/' + env + '.json');
conf.validate();



// Export merged configuration to the application
module.exports = conf;