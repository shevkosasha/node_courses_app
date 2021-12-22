const express = require('express')
const path = require('path')

const mongoose = require('mongoose')

const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const User = require('./models/user')



// const expressHandlebars = require('express-handlebars');
// const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

// const app = express();



const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
// app.engine('hbs', exphbs({
//   handlebars: allowInsecurePrototypeAccess(Handlebars)
// }));
// app.set('view engine', 'handlebars');
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(async (req, res, next) => {
  try {
    const user = await User.findById('61c384e44cf01d1c3ffd8452');
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
})

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3000

async function start() {
  try {
    const url = `mongodb+srv://new_user_test:J67pcCiyG9AhAjf@cluster0.qi9gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    await mongoose.connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
    })
    const candidate = await User.findOne();
    if(!candidate) {
      const user = new User({
        email: 'test@gmail.com',
        name: 'test',
        cart: {items: []}
      })
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()





// const url = 'mongodb+srv://new_user_test:J67pcCiyG9AhAjf@cluster0.qi9gv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

