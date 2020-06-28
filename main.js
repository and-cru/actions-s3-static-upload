const core = require('@actions/core')

async function deploy() {
    const localSource = './build/'
    const s3Bucket = core.getInput('s3-bucket-name')


    try {
        await exec(
            `aws s3 sync ${localSource} s3://${s3Bucket} --delete`
        );
    } catch (error) {
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