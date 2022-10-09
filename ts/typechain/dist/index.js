"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
// 블록 구조
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
// static method - 클래스 인스턴스가 생성되지 않아도 호출 가능한 메서드
// c.f. 굳이 클래스 안에 선언 안 해도 되지만 공부 용도로 선언함
Block.calculateBlockHash = (index, previousHash, timstamp, data) => CryptoJS.SHA256(index + previousHash + timstamp + data).toString();
// 블록 유효성 검사
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";
// 첫 번째 블록 생성
const genesisBlock = new Block(0, "2020202020202", "", "Hello", 123456);
// 블록체인에 첫 번째로 생성한 블록 추가
// c.f. 블록체인 = 블록의 연결
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
// 블록 생성 함수
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimestamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock); // 새로 만든 블록을 블록체인에 추가
    return newBlock;
};
// 블록 해시 검증 함수 - 블록 유효성 검증 용도
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
// 블록 유효성 검증 함수
// c.f. 블록체인 - 블록들이 자신의 전 블록으로의 링크 존재
const isBlockVaild = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false; // 유효하지 않으면 false
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false; // 새로운 블록 인덱스가 이전 블록 인덱스 + 1 와 다르면 false
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false; // 새로운 블록 이전 해시값과 이전 블록 해시값이 다르면 false
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false; // 계산한 해시값과 다른 해시값을 가진다면 false
    }
    else {
        return true;
    }
};
// 블록체인에 새로운 블록 추가하는 함수
const addBlock = (candidateBlock) => {
    if (isBlockVaild(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
// 블록 만들고 블록체인에 제대로 추가됐는지 확인하기
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map