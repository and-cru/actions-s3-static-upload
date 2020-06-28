const core = require('@actions/core')
const { runDeploy } = require('./main')
const { wait } = require('./wait')


// most @actions toolkit packages have async methods
async function run() {
  try{
    await wait(500)
    core.info('Starting upload')
    await runDeploy()
    core.info('Finished upload')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()