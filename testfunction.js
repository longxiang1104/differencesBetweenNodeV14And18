const { setTimeout } = require('timers/promises');

const testFUN = async function run() {
  await setTimeout(2000);
  console.log('Runs after 2 seconds');
}

testFUN();

module.exports =  testFUN