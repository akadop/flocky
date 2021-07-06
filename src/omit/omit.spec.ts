import { omit } from './omit'

describe('omit', () => {
  it('omits the specified keys of the object', () => {
    const original = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const omitted = omit(original, ['a', 'b', 'd'])

    expect(original).toEqual({ a: 1, b: 2, c: 3, d: 4, e: 5 })
    expect(omitted).toEqual({ c: 3, e: 5 })
  })

  it('has the correct type behavior', () => {
    interface StackProps {
      children: string
      gap: string
    }

    function omitFromProps(props: StackProps) {
      return omit(props, ['gap'])
    }

    expect(omitFromProps({ children: 'foo', gap: 'bar' })).toEqual({ children: 'foo' })
  })
})
