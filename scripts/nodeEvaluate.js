const turboDryJson = process.argv[2];
const task = process.argv[3];

const cacheStatus = JSON.parse(turboDryJson.trim()).tasks.find(
  (t) => t.task === task
).cache.status;

console.log(cacheStatus);
