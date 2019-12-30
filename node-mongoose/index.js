const mongoose = require("mongoose");
const Dishes = require("./models/dishes");
const url = "mongodb://localhost:27017/conFusion";

mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(db => {
    console.log(`connecting to database`);

    Dishes.create({
      name: `dishney land`,
      description: `a dish for kids`
    })
      .then(dish => {
        console.log(`${JSON.stringify(dish, null, 2)}`);

        return Dishes.findByIdAndUpdate(
          dish._id,
          {
            description: `a dish for kids, updated!`
          },
          { new: true, useFindAndModify: false }
        ).exec();
      })
      .then(dish => {
        console.log(`${JSON.stringify(dish, null, 2)}`);

        dish.comments.push(
          {
            rating: 5,
            comment: `anak saya suka.. ngomong sendiri`,
            author: `Smithy`
          },
          {
            rating: 3,
            comment: `piring bagus, tapi lebih bagus lagi kalo nggak ada`,
            author: `Weber`
          }
        );

        return dish.save();
      })
      .then(res => {
        console.log(`${JSON.stringify(res, null, 2)}`);

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
