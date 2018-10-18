// @author: Ashwin Rai

var fs = require("fs");
var path = require("path");

var pathSupplied = __dirname + "/dist/";

var html = fs.readFileSync(__dirname + "/dist/index.html", "utf8");

var scripts;

function extension(element) {
  var extName = path.extname(element);

  return extName === ".css" || extName === ".js";
}

fs.readdir(pathSupplied, function(err, list) {
  list.filter(extension).forEach(function(value, index) {
    if (value.includes("bundle")) {
      if (value.includes(".css")) {
        console.log("Injecting css " + value);
        var styles = fs.readFileSync(__dirname + "/dist/" + value);
        html = html.replace(
          new RegExp('<link href="' + value + '" rel="stylesheet"/>', 'g'),
          `<style>${styles}</style>`
        );
      } else {
        console.log("Injecting js " + value);
        var js = fs.readFileSync(__dirname + "/dist/" + value);
        
        if(value.includes("scripts.")){
          scripts = value;
        }

        html = html.replace(
          new RegExp("<script type=\"text/javascript\" src=\"" + value + "\"></script>", 'g'),
          `<script>${js}</script>`
        );

      }
    }
  });
 
  html = html.toString().replace('<script type="text/javascript" src="'+ scripts +'"></script>', "$_padding_&").replace("_padding_","");

  fs.writeFile(__dirname + "/dist/index.html", html, () => {
    console.log("success");
  });
});