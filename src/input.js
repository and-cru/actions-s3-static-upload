import {getInput} from '@actions/core'

export function getIntInput(name = '') {
    const stringValue = getInput(name)

    const intValue = parseInt(stringValue, 10)

    if (Number.isNaN(intValue)) {
        throw new RangeError(`Invalid '${name}': ${stringValue}`)
    }

    return intValue
}