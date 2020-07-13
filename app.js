const express = require('express');
const authenticator = require ("./middlewares/authenticator");
const email = require ("./middlewares/emailjob");
const app = express();
const PORT = 3000;

app.use(express.json()); //Catch json data in the request body
app.use(authenticator);
app.use(email);

const herosArray = [
    {
        id: 1,
        name: 'Bat Man'
    },
    {
        id: 2,
        name: 'Super Man'
    },
    {
        id: 3,
        name: 'Spider Man'
    }
]



app.get('/api/heros', (req, res) => {
    res.send(herosArray);
});

app.get('/api/heros/:heroId', (req, res) => {
    // let heroId = req.params.heroId; //request parameter
    //let optionalValue = req.query.showMore; //query parameters
    //res.send("Request Parameters: " + heroId +", Query Parameters: " + optionalValue);

    let heroId = parseInt(req.params.heroId);
    let hero = herosArray.find(h => h.id === heroId);

    res.send(hero);
});

app.post('/api/heros', (req, res) => {

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandetory values have been set");
    }

    let newHero = {
        id: herosArray.length + 1,
        name: req.body.heroName
    }
    herosArray.push(newHero);
    res.status(201).send(herosArray);
});

app.put('/api/heros/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);
    let hero = herosArray.find(h => h.id === heroId);

    if (!hero){
        return res.status(404).send("Hero Id does not exit");
    }
    if (!req.body.heroName) {
        return res.status(400).send("Not all mandetory values have been set");
    }
    hero.name = req.body.heroName;
    res.send(herosArray);      
});

app.delete('/api/heros/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);//This will filter out any values with number continued by a string(including characters)
    let hero = herosArray.find(h => h.id === heroId);

    if (!hero){
        return res.status(404).send("Hero Id does not exit");
    }
    let heroIndex = herosArray.indexOf(hero);
    let removedHero = herosArray.splice(heroIndex, 1);
    console.log(removedHero);
    res.send(herosArray);
})

app.listen(PORT, function() {
    console.log("Listening on port - " + PORT);
});
