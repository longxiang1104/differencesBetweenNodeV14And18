# new AsyncLocalStorage()#
v18.16.0刪除了實驗性的 onPropagate 選項。

v18.13.0添加傳播選項。

# 靜態方法：AsyncLocalStorage.bind(fn)#
添加於：v18.16.0
穩定性：1 - 實驗性
fn <Function>綁定到當前執行上下文的函數。
返回：<Function>fn在捕獲的執行上下文中調用的新函數。
將給定函數綁定到當前執行上下文。

# 靜態方法：AsyncLocalStorage.snapshot()#
添加於：v18.16.0
穩定性：1 - 實驗性
返回：<Function>具有簽名的新函數 (fn: (...args) : R, ...args) : R。
捕獲當前執行上下文並返回一個接受函數作為參數的函數。每當調用返回的函數時，它都會在捕獲的上下文中調用傳遞給它的函數。
```javascript
const asyncLocalStorage = new AsyncLocalStorage();
const runInAsyncScope = asyncLocalStorage.run(123, () => AsyncLocalStorage.snapshot());
const result = asyncLocalStorage.run(321, () => runInAsyncScope(() => asyncLocalStorage.getStore()));
console.log(result);  // returns 123 複製
AsyncLocalStorage.snapshot() 可以替換 AsyncResource 的使用以實現簡單的異步上下文跟踪目的，例如：

class Foo {
  #runInAsyncScope = AsyncLocalStorage.snapshot();

  get() { return this.#runInAsyncScope(() => asyncLocalStorage.getStore()); }
}

const foo = asyncLocalStorage.run(123, () => new Foo());
console.log(asyncLocalStorage.run(321, () => foo.get())); // returns 123 
```
# AsyncResource
v16.4.0	AsyncResource 現已穩定。此前，它一直是實驗性的。
該類AsyncResource旨在通過嵌入器的異步資源進行擴展。使用此功能，用戶可以輕鬆觸發自己資源的生命週期事件。

當實例化 an 時，該init鉤子將被觸發AsyncResource。

以下是AsyncResourceAPI 的概述。
```javascript

const { AsyncResource, executionAsyncId } = require('node:async_hooks');

// AsyncResource() is meant to be extended. Instantiating a
// new AsyncResource() also triggers init. If triggerAsyncId is omitted then
// async_hook.executionAsyncId() is used.
const asyncResource = new AsyncResource(
  type, { triggerAsyncId: executionAsyncId(), requireManualDestroy: false },
);

// Run a function in the execution context of the resource. This will
// * establish the context of the resource
// * trigger the AsyncHooks before callbacks
// * call the provided function `fn` with the supplied arguments
// * trigger the AsyncHooks after callbacks
// * restore the original execution context
asyncResource.runInAsyncScope(fn, thisArg, ...args);

// Call AsyncHooks destroy callbacks.
asyncResource.emitDestroy();

// Return the unique ID assigned to the AsyncResource instance.
asyncResource.asyncId();

// Return the trigger ID for the AsyncResource instance.

asyncResource.triggerAsyncId();
```
# new AsyncResource(type[, options])#
type <string>異步事件的類型。
options <對象>
triggerAsyncId <number>創建此異步事件的執行上下文的 ID。默認值： executionAsyncId() .
requireManualDestroy <boolean>如果設置為true，則emitDestroy 在對像被垃圾回收時禁用。通常不需要設置（即使emitDestroy手動調用），除非檢索資源並使用它調用asyncId 敏感 API 。emitDestroy當設置為時false，emitDestroy僅當至少有一個活動掛鉤時才會調用垃圾回收destroy。 默認值： false .
用法示例：
```javascript

class DBQuery extends AsyncResource {
  constructor(db) {
    super('DBQuery');
    this.db = db;
  }

  getInfo(query, callback) {
    this.db.get(query, (err, data) => {
      this.runInAsyncScope(callback, null, err, data);
    });
  }

  close() {
    this.db = null;
    this.emitDestroy();
  }
} 
```

# 靜態方法：AsyncResource.bind(fn[, type[, thisArg]])#
版本	變化
v17.8.0	更改了未定義時的默認值以供調用者thisArg使用。this
v16.0.0	添加了可選的 thisArg。

fn <Function>綁定到當前執行上下文的函數。
type <string>與底層 關聯的可選名稱 AsyncResource。
thisArg <任何>
將給定函數綁定到當前執行上下文。

返回的函數將有一個引用該函數所綁定到的asyncResource屬性。AsyncResource

# asyncResource.bind(fn[, thisArg])#
版本	變化
v17.8.0	更改了未定義時的默認值以供調用者thisArg使用。this

v16.0.0	添加了可選的 thisArg。

v14.8.0、v12.19.0	添加於：v14.8.0、v12.19.0
fn <Function>綁定到當前AsyncResource.
thisArg <任何>
將給定函數綁定到 thisAsyncResource的範圍內執行。

返回的函數將有一個引用該函數所綁定到的asyncResource屬性。AsyncResource