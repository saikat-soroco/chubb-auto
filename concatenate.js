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

fs.readdir(pathSupplied, function (err, list) {
  var styleTag;
  var inline;
  var polyfills;
  var scripts;
  var main;
  list.filter(extension).forEach(function (value, index) {
    if (value.includes('.css') && value.includes('styles')) {
      styleTag = fs.readFileSync(__dirname + "/dist/" + value) + '';
      styleTag = '<style>' + styleTag.substr(styleTag.indexOf('html{')) + '</style>';
    } else if (value.includes('.js')) {
      if (value.includes('inline')) {
        inline = '<script type="text/javascript">' + fs.readFileSync(__dirname + "/dist/" + value) + '</script>';
      } else if (value.includes('polyfills')) {
        polyfills = '<script type="text/javascript">' + fs.readFileSync(__dirname + "/dist/" + value) + '</script>';
      } else if (value.includes('scripts')) {
        scripts = '<script type="text/javascript">' + fs.readFileSync(__dirname + "/dist/" + value) + '</script>';
      } else if (value.includes('main')) {
        main = '<script type="text/javascript">' + fs.readFileSync(__dirname + "/dist/" + value) + '</script>';
      }
    }
  });

  styleTag = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Chubb</title><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1">' + styleTag + '</head><body><app-root></app-root>';
  main = main + '</body></html>';

  fs.writeFile(__dirname + "/dist/index_temp.html", styleTag + inline + polyfills + scripts + main, () => {
    console.log("successfully concatenated");
  });
});