const {core} = require('@actions/core')
const {syncToS3Bucket} = require('./aws/s3')

async function deploy() {
    await syncToS3Bucket({
        localSource: './build/',
        s3Bucket: core.getInput('s3-bucket-name', {required: true})
    })
}

async function runDeploy() {
    try {
        await deploy()
    } catch (error) {
        core.setFailed(error.message)
    }
}

module.exports = {
    runDeploy
}