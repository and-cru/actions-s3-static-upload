const { exec } = require("@actions/exec");

async function syncToS3Bucket({
  localSource,
  s3Bucket
}) {
  await exec(
    `aws s3 sync ${localSource} s3://${s3Bucket} --delete`
  );
}

module.exports = {
  syncToS3Bucket
}
