const { core } = require('@actions/core')
const { runDeploy } = require('./main')


// most @actions toolkit packages have async methods
async function run() {
  try{
    core.info('Starting upload')
    await runDeploy()
    core.info('Finished upload')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()