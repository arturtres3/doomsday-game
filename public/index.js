const next = document.getElementById('next')
const date = document.getElementById('date')
const answer = document.getElementById('answer')
const dark_mode = document.getElementById("dark-mode");
const root = document.querySelector(':root');

let theme = "light"
//function currentId() {return container_display.dataset.tweetid}

window.onload = () => {
//     // salva o primeiro id
//     history.add(currentId());
// 
//     // reativa os botoes quando carrega um tweet
//     twttr.ready(function (twttr) {
//         twttr.events.bind('rendered', function (event) {
//             next.classList.remove("disable")
//             if(!history.isOnEnd(currentId()))
//                 back.classList.remove("disable")
//         });
//     });
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

function httpPostAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function formSubmit(event) {
    var url = "/teste";
    var request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.onload = function() { // request successful
    // we can use server response to our request now
      console.log(request.responseText);
    };
  
    request.onerror = function() {
      // request failed
    };
  
    request.send(new FormData(event.target)); // create FormData from form that triggered event
    event.preventDefault();
  }

answer.addEventListener('submit', formSubmit)

next.addEventListener('click', () => {
    answer.submit()
    
})