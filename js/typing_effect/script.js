const content = "Typing Effect";
const text = document.querySelector(".text");
let index = 0; // content 문자열의 인덱스 역할

function typing() {
    text.textContent += content[index++]; // content 텍스트 추가
    if (index > content.length) { // (인덱스 > 문자열 길이)인 경우
        text.textContent = ""; // text 초기화
        index = 0; // 인덱스 초기화
    }
}

setInterval(typing, 500); // 0.5초마다 typing 함수 호출