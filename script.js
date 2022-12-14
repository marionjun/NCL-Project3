const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e6d645b9f5msh34c1f7a5daa8e0cp1edebbjsnd122130a4afb',
		'X-RapidAPI-Host': 'world-clock.p.rapidapi.com'
	}
};

fetch('https://world-clock.p.rapidapi.com/json/est/now', options)
	.then(response => response.json())
	.then(response => {
        console.log(response)
        const textDiv = document.getElementById('text');
        const p =document.createElement('p');
        const pText= document.createTextNode(response.timeZoneName);
        textDiv.appendChild(p);
        p.appendChild(pText);
    })
	.catch(err => console.error(err));

const circle = document.querySelector('.circle');
const text = circle.innerHTML;// Note I am being lazy here and assuming the string has no unwanted whitespace
        circle.innerHTML = '';        
        circle.style.setProperty('--numchs', text.length);
        for ( let i = 0; i < text.length; i++ ) {
          circle.innerHTML = circle.innerHTML + '<div class="char" style="--char-index: ' + i + ';">' + text.charAt(i) + '</div>';
        }


