const db = require('./db')
const { conn, syncAndSeed, models: { Website }} = require('./db');
// const { Website } = models;
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'))
app.use('/', require('./routes/bookmarks'))
app.use(require('method-override')('_method'));
app.use(express.urlencoded({ extended: false }));

const startApp = async () => {
    try {
        //await conn.authenticate();
        await syncAndSeed();
        // const findBookmark = await Website.findOne({ where: { name: 'Amazon' } })
        // console.log(findBookmark)
        const port = process.env.PORT || 3000;
        app.listen(port, ()=> { console.log(`this is the port ${port}`)})
    console
    } catch (e) {
        console.log(e)
    }

}

startApp(); 