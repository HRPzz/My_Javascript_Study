// querySelectorAll(선택자): 선택자 요소 모두 가져와서 배열 형태로 반환
const spans = document.querySelectorAll("span")
const contents = document.querySelectorAll(".content")

// offsetTop: 요소의 윗면 경계가 최상위 요소의 윗면 경계(브라우저 맨 윗부분)와의 거리
const firstTop = contents[0].offsetTop // 0
const secondTop = contents[1].offsetTop // 500
const thirdTop = contents[2].offsetTop // 1000

// 클릭 이벤트 - scroll 실행
spans[0].onclick = function(){[
    window.scroll({top: firstTop, behavior: 'auto'})
]}
spans[1].onclick = function(){[
    window.scroll({top: secondTop, behavior: 'smooth'})
]}
spans[2].onclick = function(){[
    window.scroll({top: thirdTop, behavior: 'smooth'})
]}