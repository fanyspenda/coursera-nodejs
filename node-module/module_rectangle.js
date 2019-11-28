module.exports = (length, width, callback) => {
  if (length <= 0 || width <= 0) {
    setTimeout(
      () => (
        callback(
          new Error("Panjang atau lebar harus lebih besar dari 0"),
          null
        ),
        2000
      )
    );
  } else {
    setTimeout(() =>
      callback(null, {
        area: () => length * width,
        perimeter: () => (length + width) * 2
      })
    ),
      2000;
  }
};
