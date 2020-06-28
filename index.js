const { getInput, info, setFailed } = require('@actions/core')
const { wait } = require('./wait')
const { runDeploy } = require('./src/main')


// most @actions toolkit packages have async methods
async function run() {
  try{
    const ms = getInput('milliseconds')
    await wait(ms)
    info('Starting upload')
    await runDeploy()
    info('Finished upload')
  } catch (error) {
    setFailed(error.message)
  }
}

run()