// 변수 타입 지정 가능
var 이름 = 'kim'; // string 만 가능
var 이름2 = ['kim', 'park']; // string 담긴 array 만 가능
var 이름3 = { name: 'kim' }; // name 속성은 옵션, string 만 가능
var 이름4 = 'kim'; // string 또는 number 가능 => Union type
var 이름5 = 123;
// 함수에 타입 지정 가능
// 파라미터 number, 반환값 number 설정
function 함수(x) {
    return x * 2;
}
var john1 = [123, true];
var john2 = { name: 'kim', age: '123' };
// class 타입 지정 가능
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    return User;
}());
