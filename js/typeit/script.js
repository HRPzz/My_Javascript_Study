// HTML 페이지 로딩이 끝났을 때 실행
document.addEventListener("DOMContentLoaded", () => {
    new TypeIt("#title")
        .pause(1000)
        .delete(6, { delay: 1000 })
        .type("Effect")
        .go();
});
