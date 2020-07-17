const express = require('express')
const app = express();

const PORT = 3000

// ? Create sever listening for requests on PORT
app.listen(PORT || 3000, () => {
    console.log(`App listening on port ${PORT}!`);
});

app.get('/', (req, res) => {
    res.send("HELLO WORLD 000");
});