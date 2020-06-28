import { getInput, info, setFailed } from '@actions/core'
import { wait } from './wait'
import { runDeploy } from './src/main'


// most @actions toolkit packages have async methods
async function run() {
  try{
    const ms = getInput('milliseconds')
    await wait(ms)
    info('Starting upload')
    await runDeploy()
    core.info('Finished upload')
  } catch (error) {
    setFailed(error.message)
  }
}

run()