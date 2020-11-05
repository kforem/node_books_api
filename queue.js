setImmediate(function () {
  console.log("immediate, really?");
});
setTimeout(function () {
  console.log("macrotask");
}, 0);
Promise.resolve("microtask").then(console.log);
process.nextTick(function () {
  console.log("nextTick");
});
