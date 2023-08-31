# dns.lookup(hostname[, options], callback)
v18.4.0	為了兼容node:net，當傳遞選項對象時，family選項可以是字符串'IPv4'或字符串'IPv6'。
v18.0.0	callback現在，將無效回調傳遞給參數會拋出異常，ERR_INVALID_ARG_TYPE而不是ERR_INVALID_CALLBACK.
v17.0.0	選項verbatim默認為true現在。
```javascript
const dns = require('node:dns');
const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
dns.lookup('example.com', options, (err, address, family) =>
  console.log('address: %j family: IPv%s', address, family));
// address: "2606:2800:220:1:248:1893:25c8:1946" family: IPv6

// When options.all is true, the result will be an Array.
options.all = true;
dns.lookup('example.com', options, (err, addresses) =>
  console.log('addresses: %j', addresses));
// addresses: [{"address":"2606:2800:220:1:248:1893:25c8:1946","family":6}] 
```
# dns.lookupService(address, port, callback)
v18.0.0	callback現在，將無效回調傳遞給參數會拋出異常，ERR_INVALID_ARG_TYPE而不是ERR_INVALID_CALLBACK.
```javascript
const dns = require('node:dns');
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
  console.log(hostname, service);
  // Prints: localhost ssh
})
```
# dns.resolveAny(hostname, callback)
v18.0.0	callback現在，將無效回調傳遞給參數會拋出異常，ERR_INVALID_ARG_TYPE而不是ERR_INVALID_CALLBACK.