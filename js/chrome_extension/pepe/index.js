// 0.5초마다 실행
setInterval(()=>{
    // img 태그 가져와서 전부 pepe 이미지로 교체
    let imgs = document.querySelectorAll("img");
    imgs.forEach((img, i) => {
        img.src = "https://www.pngmart.com/files/11/Sad-Pepe-The-Frog-Meme-Transparent-Background.png";
    });
}, 500);
