// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'e6d645b9f5msh34c1f7a5daa8e0cp1edebbjsnd122130a4afb',
// 		'X-RapidAPI-Host': 'world-clock.p.rapidapi.com'
// 	}
// };

// fetch('https://world-clock.p.rapidapi.com/json/est/now', options)
// 	.then(response => response.json())
// 	.then(response => {
//         console.log(response)
//         const textDiv = document.getElementById('text');
//         const p =document.createElement('p');
//         const pText= document.createTextNode(response.timeZoneName);
//         // textDiv.appendChild(p);
//         // p.appendChild(pText);
//     })
// 	.catch(err => console.error(err));

const circle = document.querySelector('.circle');
const text = circle.innerHTML;// Note I am being lazy here and assuming the string has no unwanted whitespace
circle.innerHTML = '';        
circle.style.setProperty('--numchs', text.length);
for ( let i = 0; i < text.length; i++ ) {
  circle.innerHTML = circle.innerHTML + '<div class="char" style="--char-index: ' + i + ';">' + text.charAt(i) + '</div>';
}

        // 
// 
// A function to get the current time
//
function getCurrentTime() {
  // get country name selected
  var country = document.getElementById("country").value;
  // get the time zone using timezone.abstractapi.com api
  // var url = "https://timezone.abstractapi.com/v1/current_time/?api_key=9b5d9b5d9b5d4b5d9b5d9b5d9b5d9b5d&location=" + country;
  $.getJSON("https://timezone.abstractapi.com/v1/current_time/?api_key=11ad117b2b804de4b1a92db0027fe811&location= "+country,
  // Following function will be called when the data is received from the api
  function(data) {
    // log the data to the console
    console.log(data);
    // extract datetime from the data
    var datetime = data.datetime;
    // extract time from the datetime
    var time = datetime.slice(11, 19);
    // log the time to the console
    console.log(time);
    // If 12 am, the circle transform scale will be 0.5, if 12 pm, the circle transform scale will be 1.5
    // check the time and set the circle transform scale accordingly
    // start by converting it to milliseconds
    // time = "00:00:00"; //testing for 12am
    // time = "12:00:00"; //testing for 12pm
    var timeInMs = new Date("1970-01-01T" + time + "Z").getTime();
    // get the time in milliseconds for 12 am
    var twelveAmInMs = new Date("1970-01-01T00:00:00Z").getTime();
    // get the time in milliseconds for 12 pm
    var twelvePmInMs = new Date("1970-01-01T12:00:00Z").getTime();

    // calculate the difference between the time and 12 am
    var diffFromTwelveAm = timeInMs - twelveAmInMs;
    // calculate the difference between 12 pm and 12 am
    var diffBetweenTwelvePmAndTwelveAm = twelvePmInMs - twelveAmInMs;
    // calculate the percentage of the difference between 12 pm and 12 am
    var percentage = diffFromTwelveAm / diffBetweenTwelvePmAndTwelveAm;
    // calculate the scale
    var scale = 0.5 + percentage;
    scale = scale/2;
    // set the circle transform scale
    // this is the current circle animation:
    // @keyframes animate {
      // 0% {
      //       transform: perspective(1000px) rotateY(360deg) rotateX(-15deg);
      //   }

      //   100% {
      //       transform: perspective(1000px) rotateY(0deg) rotateX(15deg);
      //   }
      // }
    // create new animation that includes scale transformation
    var newAnimation = "@keyframes animate { 0% { transform: perspective(1000px) rotateY(360deg) rotateX(15deg) translate(-50%, -50%) scale3d(" + scale + "," + scale + "," + scale + "); } 100% { transform: perspective(1000px) rotateY(0deg) rotateX(15deg) translate(-50%, -50%) scale3d(" + scale + "," + scale + "," + scale + "); } }";
    // create a style element
    // apply the new animation to the circle element
    var style = document.createElement('style');
    style.innerHTML = newAnimation;
    document.head.appendChild(style);
    // set the circle animation to the new animation
    circle.style.animation = "animate 8s linear infinite";

    // console log the scale
    console.log(scale);

    // Display current time zone location and time in the time div
    document.getElementById("time").innerHTML = "Time in " +data.requested_location +"("+ data.timezone_location + ") is " + time;
  });
}

// Get the current time when the page loads
getCurrentTime();

