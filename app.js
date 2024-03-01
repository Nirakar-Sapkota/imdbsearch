const tilesEl=document.getElementById('tiles');

const searchEl=document.getElementById('search');

let tilesData=[];

const url = 'https://imdb-top-100-movies.p.rapidapi.com/';

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '3d33d8f798msh8c67d1d169325f8p14c97cjsn778f69c4aa27',
		'X-RapidAPI-Host': 'imdb-top-100-movies.p.rapidapi.com'
	},
};


searchEl.addEventListener('keyup',(e)=>{
    const targetString=e.target.value.toLowerCase();
    console.log(targetString)
    const filteredSearch = tilesData.filter((movies)=>{
       
        return movies.title.toLowerCase().includes(targetString)||movies.rating.toLowerCase().includes(targetString);

    })

 movieCharacters(filteredSearch);

});


 const showMovies= async ()=>{


    try {
        const response = await fetch(url, options);
        const mainData = await response.json();
        // tilesData=mainData.slice(0,100);
        tilesData=mainData
       
        movieCharacters(tilesData)
        console.log(tilesData)

        }
     catch (error) {

        console.log(error)
  }
}



const movieCharacters = ((theMainMovies)=>{
    const htmlString=theMainMovies
    .map((moviesTile)=>{
        return `
        <div class="tiles" id="tiles">
                <div class="info" id="info">
                    <h1 id="title">${moviesTile.title}</h1>
                    <img src="${moviesTile.image}">
                    <p id="about">${moviesTile.description}</p>
                <p>IMDB Rating: ${moviesTile.rating} </p>
                 <p>Genre: ${moviesTile.genre}</p>

                </div>
        </div>

        `
    }).join('');
    tilesEl.innerHTML=htmlString;
  
})



showMovies();
