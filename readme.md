# Node.js：從 16 到 18 版本的重要更新

## Node.js 16 主要特點

### 1. V8 9.0
Node.js 16 使 V8 引擎升級到了 9.0 版本，這意味著更好的性能以及新的 JavaScript 語言特性。

### 2. 

### 3. 新的定時器 API
此版本引入了 timers/promises API，它允許使用 Promise 而不是回調來工作。

```javascript
import { setTimeout } from 'timers/promises';

async function run() {
  await setTimeout(2000);
  console.log('Runs after 2 seconds');
}

run();

## 4. 更強的安全性
Node.js 16 強化了其內建的安全機制，提供了更多的安全選項和設置。


# Node.js 17 主要更新

## 1. Promises & Timers
Node.js 17 提供了與 Promises 相關的 timers，例如 `setTimeout`, `setInterval`, 和 `setImmediate`。


```javascript
import { setTimeout } from 'node:timers/promises';

async function example() {
  await setTimeout(3000);
  console.log('Hello after 3 seconds');
}

example();


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








### Node.js 18

``markdown

# Node.js 18 重大更新

## 1. V8 引擎的新Array方法

```javascript
let numbers = [1, 2, 3, 4, 5, 3];

let lastThree = numbers.findLast(num => num === 3); 
let lastThreeIndex = numbers.findLastIndex(num => num === 3); 
2. 內置測試運行器

import assert from "assert";
import test from "node:test";

test("Concatenate user's full name", (t) => {
  const user = new User("John", "Doe");
  assert.strictEqual(user.fullName(), "John Doe");
});
3. 新的 fetch API

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

# 其他更新功能