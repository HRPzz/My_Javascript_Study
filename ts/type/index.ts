// 변수 타입 지정 가능
let 이름 :string = 'kim'; // string 만 가능
let 이름2 :string[] = ['kim', 'park']; // string 담긴 array 만 가능
let 이름3 :{ name? : string } = { name : 'kim'}; // name 속성은 옵션, string 만 가능
let 이름4 :string | number = 'kim'; // string 또는 number 가능 => Union type

// Type alias: 타입을 변수에 담아 쓸 수 있음
type Name = string | number;
let 이름5 :Name = 123;

// 함수에 타입 지정 가능
// 파라미터 number, 반환값 number 설정
function 함수(x :number) :number {
    return x * 2;
}

// array 에 쓸 수 있는 tuple 타입
type Member1 = [number, boolean]; // 무조건 처음 number, 두번째는 boolean 값이어야 함
let john1: Member1 = [123, true];

// object 에 타입 지정해야 할 속성이 많을 경우
type Member2 = {
    [key :string] :string, // 글자로 된 모든 object 속성 타입은 string 이어야 함
}
let john2: Member2 = { name : 'kim', age : '123' };

// class 타입 지정 가능
class User {
    name :string;
    constructor(name :string) {
        this.name = name;
    }
}