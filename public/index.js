const submit = document.getElementById('submit')
const date_display = document.getElementById('date-display')
const answer = document.getElementById('answer')
const dark_mode = document.getElementById("dark-mode");
const history = document.getElementById("history");
const entries = document.getElementById("entries");
const bottom_line = document.getElementById("bottom-line");
const clear_hist = document.getElementById("clear-hist");
const apply_range = document.getElementById("apply-range");
const hamburger = document.getElementById("hamburger");
const range_inputs = document.getElementsByClassName("range");
const root = document.querySelector(':root');

const language = document.documentElement.lang == 'pt' ? 'pt-BR' : 'en-US'

let startDate = new Date(1900, 0, 1)
let endDate = new Date(2100, 0, 1)

let currentDate = new Date()
let historyList = []

function dayOfWeekAsString(dayIndex) {
    if(language == "pt-BR")
        return ["domingo", "segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"][dayIndex] || '';
    else
        return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

window.onload = () => {
    historyList = retrieveHistory()
    retrieveAndSetRange()
    retrieveAndSetDarkMode()

    setNewDate(randomDate(startDate, endDate))

    historyList.forEach(entry => {
        makeHistoryEntry(new Date(JSON.parse(entry.date)), entry.answer)
    })
}

window.onbeforeunload = () => {
   saveHistory(historyList)
   return null;
}

dark_mode.onchange = () => {
    if (dark_mode.checked){
        root.style.setProperty('--accent-color', 'lightgray')
        root.style.setProperty('--background-color', 'darkgray')
        date_display.classList.add('dark-date')
    }else{
        root.style.setProperty('--accent-color', 'white')
        root.style.setProperty('--background-color', 'lightgrey')
        date_display.classList.remove('dark-date')
    }

    saveDarkMode()
}

document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    let key = event.key || event.keyCode;

    if (key === 'Enter' || key === 13){
        if(!submit.classList.contains("disable")){
            // submit.click()
        }
    }
})

function applyUserRange(){

    setRange(document.getElementById('since').value,
             document.getElementById('until').value)

    saveRange()

    setNewDate(randomDate(startDate, endDate))
}

function setRange(start, end){
    document.getElementById('since').value = start
    document.getElementById('until').value = end

    startDate = new Date(start, 0, 1)
    endDate = new Date(end, 0, 1)
    // console.log(`since: ${start}, until: ${end}`);
}

function setNewDate(newDate){
    document.getElementById("full_date").innerHTML = newDate.toLocaleDateString(language, {year: 'numeric', month: 'long', day: 'numeric' })
    document.getElementById("date-num").innerHTML = newDate.toLocaleDateString(language)

    currentDate = newDate
}

function makeHistoryEntry(date, answer){
    const newHist = document.createElement("div");
    const your = document.createElement("div");
    const correct = document.createElement("div");

    const tags = language == "pt-BR" ? ["Você:", "Correta:"] : ["Your:", "Answer:"]

    your.innerHTML = `${tags[0]} ${dayOfWeekAsString(answer)}`
    correct.innerHTML = `${tags[1]} ${date.toLocaleDateString(language, {weekday: 'long'})}`
    newHist.classList.add("hist-entry")
    newHist.innerHTML = date.toLocaleDateString(language)
    if(answer == date.getDay()){
        newHist.style.setProperty('background-color', 'var(--right)')
    }else{
        newHist.style.setProperty('background-color', 'var(--wrong)')
    }
    newHist.appendChild(your)
    newHist.appendChild(correct)
    entries.appendChild(newHist)

    history.scrollTop = history.scrollHeight
    entries.scrollLeft = entries.scrollWidth;

    if(history.scrollHeight > history.clientHeight){
        bottom_line.style.setProperty('display', 'inherit')
    }
}

function saveHistory(histList){
    localStorage.setItem('history', JSON.stringify(histList))
}

function clearHistory(){
    historyList = []
    localStorage.removeItem('history')
    while (entries.firstChild) {
        entries.removeChild(entries.lastChild);
    }
}

function retrieveHistory(){
    return JSON.parse(localStorage.getItem('history')) || []
}

function saveRange(){
    localStorage.setItem('start_date', startDate.toLocaleDateString("pt-BR", {year: 'numeric'}) )
    localStorage.setItem('end_date', endDate.toLocaleDateString("pt-BR", {year: 'numeric'}) )
}

function retrieveAndSetRange(){
    const start = JSON.parse(localStorage.getItem('start_date')) || 1900
    const end = JSON.parse(localStorage.getItem('end_date')) || 2100

    setRange(Number(start), Number(end))
}

function saveDarkMode(){
    localStorage.setItem('dark_mode', dark_mode.checked)
}

function retrieveAndSetDarkMode(){
    dark_mode.checked = localStorage.getItem('dark_mode') === "true"
    dark_mode.dispatchEvent(new Event('change'))
}

hamburger.addEventListener('click', () => {
    const nav = document.getElementById("navbar")

    if(nav.style.display == 'block'){
        nav.style.display = 'none'
    }else{
        nav.style.display = 'block'
    }
    // console.log(nav.style.display);
})

clear_hist.addEventListener('click', () => {
    clearHistory()
})

apply_range.addEventListener('click', () => {
    applyUserRange()
})

submit.addEventListener('click', () => {
    const formData = Object.fromEntries(new FormData(answer).entries());

    makeHistoryEntry(currentDate, formData.answer)
    historyList.push({date: JSON.stringify(currentDate), answer: formData.answer})
    
    setNewDate(randomDate(startDate, endDate))

    answer.reset()
})
