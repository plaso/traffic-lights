setTimeout(() => {
    console.log('timeout 0s')
}, 0);

const start = Date.now()
console.log(start)

while (Date.now() - start < 6000) { }

console.log('mas codigo')