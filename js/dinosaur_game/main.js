// canvas 에서 그림 그리기
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

const DINO_X = 10;
const DINO_Y = 200;
const DINO_WIDTH = 50;
const DINO_HEIGHT = 50;

// 주인공 이미지
var dinoImg = new Image();
dinoImg.src = './img/dinosaur.png';

// 주인공 역할
var dino = {
    x : DINO_X,
    y : DINO_Y,
    width : DINO_WIDTH,
    height : DINO_HEIGHT,

    draw() { // 그리기
        // Hitbox - CircleCollider
        // ctx.fillStyle = 'green'; // 배경색
        // ctx.beginPath();
        // ctx.arc(this.x+this.width/2, this.y+this.width/2, this.width/2, 0, 2*Math.PI); // 원
        // ctx.fill();

        // 주인공 이미지
        ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);
    }
}

const CACTUS_X = 500;
const CACTUS_Y = 200;
const CACTUS_WIDTH = 50;
const CACTUS_HEIGHT = 50;

// 장애물 이미지
var cactusImg = new Image();
cactusImg.src = './img/cactus.png';

// 장애물 클래스
class Cactus {
    constructor() { // 생성자
        this.x = CACTUS_X;
        this.y = CACTUS_Y;
        this.width = CACTUS_WIDTH;
        this.height = CACTUS_HEIGHT;
    }

    draw() { // 그리기
        // Hitbox - CircleCollider
        // ctx.fillStyle = 'red'; // 배경색
        // ctx.beginPath();
        // ctx.arc(this.x+this.width/2, this.y+this.width/2, this.width/2, 0, 2*Math.PI); // 원
        // ctx.fill();

        // 장애물 이미지
        ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height*this.height/this.width);
    }
}

var timer = 0;
var cactusCycle = 0;
var cycleArray = [];
var cactusArray = [];
var jumpTimer = 0;
var animation;
var score = 0;

ctx.font = "bold 20pt 'consolas'"
ctx.textAlign = "center";
ctx.textBaseline = "middle";

const CACTUS_CYCLE_MAX = 240;
const CACTUS_CYCLE_MIN = 20;
const SCORE_X = 50;
const SCORE_Y = 50;
const GAME_OVER_X = 250;
const GAME_OVER_Y = 100;

// 프레임마다 실행 - 애니메이션 하드 코딩
// c.f. 실제로 게임 개발할 거라면 라이브러리 사용하는 것 추천
function RunFrame() {
    animation = requestAnimationFrame(RunFrame); // 모니터 주사율만큼 실행 (e.g. 144Hz -> 144Fps), 60FPS 로 제한하는 방법은 구글링할 것
    timer++;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
    ctx.fillText(score, SCORE_X, SCORE_Y);

    cactusCycle = Math.floor(Math.random() * (CACTUS_CYCLE_MAX - CACTUS_CYCLE_MIN) + CACTUS_CYCLE_MIN); // 최소 20 ~ 최대 240 정수 난수
    cycleArray.push(cactusCycle);

    if (timer % cactusCycle === 0) { // 프레임마다 실행
        var cactus = new Cactus(); // 장애물 인스턴스 생성
        cactusArray.push(cactus); // array 에 추가
    }

    // array 에 있는 장애물 이동 및 그리기
    cactusArray.forEach((cactus, i, arr)=>{
        // 장애물 x 좌표가 0 미만이면 제거
        if (cactus.x < 0) {
            arr.splice(i, 1); // 배열의 i 인덱스에서 1개 요소 삭제
            cycleArray.splice(i, 1); // 배열의 i 인덱스에서 1개 요소 삭제
            score++; // 점수 증가
        }
        cactus.x--;

        // 주인공 vs 모든 장애물 충돌 체크
        isCircleCollision(dino, cactus);
        
        cactus.draw(); // 장애물 그리기
    })

    // 스페이스바 누르면 점프
    if (jumping == true) {
        dino.y--;
        jumpTimer++;

        // 100 프레임 지나면 점프 중단
        if (jumpTimer > 100) {
            jumping = false;
            jumpTimer = 0;
        }
    } else { // 스페이스바를 떼면 하강
        if (dino.y < 200) {
            jumpingBlock = true
            dino.y++;
        } else {
            jumpingBlock = false
        }
    }

    dino.draw(); // 주인공 그리기
}
RunFrame(); // 프레임마다 실행

// 충돌하면 게임 종료
function isCircleCollision(dino, cactus) {
    var xDiff = cactus.x - dino.x;
    var yDiff = cactus.y - dino.y;
    var radiusDist = cactus.width/2 + dino.width/2;

    // 충돌했는가
    if (Math.sqrt(xDiff**2 + yDiff**2) < radiusDist) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
        ctx.fillText(score, SCORE_X, SCORE_Y); // 점수 표시
        ctx.strokeText('Game Over', GAME_OVER_X, GAME_OVER_Y); // 게임 오버 표시
        cancelAnimationFrame(animation); // 애니메이션 중단
        ctx.Create
    }
}

// 스페이스바 누르면 점핑 트리거 true 설정
var jumping = false;
var jumpingBlock = false;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space' && !jumpingBlock) {
        jumping = true;
    }
});