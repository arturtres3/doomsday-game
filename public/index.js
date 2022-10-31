// Funcionamento do jogo

/**
 * Retorna data aleatória no intervalo informado
 * @param {Date} start
 * @param {Date} end 
 * @returns {Date} Data aleatoria
 */
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

/**
 * Funcionalidade do botao "Apply Range". 
 * Define variaveis de intervalo, salva e gera nova data (se necessario)
 */
function applyUserRange(){

    setRange(document.getElementById('since').value,
             document.getElementById('until').value)

    saveRange()

    // confere se data atual esta no novo intervalo, se estiver não gerar nova data
    if(currentDate < startDate || currentDate > endDate)
        setNewDate(randomDate(startDate, endDate))
}

/**
 * Aplica intervalo definido pelo usuário
 * @param {int} start - ano inicio do intervalo (inclusivo)
 * @param {int} end - ano final do intervalo (não inclusivo)
 */
function setRange(start, end){
    document.getElementById('since').value = start
    document.getElementById('until').value = end

    startDate = new Date(start, 0, 1)
    endDate = new Date(end, 0, 1)
}

/**
 * Define a data da pergunta
 * @param {Date} newDate - nova data da pergunta
 */
function setNewDate(newDate){
    document.getElementById("full_date").innerHTML = newDate.toLocaleDateString(language, {year: 'numeric', month: 'long', day: 'numeric' })
    document.getElementById("date-num").innerHTML = newDate.toLocaleDateString(language)

    currentDate = newDate
}

/**
 * Cria elemento do histórico
 * @param {Date} date - data da pergunta
 * @param {int} answer - resposta para a data
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

/**
 * Funcionalidade do botao "Clear History".
 * Zera lista na variavel e na memoria. Remove elementos de historico.
 */
function clearHistory(){
    historyList = []
    localStorage.removeItem('history')
    while (entries.firstChild) {
        entries.removeChild(entries.lastChild);
    }
}

/**
 * Funcionalidade do botao "Submit".
 * Cria entrada no historico com a data atual e gera nova data.
 */
function submitAnswer(){
    const formData = Object.fromEntries(new FormData(answer).entries());

    // se nao tiver resposta, nao envia
    if(formData.answer) {    
        makeHistoryEntry(currentDate, formData.answer, true)
        historyList.push({date: JSON.stringify(currentDate), answer: formData.answer})
        
        if(year_training.checked){
            setNewDate(fixedDay(randomDate(startDate, endDate)))
        }else{
            setNewDate(randomDate(startDate, endDate))
        }

        answer.reset()
    }
}

/**
 *  Funcionalidade do slider Day. Seleciona o ano correspondente ao doomsday selecionado e o aplica no intervalo. Gera nova data
 */
function dayTraining(){
    let year = yearsDayTraining[day_training_input.value]

    setRange(year, year+1)
    
    setNewDate(randomDate(startDate, endDate))

}

/**
 * Funcionalidade do slide Year. Define uma nova data com dia fixo em doomsday
 */
function yearTraining(){
    
    setNewDate(fixedDay(randomDate(startDate, endDate)))

}
