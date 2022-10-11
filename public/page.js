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

    // colocar seletores nas teclas numérica
    // domingo = 0, segunda = 1, ...

    if (key === 'Enter' || key === 13){
        if(!submit.classList.contains("disable")){
            // submit.click()
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

clear_hist.addEventListener('click', () => {
    clearHistory()
})

apply_range.addEventListener('click', () => {
    applyUserRange()
})

submit.addEventListener('click', () => {
    submitAnswer()
})

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