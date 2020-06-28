const core = require('@actions/core')
const wait = require('./wait')
const runDeploy = require('./src/main')


// most @actions toolkit packages have async methods
async function run() {
  try{
    const ms = core.getInput('milliseconds')
    await wait(ms)
    core.info('Starting upload')
    await runDeploy()
    core.info('Finished upload')
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()