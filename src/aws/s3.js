import { exec } from "@actions/exec";

export async function syncToS3Bucket({
  localSource,
  s3Bucket,
  filesNotToBrowserCache,
  browserCacheDuration,
  cdnCacheDuration
}) {
  await syncEverythingWithBrowserCaching(
    localSource,
    s3Bucket,
    browserCacheDuration,
    cdnCacheDuration
  );

  await setNoBrowserCaching(s3Bucket, filesNotToBrowserCache, cdnCacheDuration);
}

async function syncEverythingWithBrowserCaching(
  source = "",
  s3Bucket = "",
  browserCacheDuration = 0,
  cdnCacheDuration = 0
) {
  const browserCachingHeader = getCacheControlHeader(
    browserCacheDuration,
    cdnCacheDuration
  );

  await exec(
    `aws s3 sync ${source} s3://${s3Bucket} \
        --delete \
        --cache-control "${browserCachingHeader}"`
  );
}

async function setNoBrowserCaching(
  s3Bucket = "",
  filePatterns = [],
  cdnCacheDuration = 0
) {
  const noBrowserCachingHeader = getCacheControlHeader(0, cdnCacheDuration);

  await exec(
    `aws s3 cp s3://${s3Bucket} s3://${s3Bucket} \
        --exclude "*" \
        ${filePatterns.map(pattern => `--include "${pattern}"`).join(" ")}
        --recursive \
        --metadata-directive REPLACE \
        --cache-control "${noBrowserCachingHeader}"`
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
