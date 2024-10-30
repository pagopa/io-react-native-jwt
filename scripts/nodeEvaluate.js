const turboDryJson = process.argv[2];

const cacheStatus = JSON.parse(turboDryJson.trim()).tasks.find(
  (t) => t.task === 'build:android'
).cache.status;

console.log(cacheStatus);
