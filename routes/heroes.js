const express = require('express');
const Hero = require('../models/hero');
const router = express.Router();

let heroesArray = [
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

router.get('/',  async (req, res) => {
   // res.send(heroesArray);
   //let heroes = await Hero.find({deceased: true, name: ""});
   //let heroes = await Hero.find({likeCount: {$nin : [3000, 10000] }}); //eq,gt,gte,lte,in,ne
   let heroes = await Hero.find()
             .or([{likeCount: 3000}, { likeCount: 5000}])
            //   .limit(1)
            //   .skip(1)
            //   .limit(1)
              .sort({name: 'asc'})
              .select({name: 1, deceased:1})
             // .countDocuments();
   res.send( heroes);
});

router.get('/:heroId', async (req, res) => {
    // let heroId = req.params.heroId; //request parameter
    //let optionalValue = req.query.showMore; //query parameters
    //res.send("Request Parameters: " + heroId +", Query Parameters: " + optionalValue);
    //let heroId = parseInt(req.params.heroId);
    //let hero = heroesArray.find(h => h.id === heroId);

    let hero =  await Hero.findById(req.params.heroId)
    if (!hero) {
        return res.sendStatus(400).send("The given id does not exist on our server...");
    }

    res.send(hero);
});

router.post('/', async (req, res) => {

    if (!req.body.heroName) {
        return res.status(400).send("Not all mandetory values have been set");
    }

    // let newHero = {
    //     id: heroesArray.length + 1,
    //     name: req.body.heroName
    // }
    // heroesArray.push(newHero);
    // console.log(heroesArray);
    // res.send(newHeroObj);
    try {
        let heroToBeAddedToDb = new Hero({
             name: req.body.heroName,
             birthname : req.body.birthName,
             movies : req.body.movies,
             likeCount : req.body.likeCount,
             imgUrl: req.body.imgUrl,
             deceased:req.body.deceased
        });

    heroToBeAddedToDb = await heroToBeAddedToDb.save();
    res.send(heroToBeAddedToDb);

   } catch (e) {
       return res.status(500).send(e.message);
   }  
});

router.put('/:heroId', async(req, res) => {
    //let heroId = parseInt(req.params.heroId);
    //let hero = heroesArray.find(h => h.id === heroId);

    let hero = await Hero.findById(req.params.heroId);

    if (!hero){
        return res.status(404).send("Hero Id does not exit");
    }
    if (!req.body.heroName) {
        return res.status(400).send("Not all mandetory values have been set");
    }
    hero.set({name: req.body.heroName});
    hero = await hero.save();
    //hero.name = req.body.heroName;
    res.send(hero);      
});

router.delete('s/:heroId', (req, res) => {
    let heroId = parseInt(req.params.heroId);//This will filter out any values with number continued by a string(including characters)
    let hero = heroesArray.find(h => h.id === heroId);

    if (!hero){
        return res.status(404).send("Hero Id does not exit");
    }
    let heroIndex = heroesArray.indexOf(hero);
    let removedHero = heroesArray.splice(heroIndex, 1);
    console.log(removedHero);
    res.send(heroesArray);
})

module.exports = router;