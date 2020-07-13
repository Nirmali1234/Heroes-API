
console.log("1: Before calling Db....");

function getMovieData(){

    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log("2: Reading movie data form our db.....")
            let dbData= {id:30, name:'Avengers: End game'}
            resolve(dbData,name);
            //console.log("Executing after 4 seconds.....")
        }, 4000);
    });
}

async function printMovieDetails(){
    let movieDataFromDb= await getMovieData();
    let secondFunctionRes = await getActorDetailsFromImDB(movieDataFromDb);
    console.log ("3: Movie data: "+movieDataFromDb); 
} 
printMovieDetails();

/*--Using resolved promise 

getMovieData().then((result) =>{
    let movieDataFromDb = result;
    console.log ("3: Movie data: "+movieDataFromDb); 
})*/
   
console.log("4: Doing some other work now.....")
