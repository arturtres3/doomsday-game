// EventListeners e codigo que altera a apresentação da página

window.onload = () => {
    historyList = retrieveHistory()
    retrieveAndSetRange()
    retrieveAndSetDarkMode()

    setNewDate(randomDate(startDate, endDate))

    historyList.forEach(entry => {
        makeHistoryEntry(new Date(JSON.parse(entry.date)), entry.answer, false)
    })
}

window.onbeforeunload = () => {
   saveHistory(historyList)
   return null;
}

document.addEventListener('keyup', function (event) {
    if (event.defaultPrevented) {
        return;
    }

    let key = event.key || event.keyCode;

    // Enter envia resposta
    if (key === 'Enter' || key === 13){
        submitAnswer()
    }

    // numerais de 0-6 selecionam dias da semana 
    for(let i = 0; i <= 6 ; i++){
        if (key === i.toString() || key === i){
            document.getElementById(i.toString()).click()
        }
    }

})

hamburger.addEventListener('click', () => {
    const nav = document.getElementById("navbar")

    if(nav.style.display == 'block'){
        nav.style.display = 'none'
    }else{
        nav.style.display = 'block'
    }
    // console.log(nav.style.display);
})

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

day_training.onchange = () => {
    if (day_training.checked){
        year_training.checked = false
        dayTraining()
    }else{
        retrieveAndSetRange() // recupera intervalo anterior
        setNewDate(randomDate(startDate, endDate))
    }
    
}

year_training.onchange = () => {
    if (year_training.checked){
        day_training.checked = false
        retrieveAndSetRange()  // recupera intervalo anterior caso day_training estava ativado antes
        yearTraining()
    }else{
        setNewDate(randomDate(startDate, endDate))
    }
}

clear_hist.addEventListener('click', () => {
    clearHistory()
})

apply_range.addEventListener('click', () => {
    applyUserRange()
})

submit.addEventListener('click', () => {
    submitAnswer()
})

/**
 * Faz animacao destacando elemento (entradas no historico)
 * @param {HTMLElement} element - 
 */
function highlight(element) {
    accent = '4px dashed gold'
    normal = '1px solid var(--accent-color)'

    setTimeout(function() {
        element.style.border = (element.style.border == accent) ? normal : accent
    }, 0);
    setTimeout(function() {
        element.style.border = (element.style.border == accent) ? normal : accent
    }, 800);
 }