import {getInput, setFailed} from '@actions/core'
import {getIntInput} from './input'
import {syncToS3Bucket} from './aws/s3'

async function deploy() {
    await syncToS3Bucket({
        localSource: getInput('build-directory', {required: true}),
        s3Bucket: getInput('s3-bucket-name', {required: true}),
        filesNotToBrowserCache: ['*.html'],
        browserCacheDuration: getIntInput('browser-cache-duration'),
        cdnCacheDuration: getIntInput('cdn-cache-duration')
    })
}

deploy().catch(error => {
    setFailed(error.message)
})