"use strict";
var fs = require("fs");
var dirwalk = require("walk");
var path = require("path");
var crypto = require("crypto");

module.exports.file = function(filePath, options, onComplete)
{
    if(!onComplete) {
        onComplete = options;
        options = {};
    }

    if(!fs.existsSync(filePath)) {
        onComplete(new Error("File '" + filePath + "' not found"));
        return;
    }

    var algorithm = options.algorithm || 'md5';
    var hash = crypto.createHash(algorithm);
    
    fs.createReadStream(filePath)
        .on('error', onComplete)
        .on('data', function(chunk) {
            hash.update(chunk, 'utf8')
        })
        .on('end', function() {
            onComplete(null, hash.digest('hex'));
        })
};

module.exports.directory = function(dirPath, options, onComplete)
{
    if(!onComplete) {
        onComplete = options;
        options = {};
    }

    var relative = options.relative !== undefined ? options.relative : true ;
    var files = {};

    dirwalk
        .walk(dirPath).on('file', function(root, filestats, next) {
            module.exports.file(path.join(root, filestats.name), options, function(error, hash) {
                var filePath = path.join(root, filestats.name);
                files[relative ? path.relative(dirPath, filePath) : filePath] = hash;
                next();
            });
        })
        .on("errors", function(root, nodeStatsArray, next) {
            next();
        })
        .on('end', function() {
            onComplete(files);
        });
};

