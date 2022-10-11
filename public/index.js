// Funcionamento do jogo

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function applyUserRange(){

    setRange(document.getElementById('since').value,
             document.getElementById('until').value)

    saveRange()

    // conferir de data atual esta no intervalo, se estiver não gerar nova data
    setNewDate(randomDate(startDate, endDate))
}

function setRange(start, end){
    document.getElementById('since').value = start
    document.getElementById('until').value = end

    startDate = new Date(start, 0, 1)
    endDate = new Date(end, 0, 1)
}

function setNewDate(newDate){
    document.getElementById("full_date").innerHTML = newDate.toLocaleDateString(language, {year: 'numeric', month: 'long', day: 'numeric' })
    document.getElementById("date-num").innerHTML = newDate.toLocaleDateString(language)

    currentDate = newDate
}

/**
 * Cria elemento do histórico
 * @param {Date} date - data da pergunta
 * @param {int} answer - resposta no form
 * @param {boolean} isNew - nova resposta ou carregando historico da mem local 
 */
function makeHistoryEntry(date, answer, isNew){
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

    // animacao em novas entradas
    if(isNew){highlight(newHist)}
}

function clearHistory(){
    historyList = []
    localStorage.removeItem('history')
    while (entries.firstChild) {
        entries.removeChild(entries.lastChild);
    }
}

function submitAnswer(){
    const formData = Object.fromEntries(new FormData(answer).entries());

    // if answer = empty, não enviar

    makeHistoryEntry(currentDate, formData.answer, true)
    historyList.push({date: JSON.stringify(currentDate), answer: formData.answer})
    
    setNewDate(randomDate(startDate, endDate))

    answer.reset()
}

