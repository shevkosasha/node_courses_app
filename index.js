const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const pass = 'J67pcCiyG9AhAjf';

const PORT = process.env.PORT || 3000;

async function start() {
 
  try {
    const url = 'mongodb+srv://new_user_test:J67pcCiyG9AhAjf@cluster0.qi9gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
    await mongoose.connect(url, {useNewUrlParser: true});
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })  
  } catch (e) {
    console.log(e)
  }
}

start();

