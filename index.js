const core = require('@actions/core')
const { runDeploy, wait } = require('./main')

async function run() {
  try{
    await wait(500)
    core.info('Starting upload')
    await runDeploy()
    core.info('Finished upload')
  } catch (error) {
    core.setFailed('Error with workflow')
  }
}

run()