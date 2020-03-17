import { exec } from "@actions/exec";

export async function syncToS3Bucket({
  localSource,
  s3Bucket,
  browserCacheDuration,
  cdnCacheDuration
}) {
  await syncEverythingWithBrowserCaching(
    localSource,
    s3Bucket,
    browserCacheDuration,
    cdnCacheDuration
  );
}

async function syncEverythingWithBrowserCaching(
  source = "",
  s3Bucket = ""
) {
  await exec(
    `aws s3 sync ${source} s3://${s3Bucket}`
  );
}

export function getCacheControlHeader(
  browserCacheDuration = 0,
  cdnCacheDuration = 0
) {
  let header = "";

  if (browserCacheDuration > 0) {
    header += `public, max-age=${browserCacheDuration}, immutable`;
  } else {
    header += "public, max-age=0, must-revalidate";
  }

  header += `, s-maxage=${cdnCacheDuration}`;

  return header;
}
