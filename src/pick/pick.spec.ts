import { pick } from './pick'

describe('pick', () => {
  it('picks the specified keys of the object', () => {
    const original = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const picked = pick(original, ['a', 'b', 'd'])

    expect(original).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    expect(picked).toEqual({ a: 1, b: 2, d: 4 })
  })

  it('has the correct type behavior', () => {
    interface StackProps {
      children: string
      gap: string
    }

    function pickFromProps(props: StackProps) {
      return pick(props, ['gap'])
    }

    expect(pickFromProps({ children: 'foo', gap: 'bar' })).toEqual({ gap: 'bar' })
  })
})
