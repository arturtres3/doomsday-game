// Definição de valores base e funções de memória

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

// valores iniciais padrão
let startDate = new Date(1900, 0, 1)
let endDate = new Date(2100, 0, 1)

let currentDate = new Date() 
let historyList = []

/**
 *  Transforma numeros 0-6 em strings para dias da semana na lingua da pagina
 * @param {int} dayIndex 
 * @returns {string} string para dia da semana
 */
function dayOfWeekAsString(dayIndex) {
    if(language == "pt-BR")
        return ["domingo", "segunda-feira","terça-feira","quarta-feira","quinta-feira","sexta-feira","sábado"][dayIndex] || '';
    else
        return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex] || '';
}

/**
 *  Salva lista de historico no armazenamento local
 * @param {Array} histList 
 */
function saveHistory(histList){
    localStorage.setItem('history', JSON.stringify(histList))
}

/**
 * Salva intervalo de datas atual no armazenamento local
 */
function saveRange(){
    localStorage.setItem('start_date', startDate.toLocaleDateString("pt-BR", {year: 'numeric'}) )
    localStorage.setItem('end_date', endDate.toLocaleDateString("pt-BR", {year: 'numeric'}) )
}

/**
 * Salva no armazenamento local se o modo escuro esta ligado
 */
function saveDarkMode(){
    localStorage.setItem('dark_mode', dark_mode.checked)
}

/**
 * Recupera lista de historico salva no armazenamento local 
 * @returns {Array} lista de historico que esta no armazenamento local
 */
function retrieveHistory(){
    return JSON.parse(localStorage.getItem('history')) || []
}

/**
 * Recupera valores de intervalo salvos no armazenamento local e aplica para variaveis de intervalo.
 * So eh usado ao carregar a pagina, por isso faz as duas funcoes.
 */
function retrieveAndSetRange(){
    const start = JSON.parse(localStorage.getItem('start_date')) || 1900
    const end = JSON.parse(localStorage.getItem('end_date')) || 2100

    setRange(Number(start), Number(end))
}

/**
 * Recupera valor de dark_mode salvo no armazenamento local e aplica para pagina.
 * So eh usado ao carregar a pagina, por isso faz as duas funcoes.
 */
function retrieveAndSetDarkMode(){
    dark_mode.checked = localStorage.getItem('dark_mode') === "true"
    dark_mode.dispatchEvent(new Event('change'))
}