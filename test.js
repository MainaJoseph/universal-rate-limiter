const { createRateLimiter } = require("./dist");

async function run() {
  const limiter = createRateLimiter({
    key: "test-user",
    max: 5,
    window: "35s",
  });

  console.log(await limiter.check());
}

run();
