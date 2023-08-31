# new buffer.Blob([sources[, options]])
v16.7.0	添加了標準endings選項來替換行結尾，並刪除了非標準encoding選項。

# blob.arrayBuffer()#
添加於：v15.7.0、v14.18.0
返回：<承諾>返回一個承諾，該承諾通過包含數據副本的<ArrayBuffer>來實現Blob。

# blob.size#
添加於：v15.7.0、v14.18.0總大小（以字節為Blob單位）。

# blob.slice([start[, end[, type]]])#
添加於：v15.7.0、v14.18.0
start <number>起始索引。
end <number>結束索引。
type <string>新內容的內容類型Blob
創建並返回一個Blob包含該Blob對像數據子集的新對象。原件Blob沒有改動。

# blob.stream()#
添加於：v16.7.0返回：<可讀流> 返回一個允許讀取ReadableStream內容的新值。Blob

# blob.text()#
添加於：v15.7.0、v14.18.0  返回：<承諾> 返回一個承諾，該承諾將解碼為 UTF-8 字符串的內容實現Blob。

# blob.type#
添加於：v15.7.0、v14.18.0 類型：<字符串>的內容類型Blob。

# 靜態方法：1. Buffer.allocUnsafeSlow(size)#  2. Buffer.alloc(size[, fill[, encoding]])#  3. Buffer.allocUnsafe(size)#
v20.0.0	對於無效的輸入參數，拋出 ERR_INVALID_ARG_TYPE 或 ERR_OUT_OF_RANGE 而不是 ERR_INVALID_ARG_VALUE。
v15.0.0	對於無效的輸入參數，拋出 ERR_INVALID_ARG_VALUE 而不是 ERR_INVALID_OPT_VALUE。
# 靜態方法：Buffer.copyBytesFrom(view[, offset[, length]])#
添加於：v18.16.0
view <TypedArray>要復制的<TypedArray> 。
offset <integer>中的起始偏移量view。默認值： : 0。
length <integer>要復制的元素數量view。 默認值： view.length - offset .
將 的底層內存複製view到新的Buffer.
```javascript
const u16 = new Uint16Array([0, 0xffff]);
const buf = Buffer.copyBytesFrom(u16, 1, 1);
u16[1] = 0;
console.log(buf.length); // 2
console.log(buf[0]); // 255
console.log(buf[1]); // 255 
```
# buf.slice([start[, end]])#
v17.5.0	buf.slice() 方法已被棄用。
# new buffer.File(sources, fileName[, options])#
添加於：v18.13.0
sources <字符串[]> | <數組緩衝區[]> | <TypedArray[]> | <數據視圖[]> | <斑點[]> | < File [ ] >將存儲在. _ _ _ _File
fileName <字符串>文件的名稱。
options <對象>
endings <字符串>'transparent'或之一'native'。當設置為 時'native'，字符串源部分中的行結束符將轉換為 指定的平臺本機行結束符require('node:os').EOL。
type <string>文件內容類型。
lastModified <number>文件的最後修改日期。 默認值： Date.now() .
# file.name#
添加於：v18.13.0類型：<字符串>的名稱File。

# node:buffer模塊API#
雖然該Buffer對象可作為全局對象使用，但還有其他 Buffer相關 API 只能通過node:buffer使用require('node:buffer').

# buffer.atob(data)#
添加於：v15.13.0、v14.17.0
Buffer.from(data, 'base64')代替使用。
# buffer.btoa(data)#
添加於：v15.13.0、v14.17.0
# buffer.isAscii(input)#
添加於：v18.15.0
# buffer.isUtf8(input)#
添加於：v18.14.0