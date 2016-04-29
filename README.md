# fasthash

Calculate hashes for files and directories the streaming way
 
## Example
 
```javascript
var fasthash = require("./fasthash");

var options = {
    algorithm: 'md5' // default
};


// Usage: fasthash.file(filePath, [options], onComplete)
fasthash.file("testdata/index.html", options, function(error, hash) {
    if(error) {
        console.log(error);
    }
    console.log(hash);
    // a6febb912da51bcbcc443fc658c76c3d
});


// Usage: fasthash.file(dirPath, [options], onComplete)
fasthash.directory("testdata", options, function(hashes) {
    console.log(hashes);

    //  {
    //      'testdata/Dokumentation.pdf': 'a7b638e4e2cf0aa0cb945db4481da807',
    //      'testdata/index.html': 'a6febb912da51bcbcc443fc658c76c3d',
    //      'testdata/vendor/animate.min.css': '60aca30e688004a84ab7c554d257e527',
    //      ...
    //  }
});
```
