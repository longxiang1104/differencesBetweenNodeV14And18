const { setTimeout } = require('timers/promises');

const node16 = {
  settimeout: async function () {
    await setTimeout(2000);
    console.log('Runs after 2 seconds');
  },

  sss: function () {
    let aa = { bb: "example" };  // 定義一個具有bb屬性的對象
    let c = aa?.bb;  // 使用選擇性鍊接來獲取bb屬性
    console.log(c);  // 這將打印 "example"
  }
};

module.exports = node16;