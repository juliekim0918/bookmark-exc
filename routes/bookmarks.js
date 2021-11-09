const app = require('express').Router();
const { conn, syncAndSeed, models: { Website }} = require('../db')

app.get("/", async (req, res, next) => {
  try {
    const websites = await Website.findAll();
    // console.log(websites, 'THESE ARE THE WEBSITES')
    const categoryObj = websites.reduce((acc, currBookmark) => {
      // if the acc obj already has a key of currBookmark.category, +1 count
      if (!acc.hasOwnProperty(currBookmark.category)) {
        acc[currBookmark.category] = 1;
      }
      {
        acc[currBookmark.category]++;
      }
      return acc;
    }, {});

    console.log(categoryObj);
    const categoryKeys = Object.keys(categoryObj);
    const HTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div class="global-container">
                <h1>Bookmarks</h1>
                <ul>
                    ${categoryKeys
                      .map((categoryName) => {
                        return `
                        <li>
                            <a href="/bookmarks/${categoryName}"> ${categoryName} (${categoryObj[categoryName]}) </a>
                        </li>
                        `;
                      })
                      .join("")}
                </ul>

            </div>
        </body>
        </html>
        `;

    res.send(HTML);
  } catch (e) {
    next(e);
  }
});


app.delete('/bookmarks/:category', async (req, res, next) => {
    try {
        const bookmark = await Website.findByPk(req.params.id)
        await bookmark.destroy();
        res.redirect(`/bookmarks/${category}`)
    } catch (e) {
        next(e)
    }

})


app.get("/bookmarks/:category", async (req, res, next) => {
  try {
      
    const category = req.params.category;
    const allBookmarksInCategory = await Website.findAndCountAll({
      where: { category },
    });

    const HTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div class="global-container">
                <h1>${category} ( ${allBookmarksInCategory.count} ) </h1>
                <a href="/"><h3>Go back</h3></a>
                <ul>
                    
                        ${allBookmarksInCategory.rows
                          .map((bookmark) => {
                            return `
                            <li> <a href="${bookmark.URL}">${bookmark.name}</a> </li>
                            <form method="POST" action="/bookmarks/${bookmark.id}?_method=DELETE">
                                <button> X </button>
                            </form>
                            `;
                          })
                          .join("")}
                </ul>
            </div>
        </body>
        </html>
        `;
    res.send(HTML);
  } catch (e) {
    console.log(e);
  }
});


module.exports = app