const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const url = "mongodb://localhost:27017/conFusion";

mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(db => {
    console.log(`connecting to database`);

    let newDish = Dishes({
      name: `dishney land`,
      description: `a dish for kids`
    });

    newDish
      .save()
      .then(dish => {
        console.log(`${JSON.stringify(dish, null, 2)}`);

        return Dishes.find({}).exec();
      })
      .then(result => {
        console.log(`${JSON.stringify(result, null, 2)}`);

        // return Dishes.remove({});
        return mongoose.connection.close();
      })
      .catch(err => {
        console.log(`error on querying data OR closing connections: ${err}`);
      });
  })
  .catch(err => {
    console.log(`error on connecting to database: ${err}`);
  });
