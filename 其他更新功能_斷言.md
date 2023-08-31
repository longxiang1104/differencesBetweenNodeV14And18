

# tracker.getCalls(fn)#
## Added in: v18.8.0
Returns: <Array> with all the calls to a tracked function.
 Object <Object>
 thisArg <Object>
 arguments <Array> the arguments passed to the tracked function
 
```javascript

fn < Function >.

 const assert = require('node:assert');

          // Creates call tracker.
          const tracker = new assert.CallTracker();

          function func() { }
          const callsfunc = tracker.calls(func);
          callsfunc(1, 2, 3);

          assert.deepStrictEqual(tracker.getCalls(callsfunc),
          [{thisArg: undefined, arguments: [1, 2, 3] }]);
```

# tracker.reset([fn])#
## Added in: v18.8.0
```javascript

          fn <Function> a tracked function to reset.
            Reset calls of the call tracker. If a tracked function is passed as an argument, the calls will be reset for it. If no arguments are passed, all tracked functions will be reset

            import assert from 'node:assert';

            const tracker = new assert.CallTracker();

            function func() { }
            const callsfunc = tracker.calls(func);

            callsfunc();
            // Tracker was called once
            assert.strictEqual(tracker.getCalls(callsfunc).length, 1);

            tracker.reset(callsfunc);
            assert.strictEqual(tracker.getCalls(callsfunc).length, 0);
```

# assert.deepEqual(actual, expected[, message])
版本	變化
v18.0.0	
現在也比較正則表達式的lastIndex屬性。

v16.0.0、v14.18.0	
在舊版斷言模式下，狀態從“已棄用”更改為“舊版”。

v14.0.0	
如果兩邊都是 NaN，NaN 現在被視為相同。


嚴格斷言模式的別名assert.deepStrictEqual()。


# assert.deepStrictEqual(actual, expected[, message])#
版本	變化
v18.0.0	
現在也比較正則表達式的lastIndex屬性。

v9.0.0	
現在比較可枚舉符號屬性。


