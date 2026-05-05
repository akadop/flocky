import { sleep } from '../sleep/sleep'
import { expectApproximateDuration } from '../testHelpers'
import { promiseTimeout } from './promiseTimeout'

async function promiseWithDuration<T>(value: T, duration: number): Promise<T> {
  await sleep(duration)
  return value
}

describe('promiseTimeout', () => {
  test('runs the promise without hitting the timeout (resolve)', async () => {
    const start = new Date()
    const result = await promiseTimeout(promiseWithDuration({ foo: 'bar' }, 100), 30_000)
    const end = new Date()

    expect(result).toEqual({ foo: 'bar' })
    expectApproximateDuration(start, end, 100)

    // The return type has this property
    result.foo.toString()

    // @ts-expect-error The return type does not have this property
    expect(result.bar).toBeUndefined()
  })

  test('runs the promise without hitting the timeout (reject)', async () => {
    let error: unknown

    const start = new Date()
    try {
      await promiseTimeout(
        new Promise<void>(async (_, reject) => {
          await sleep(100)
          reject('Oh no')
        }),
        30_000
      )
    } catch (err) {
      error = err
    }
    const end = new Date()

    expect(error).toEqual('Oh no')
    expectApproximateDuration(start, end, 100)
  })

  test('rejects the promise when hitting the timeout', async () => {
    let error: Error | undefined

    const start = new Date()
    try {
      await promiseTimeout(promiseWithDuration('foo', 200), 100)
    } catch (err) {
      if (!(err instanceof Error)) throw err
      error = err
    }
    const end = new Date()

    expect(error?.message).toEqual('Promise timed out')
    expectApproximateDuration(start, end, 100)
  })
})
