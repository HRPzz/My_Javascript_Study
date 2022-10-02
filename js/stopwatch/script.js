let minutes = 0;
let seconds = 0;
let tenMillis = 0;

const appendTens = document.getElementById("tenMillis");
const appendSeconds = document.getElementById("seconds");
const appendMinuttes = document.getElementById("minutes");
const buttonStart = document.getElementById("bt__start");
const buttonStop = document.getElementById("bt__stop");
const buttonReset = document.getElementById("bt__reset");
let intervalId;

// START 버튼 클릭 이벤트
buttonStart.onclick = function(){
    clearInterval(intervalId); // 타이머 제거
    intervalId = setInterval(operateTimer, 10); // 10ms 마다 시간에 대한 숫자 증가
}

// STOP 버튼 클릭 이벤트
buttonStop.onclick = function(){
    clearInterval(intervalId); // 타이머 제거
}

// RESET 버튼 클릭 이벤트
buttonReset.onclick = function(){
    clearInterval(intervalId); // 타이머 제거
    tenMillis = 0; seconds = 0; minutes = 0;
    appendTens.textContent = "00";
    appendSeconds.textContent = "00";
    appendMinuttes.textContent = "00";
}

function operateTimer(){
    tenMillis++;
    appendTens.textContent = tenMillis > 9 ? tenMillis : '0' + tenMillis;
    if(tenMillis > 99){
        seconds++;
        appendSeconds.textContent = seconds > 9 ? seconds : '0' + seconds;

        tenMillis = 0;
        appendTens.textContent = "00";
    }
    if(seconds > 59){
        minutes++;
        appendMinuttes.textContent = minutes > 9 ? minutes : '0' + minutes;
        
        seconds = 0;
        appendSeconds.textContent = "00";
    }
}