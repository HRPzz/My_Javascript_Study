var link = document.querySelector('.link');
// 태그에 필요한 정확한 타입명으로 narrowing 해야 함
if (link instanceof HTMLAnchorElement) {
    link.href = 'https://kakao.com';
}
var btn = document.querySelector('#button');
// TS 에서 eventListener 부착하기 전에 narrowing 필수
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () { });
