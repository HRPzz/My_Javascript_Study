const numbersDiv = document.querySelector(".numbers")
const drawButton = document.querySelector("#draw")
const resetButton = document.querySelector("#reset")

const lottoNumbers = []
const colors = ["tomato", "teal", "orange", "purple", "blue"]

function paintNumber(number){
    const eachNumDiv = document.createElement("div")
    let colorIndex = Math.floor(number / 10)
    
    eachNumDiv.classList.add('eachnum')
    eachNumDiv.style.backgroundColor = colors[colorIndex]
    eachNumDiv.textContent = number
    numbersDiv.appendChild(eachNumDiv)
}

drawButton.addEventListener("click", function(){
    while(lottoNumbers.length < 6){
        // Math.random(): 0 ~ 1까지 랜덤 숫자 생성
        // Math.floor(): 소수점 이하 제거
        let ran = Math.floor(Math.random() * 45) + 1
        
        // ran 이 lottoNumbers 에 존재하지 않으면 -1 반환
        if(lottoNumbers.indexOf(ran) === -1){
            lottoNumbers.push(ran)
            paintNumber(ran)
        }
    }
})

resetButton.addEventListener("click", function(){
    lottoNumbers.splice(0,6) // 0번 인덱스에서 6개 삭제
    numbersDiv.innerHTML = ""
})
