let rect = require("./module_rectangle");

let panjang = -4;
let lebar = 5;

rect(panjang, lebar, (err, count) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Area: ${count.area()}`);
    console.log(`Perimeter: ${count.perimeter()}`);
  }
});

console.log("ini adalah log terakhir");
