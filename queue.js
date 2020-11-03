setTimeout(function() {
    console.log("macrotask");
}, 0);
Promise.resolve("microtask").then(console.log);