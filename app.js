const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config()

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(PORT, () => {
})



app.get('/', (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(result => result.json())
        .then(data => {
            res.render('pages/index', { data: data.results, imageUrl: 'https://image.tmdb.org/t/p/w500/', total_pages: data.total_pages })
        })
})

app.get('/movie/:id', (req, res) => {
    console.log(req.params.id);
    fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.API_KEY}`)
        .then(result => result.json())
        .then(data => {
            console.log(data)
            res.render('pages/movie', { data: data, imageUrl: 'https://image.tmdb.org/t/p/original/', imageUrlPrev: 'https://image.tmdb.org/t/p/w500/'})
        })
})

app.get('/movies/page/movie/:id', (req, res) => {
    res.redirect(`/movie/${req.params.id}`)
})

app.get('/', (req, res) => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
        .then(result => result.json())
        .then(data => {
            res.render('pages/index', { data: data.results, imageUrl: 'https://image.tmdb.org/t/p/w500/', total_pages: data.total_pages })
        })
})

app.get('/movies/genre/:id', (req, res) => {
    console.log(req.params.id);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=${req.params.id}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`)
    .then(result => result.json())
    .then(data => {       
        res.render('pages/index', { data: data.results, imageUrl: 'https://image.tmdb.org/t/p/w500/', total_pages: data.total_pages})
    })
})

app.get('/movies/page/:id', (req, res) => {
    console.log(req.params.id);
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}&with_genres=28&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.params.id}`)
    .then(result => result.json())
    .then(data => {
        res.render('pages/index', { data: data.results, imageUrl: 'https://image.tmdb.org/t/p/w500/', total_pages: data.total_pages})
    })
})

app.get('/movies/genre/movie/:id', (req, res) => {
    res.redirect(`/movie/${req.params.id}`)
})

app.post('/search', (req, res) => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${req.body.searchString}`)
    .then(result => result.json())
    .then(data => {
        res.render('pages/index', { data: data.results, imageUrl: 'https://image.tmdb.org/t/p/w500/', total_pages: data.total_pages})
    })
})

app.get('*', (req, res) => {
    res.redirect('/');
});