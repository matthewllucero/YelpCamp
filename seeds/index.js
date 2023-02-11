// const mongoose = require('mongoose');
// const Campground = require('../models/campground');
// const cities = require('./cities');
// const { places, descriptors } = require('./seedHelpers');

// mongoose.connect('mongodb://localhost:27017/yelp-camp', {
//     useNewUrlParser: true,
//     //useCreateIndex: true
//     useUnifiedTopology: true
// });

// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", () => {
//     console.log("Database connected");
// })

// const sample = (array) => array[Math.floor(Math.random() * array.length)];

// const seedDB = async() => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 50; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price = Math.floor(Math.random() * 20) + 10;
//         const camp = new Campground( {
//             author: '63e3f01b97edc6dd821ee45a',
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             title: `${sample(descriptors)} ${sample(places)}`,
//             image: 'https://source.unsplash.com/collection/483251',
//             description: 'fake description a;lsdfjla;skjdf;ajsdf;lajk;l',
//             price: price
//         })
//         await camp.save();
//     }
// }

// seedDB().then(() => {
//     mongoose.connection.close()
// })

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63e3f01b97edc6dd821ee45a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dakrqlwzd/image/upload/v1675974883/YelpCamp/sjqzaajd6choftwqv7kx.jpg',
                    filename: 'YelpCamp/sjqzaajd6choftwqv7kx'
                },
                {
                    url: 'https://res.cloudinary.com/dakrqlwzd/image/upload/v1675972861/YelpCamp/usyiv3kmnm1ehfkgcwu2.jpg',
                    filename: 'YelpCamp/usyiv3kmnm1ehfkgcwu2'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})