import { exec } from '@actions/exec'

export async function invalidateCloudFrontID (id = '') {
    await exec(
        `aws cloudfront create-invalidation \
        --distribution-id ${id} \
        --paths /*`
    )
}