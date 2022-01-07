const submit = document.getElementById('submit')
const date_display = document.getElementById('date-display')
const answer = document.getElementById('answer')
const dummyframe = document.getElementById('dummyframe')
const dark_mode = document.getElementById("dark-mode");
const root = document.querySelector(':root');

let theme = "light"

let startDate = new Date(1900, 0, 1)
let endDate = new Date(2100, 0, 1)
var options = {year: 'numeric', month: 'long', day: 'numeric' };

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

window.onload = () => {
    
}

dark_mode.onchange = () => {
    if (dark_mode.checked){
        document.body.classList.add("dark-mode")
        root.style.setProperty('--accent-color', 'lightgray')
        theme = "dark"
    }else{
	    document.body.classList.remove("dark-mode")
        root.style.setProperty('--accent-color', 'white')
        theme = "light"
    }
    // loadNewTweet(container_previous.dataset.tweetid, container_previous)
    // loadNewTweet(container_display.dataset.tweetid, container_display)
    // loadNewTweet(container_next.dataset.tweetid, container_next)
}

document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    let key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13){
        if(!next.classList.contains("disable"))
            next.click()
    }
    // if (key === 'Backspace' || key === 8){
    //     if(!back.classList.contains("disable"))
    //         back.click()
    // }
    // if (key === 'r' || key === 82){
    //     if(!random.classList.contains("hide"))
    //         random.click()
    // }

})

// recebe uma nova data da rota /next (funcao copiada)
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function setNewDate(newDate){
    document.getElementById("full_date").innerHTML = newDate.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })
    document.getElementById("year").innerHTML = "Year: " + newDate.toLocaleDateString("en-US", {year: 'numeric'})
    document.getElementById("month").innerHTML = "Month: " + newDate.toLocaleDateString("en-US", {month: 'numeric'})
    document.getElementById("day").innerHTML = "Day: " + newDate.toLocaleDateString("en-US", {day: 'numeric'})

    document.getElementsByName("correct")[0].value = newDate.getDay()
    document.getElementsByName("JSONdate")[0].value = JSON.stringify(newDate)
}

submit.addEventListener('click', () => {
    const formData = Object.fromEntries(new FormData(answer).entries());
    console.log(JSON.stringify(formData))
    //console.log(new Date(JSON.parse(formData.JSONdate)));

    httpGetAsync('/next', (response) => { 
        setNewDate(new Date(JSON.parse(response).date)) 
    })

    //answer.reset()

})
// date.toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric' })

// dummyframe.onload = () => {
// 
//     var doc = dummyframe.contentDocument || dummyframe.contentWindow.document;
//     if(doc){
//         let response = JSON.parse(doc.getElementsByTagName('pre')[0].innerHTML)
// 
//         if(response.value) {date_display.style.color = "green"}
// 
//         
//         
//     }
// }
