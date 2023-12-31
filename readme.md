# Node.js：從 15 到 18 版本的重要更新

## Node.js 15 更新功能

### 1.  AbortController
Node.js 15 提供了 AbortController 的實驗性實現，該功能允許在特定基於 Promise 的 API 中信號取消。
```javascript
const ac = new AbortController();
ac.signal.addEventListener('abort', () => console.log('Aborted!'), { once: true });
ac.abort();
console.log(ac.signal.aborted);  // Prints True
```
### 2.  N-API Version 7
新的 N-API 版本反向移植到其他 LTS Node.js 版本，自上一次主要發布以來，N-API 7 是新的，並帶來了用於操作 ArrayBuffers 的附加方法。
### 3. npm 7
Node.js 15 隨附 npm 的新主要發布版本，npm 7。npm 7 帶有許多新功能，包括 npm 工作空間和新的 package-lock.json 格式。npm 7 還支持 yarn.lock 文件。npm 7 中的一個重大變化是現在默認安裝對等依賴項。

### 4. Throw on unhandled rejections
從 Node.js 15 開始，unhandledRejection 的默認模式已更改為拋出（從警告）。在拋出模式中，如果未設置 unhandledRejection 鉤子，則會將 unhandledRejection 作為未捕獲的異常引發。
### 5. QUIC (實驗性)
QUIC 是一種基於 UDP 的新傳輸協議，它是 HTTP/3 的底層傳輸協議。Node.js 15 附帶了可以通過編譯 Node.js 與 --experimental-quic 配置標誌來啟用的實驗性支持 QUIC。
```javascript
const { createQuicSocket } = require('net');
```
### 6. V8 8.6
V8 JavaScript 引擎已更新到 V8 8.6（V8 8.4 是 Node.js 14 中可用的最新版本）。除了性能調整和改進外，V8 更新還帶來了以下語言功能：

#### Promise.any() (node14.11以後 ，V8.5引擎已支持)
Promise.any() 接收一個 Promise 對象的迭代器作為參數，並返回一個新的 Promise。它只要迭代器中的其中一個 promise 解析，就會解析;如果所有 promises 都拒絕，則返回一個 AggregateError。
```javascript
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));
const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value)); // "quick"
```
#### AggregateError(node14.11以後， V8.5引擎已支持)
AggregateError 用於表示多個錯誤，當Promise.any()中所有 promises 都拒絕時會被拋出。
```javascript
const err = new AggregateError(['Some error occurred', 'Another error'], 'Main Error');

console.log(err instanceof AggregateError); // true
console.log(err.message); // "Main Error"
```
#### String.prototype.replaceAll()(node14.11以後， V8.5引擎已支持)
這個方法返回一個由替換值替換一些或所有匹配的模式後得到的新字符串。不會改變原始字符串。
```javascript
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replaceAll('dog', 'monkey'));
// "The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?"

```
#### 邏輯賦值運算符 &&=, ||=, 和 ??= (node14.11以後 ，V8.5引擎已支持)
這些運算符結合了邏輯操作和賦值操作。

&&=: 如果左操作數為false，則跳過賦值。
||=: 如果左操作數為true，則跳過賦值。
??=: 如果左操作數為null或undefined，則進行賦值。
```javascript
let a = 1;
let b = null;
let c;

a &&= 2; // a = 2
b ||= 2; // b = 2
c ??= 3; // c = 3

console.log(a, b, c); // 2, 2, 3
```

## Node.js 16 主要特點

### 1. V8 9.0
Node.js 16 使 V8 引擎升級到了 9.0 版本，這意味著更好的性能以及新的 JavaScript 語言特性。

### 2. 更強的安全性
Node.js 16 強化了其內建的安全機制，提供了更多的安全選項和設置。

### 3. 新的定時器 API
此版本引入了 timers/promises API，它允許使用 Promise 而不是回調來工作。

```javascript
import { setTimeout } from 'timers/promises';

async function run() {
  await setTimeout(2000);
  console.log('Runs after 2 seconds');
}

run();
```


## Node.js 17 主要更新

### 1. Promises & Timers
Node.js 17 提供了與 Promises 相關的 timers，例如 `setTimeout`, `setInterval`, 和 `setImmediate`。


```javascript
import { setTimeout } from 'node:timers/promises';

async function example() {
  await setTimeout(3000);
  console.log('Hello after 3 seconds');
}

example();
```

### 2. 新的 Error 類型
此版本引入了 AbortError，它是一個特殊的錯誤類型，通常與 AbortController 一起使用。

```javascript
import { AbortController } from 'node:events';

const controller = new AbortController();
const { signal } = controller;

setTimeout(() => controller.abort(), 1000);

doSomethingAsync({ signal }).catch(e => {
  if (e.name === 'AbortError') {
    cleanup();
  }
});
```



## Node.js 18 重大更新

### 1. V8 引擎的新Array方法

```javascript
let numbers = [1, 2, 3, 4, 5, 3];

let lastThree = numbers.findLast(num => num === 3); //3
let lastThreeIndex = numbers.findLastIndex(num => num === 3); //5
```
### 2. 內置測試運行器
```javascript
//自行定義一個user舉例
// class User {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   fullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }
const assert = require("assert");
const test = require("node:test");

test("Concatenate user's full name", (t) => {
  const user = new User("John", "Doe");
  assert.strictEqual(user.fullName(), "John Doe");
});//✔ Concatenate user's full name (0.9191ms)
```
### 3. 新的 fetch API

```javascript
const data = {
  nameFirst: "John",
  nameLast: "Doe",
};

try {
  const response = await fetch("https://example.org/user", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const responseJson = await response.json();
  console.log(`Response data: ${responseJson}`);
} catch (error) {
  console.error(error);
}
```
# 其他更新功能
詳見
其他更新功能_分類