let handleId = 0; // 타이머 id
const h1 = document.getElementById("time");
const go = document.getElementById("go");
const stop = document.getElementById("stop");

function getTime(){
    const date = new Date(); // 생성된 시점의 정보
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hour}:${minutes}:${seconds}`;
    h1.textContent = time;
}

// go 버튼 클릭 이벤트
go.onclick = function(){
    if (handleId == 0) { // handleId 가 0 이면 등록
        handleId = setInterval(getTime, 1000); // 1초마다 getTime 함수 실행, 타이머 id 반환
    }
}

// stop 버튼 클릭 이벤트
stop.onclick = function(){
    clearInterval(handleId); // 타이머 멈춤
    handleId = 0; // handleId 를 0으로 초기화
}