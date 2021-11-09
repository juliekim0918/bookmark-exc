const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/bookmark_db')
const {STRING, TEXT} = Sequelize;

const Website = conn.define('websites', {
    name: {
        type: STRING
    },
    URL: {
        type: STRING
    },
    category: {
        type: STRING
    }
})

const syncAndSeed = async () => {
    // syncs and wipes out if table already exists 
    await conn.sync({ force: true });
    await Promise.all(data.map((bookmark) => {
        return Website.create({
            name: bookmark.name,
            URL: bookmark.URL,
            category: bookmark.category
        })
    }))
}


module.exports = {
    conn,
    models: { Website },
    syncAndSeed
}

const data = [
  {
    name: "LinkedIn",
    URL: "http://www.linkedin.com",
    category: "jobs",
  },
  {
    name: "Indeed",
    URL: "http://www.indeed.com",
    category: "jobs",
  },
  {
    name: "Amazon",
    URL: "http://www.amazon.com",
    category: "shopping",
  },
  {
    name: "W3C Shools - Javascript",
    URL: "https://www.w3schools.com/jsref/default.asp",
    category: "coding",
  },
  {
    name: "Target",
    URL: "http://www.shopping.com",
    category: "shopping",
  },
  {
    name: "The Weeknd",
    URL: "https://www.theweeknd.com/",
    category: "music",
  },
  {
    name: "Stack Overflow",
    URL: "https://stackoverflow.com/",
    category: "coding",
  },
];
