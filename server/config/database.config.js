const mongoose = require('mongoose'),
uri = `mongodb://localhost/${process.env.DB_NAME}`;

mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(res => console.log("you are now in the mainframe"))
    .catch(err => console.log("oohh no it failed"))
