let curPos = 0; // 현재 보여주는 이미지의 인덱스 번호
let positionValue = 0; // 이미지 태그의 위치 값 지정할 변수
const IMAGE_WIDTH = 640;

const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const images = document.querySelector(".images");

function prev() {
    if(curPos > 0) {
        nextBtn.removeAttribute('disabled'); // 비활성화 효과 해제
        nextBtn.style.visibility = 'visible'; // 보이기
        positionValue += IMAGE_WIDTH;
        images.style.transform = `translateX(${positionValue}px)`; // 이동
        curPos -= 1;
    }
    if(curPos === 0) {
        // 첫 번째 사진 - prev 버튼 비활성화 효과 or 숨기기
        // prevBtn.setAttribute('disabled', 'true'); // 비활성화 효과
        prevBtn.style.visibility = 'hidden'; // 숨기기
    }
}

function next() {
    if(curPos < 3) {
        prevBtn.removeAttribute('disabled'); // 비활성화 효과 해제
        prevBtn.style.visibility = 'visible'; // 보이기
        positionValue -= IMAGE_WIDTH;
        images.style.transform = `translateX(${positionValue}px)`; // 이동
        curPos += 1;
    }
    if(curPos === 3) {
        // 마지막 사진 - next 버튼 비활성화 효과 or 숨기기
        // nextBtn.setAttribute('disabled', 'true'); // 비활성화 효과
        nextBtn.style.visibility = 'hidden'; // 숨기기
    }
}

function init() {
    // 첫 번째 사진 - prev 버튼 비활성화 효과 or 숨기기
    // prevBtn.setAttribute('disabled', 'true'); // 비활성화 효과
    prevBtn.style.visibility = 'hidden'; // 숨기기

    // prev 버튼 클릭하면 prev 함수 실행하는 이벤트
    prevBtn.addEventListener("click", prev);
    
    // next 버튼 클릭하면 next 함수 실행하는 이벤트
    nextBtn.addEventListener("click", next);
}

init();
