import { exec } from "@actions/exec";

export async function syncToS3Bucket({
  localSource,
  s3Bucket
}) {
  await exec(
    `aws s3 sync ${localSource} s3://${s3Bucket}`
  );
}
