# Upload any static site to AWS S3

> Uploads a build/ folder for static site to S3 bucket

![units-test](https://github.com/and-cru/actions-s3-static-upload/workflows/units-test/badge.svg?branch=master)
[![GitHub license](https://img.shields.io/github/license/and-cru/actions-s3-static-upload.svg)](https://github.com/and-cru/actions-s3-static-upload/blob/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/and-cru/actions-s3-static-upload.svg)](https://github.com/and-cru/actions-s3-static-upload/tags/)

## Usage

Example usage below

```yaml
uses: and-cru/actions-s3-static-upload@v12
with:
  milliseconds: 500
  s3-bucket-name: <s3-bucket>
```