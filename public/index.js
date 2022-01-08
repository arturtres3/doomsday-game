const submit = document.getElementById('submit')
const date_display = document.getElementById('date-display')
const answer = document.getElementById('answer')
const dark_mode = document.getElementById("dark-mode");
const history = document.getElementById("history");
const entries = document.getElementById("entries");
const bottom_line = document.getElementById("bottom-line");
const root = document.querySelector(':root');

let theme = "light"

let startDate = new Date(1900, 0, 1)
let endDate = new Date(2100, 0, 1)
const options = {year: 'numeric', month: 'long', day: 'numeric' };

let currentDate = new Date()

function dayOfWeekAsString(dayIndex) {
    // return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
    return ["domingo", "segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"][dayIndex] || '';
  }

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

window.onload = () => {
    setNewDate(randomDate(startDate, endDate))
}

dark_mode.onchange = () => {
    if (dark_mode.checked){
        document.body.classList.add("dark-mode")
        root.style.setProperty('--accent-color', 'lightgray')
        date_display.style.setProperty('color', 'lightgrey')
        date_display.style.setProperty('background-color', 'var(--dark-bg)')
        theme = "dark"
    }else{
	    document.body.classList.remove("dark-mode")
        date_display.style.setProperty('background-color', 'var(--accent-color)')
        date_display.style.setProperty('color', 'black')
        root.style.setProperty('--accent-color', 'white')
        theme = "light"
    }
}

document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    let key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13){
        if(!submit.classList.contains("disable"))
            submit.click()
    }
})

function setNewDate(newDate){
    document.getElementById("full_date").innerHTML = newDate.toLocaleDateString("pt-BR", {year: 'numeric', month: 'long', day: 'numeric' })
    // document.getElementById("year").innerHTML = "Year: " + newDate.toLocaleDateString("en-US", {year: 'numeric'})
    // document.getElementById("month").innerHTML = "Month: " + newDate.toLocaleDateString("en-US", {month: 'numeric'})
    // document.getElementById("day").innerHTML = "Day: " + newDate.toLocaleDateString("en-US", {day: 'numeric'})
    document.getElementById("date-num").innerHTML = newDate.toLocaleDateString("pt-BR")

    currentDate = newDate
}

submit.addEventListener('click', () => {
    const formData = Object.fromEntries(new FormData(answer).entries());
    console.log(JSON.stringify(formData))

    const newHist = document.createElement("div");
    const your = document.createElement("div");
    const correct = document.createElement("div");
    
    your.innerHTML = `Você: ${dayOfWeekAsString(formData.answer)}`
    correct.innerHTML = `Correta: ${currentDate.toLocaleDateString('pt-BR', {weekday: 'long'})}`
    newHist.classList.add("hist-entry")
    newHist.innerHTML = currentDate.toLocaleDateString("pt-BR")
    if(formData.answer == currentDate.getDay()){
        newHist.style.setProperty('background-color', 'var(--right)')
    }else{
        newHist.style.setProperty('background-color', 'var(--wrong)')
    }
    newHist.appendChild(your)
    newHist.appendChild(correct)
    entries.appendChild(newHist)

    history.scrollTop = history.scrollHeight

    if(history.scrollHeight > history.clientHeight){
        bottom_line.style.setProperty('display', 'inherit')
    }
    
    setNewDate(randomDate(startDate, endDate))
    answer.reset()

})
