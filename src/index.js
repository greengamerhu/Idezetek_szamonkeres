import './style.css';
let idezetLista = []

document.addEventListener('DOMContentLoaded', async () => {
    let response =  await fetch('/quotes.json');
    let eredmeny = await response.json();
    for(let e of eredmeny.quotes) {
        idezetLista.push(e)
    }
    console.log(idezetLista)
    document.getElementById('osszesButton').addEventListener('click', async () => {
        document.getElementById('osszesDisplay').textContent = " "

        response =  await fetch('/quotes.json');
        eredmeny = await response.json();

        let idezetListaABC = idezetLista.map((a) => a);

        idezetListaABC.sort((a, b) => a.author.localeCompare(b.author))
        for (let e of idezetListaABC) {
            let li = document.createElement('li')
            li.style.marginBottom = "10px"
            li.innerHTML = "<q>" +e.quote  +"</q>" + "<br>" + e.author
            document.getElementById('osszesDisplay').appendChild(li)
        }
    })
    document.getElementById('theButton').addEventListener('click', async ( ) => {
        document.getElementById('theDisplay').textContent = ""

        response =  await fetch('/quotes.json');
        eredmeny = await response.json();

        let idezetTomb =  idezetLista.map((a) => a.quote)
  
        let seged = ""
        for (let e of idezetTomb) {
            let li = document.createElement('li')
        
            if (e.toLowerCase().includes("the") || e.includes("The")) {
                    seged = e.replaceAll("The ", "<b>"+ "The " + "</b>" )
                    seged = seged.replaceAll("the ", "<b>"+ "the " + "</b>" )
                    li.innerHTML = seged
            }  else {
                li.textContent = e
            }
            
            document.getElementById('theDisplay').appendChild(li)
        }
    })
    document.getElementById('hosszButton').addEventListener('click', async () => {
        response =  await fetch('/quotes.json');
        eredmeny = await response.json();

        let idezethosszTomb =  idezetLista.map((a) => a.quote.length)
     
        
        document.getElementById('hosszDisplay').textContent = idezethosszTomb.join(", ")
        
    })
    document.getElementById('darabInput').addEventListener('input', async () => {
        let inputAuthor = document.getElementById('darabInput').value
        let dblist = idezetLista.filter(
            e => e.author.toLowerCase().includes(inputAuthor.toLowerCase())
        )
        document.getElementById('darabDisplay').value = dblist.length

    })
   
})

