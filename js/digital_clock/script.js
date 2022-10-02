const todayDiv = document.getElementById("today")
const timeDiv = document.getElementById("time")

function getTime(){
    let now = new Date() // Mon Oct 03 2022 00:00:00 GMT+0900 (한국 표준시) 로 표시됨
    
    let year = now.getFullYear()
    let month = now.getMonth() + 1
    let date = now.getDate()
    let hour = now.getHours()
    let minute = now.getMinutes()
    let second = now.getSeconds()

    month = month < 10 ? `0${month}` : month
    date = date < 10 ? `0${date}` : date
    hour = hour < 10 ? `0${hour}` : hour
    minute = minute < 10 ? `0${minute}` : minute
    second = second < 10 ? `0${second}` : second

    todayDiv.textContent = `${year}년 ${month}월 ${date}일`
    timeDiv.textContent = `${hour}시 ${minute}분 ${second}초`
}

getTime(); // setInterval 전에 시계가 보여지도록 getTime 함수 호출
setInterval(getTime, 1000) // 1초마다 getTime 함수 호출