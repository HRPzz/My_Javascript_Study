import "./css/style.css";

const animals = require("./animal.js");
const $ = require("jquery");

$.each(animals, function (index, obj) {
    $("body").append(`<h1>animal ${index} = ${obj.name}</h1>`);
});

console.log(animals);
