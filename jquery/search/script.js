// document.ready - 제이쿼리 시작
$(function () {
    // 아이콘 클릭 이벤트
    $(".icon").click(function () {
        // active 클래스를 넣었다 뺐다 하게 됨
        $(".search").toggleClass("active");
    });
});
