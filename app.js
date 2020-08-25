const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/adminRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
const dbUrl = '#db linkiniz';
mongoose.connect(dbUrl,{ useNewUrlParser: true, useUnifiedTopology: true })
.then((result)=>{app.listen(3000);
}).catch((err)=>{console.log(err)});

app.set('view engine', 'ejs');

/*app.use((req, res, next)=>{
    console.log(req.method);
    //Sonraki kod bloğuna ilerlemesi için
    next();
})*/

//Middleware
app.use(express.static('./public'))
//Post işlemi için parçalama işlemi
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))


app.get('/', (req, res) => {
    res.redirect('/blog')
})

app.get('/login', (req, res) => {
    res.render('login',{title: 'Giriş'})
})

app.use('/blog',blogRoutes)
app.use('/admin',adminRoutes)

app.get('/about', (req, res) => {
    res.render('about',{title: 'Hakkımızda'})
})

//Yönlendirme
app.get('/about-us', (req, res) => {
    res.redirect('about')
})

//En altta olması gerekmekte
app.use((req, res) => {
    res.status(404).render('404',{title: 'ERROR PAGE'})
})