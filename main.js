const core = require('@actions/core')
const exec = require('@actions/exec')
const path = require('path')

async function deploy() {
    const folder = core.getInput('folder')
    const s3Bucket = core.getInput('s3-bucket-name')
    const localSource = path.resolve(folder)

    try {
        await exec.exec(`aws s3 sync ${localSource} s3://${s3Bucket} --delete --cache-control 'public, no-store, max-age=0'`, [])
        await exec.exec(`aws s3 cp s3://${s3Bucket}/static s3://${s3Bucket}/static --metadata-directive REPLACE --cache-control 'public, max-age=31536000, immutable' --acl public-read`, []) 
    } catch(error) {
        core.setFailed('Error with upload')
    }
}

async function runDeploy() {
    try {
        await deploy()
    } catch (error) {
        core.setFailed('Error with deploy')
    }
}

async function wait (milliseconds) {
    return new Promise((resolve, reject) => {
      if (typeof(milliseconds) !== 'number') { 
        throw new Error('milleseconds not a number'); 
      }
  
      setTimeout(() => resolve("done!"), milliseconds)
    });
}

module.exports = {
    runDeploy,
    wait
}