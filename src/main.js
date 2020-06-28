import { getInput, setFailed } from '@actions/core'
import {syncToS3Bucket} from './aws/s3'

async function deploy() {
    await syncToS3Bucket({
        localSource: './build/',
        s3Bucket: getInput('s3-bucket-name', {required: true})
    })
}

export async function runDeploy() {
    try {
        await deploy()
    } catch (error) {
        setFailed(error.message)
    }
}