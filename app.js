const express = require('express');
const fileupload = require('express-fileupload')
const cors = require('cors');
const bodyPaser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./router');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(fileupload());
app.use(bodyPaser.json());
app.use('/storage', express.static('storage'));
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DB_NAME}`).then(() => {
    console.log("Connect to mongodb");
}).catch(() => {
    console.log("Server is not connected to MongoDB");
})


// const migration = () => {
//     let migrator = require('./migrations/migrator');
//     migrator.backup();
//     migrator.migrate();
// }
// migration();


// async function CreateRole() {
//     let Role = require('./models/role');
//     await Role.create(
//         {
//             name : "client"
//         },
//         {
//             name : "admin"
//         }
//     );
// }
// CreateRole();
app.use("/", router);
app.listen(process.env.PORT, function () {
    console.log(`server is running on port ${process.env.PORT}`)
})