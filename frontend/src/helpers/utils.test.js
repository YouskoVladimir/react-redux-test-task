import { deepEqual } from './utils'

describe('utils test', () => {
  describe('deepEqual', () => {
    describe('simple data types', () => {

      it('should work with numbers', () => {
        expect(deepEqual(1, 1)).eq(true)
        expect(deepEqual(2, 1)).eq(false)
        expect(deepEqual(1, 2)).eq(false)

        expect(deepEqual(1, -1)).eq(false)
        expect(deepEqual(-1, 1)).eq(false)
        expect(deepEqual(-1, -1)).eq(true)

        expect(deepEqual(0.14, 0.14)).eq(true)
        expect(deepEqual(0.14, 0.15)).eq(false)
        expect(deepEqual(0.15, 0.14)).eq(false)

        expect(deepEqual(Infinity, Infinity)).eq(true)
        expect(deepEqual(Infinity, -Infinity)).eq(false)
        expect(deepEqual(-Infinity, Infinity)).eq(false)
        expect(deepEqual(-Infinity, -Infinity)).eq(true)
      })

      it('should work with BigInt', () => {
        expect(deepEqual(1n, 1n)).eq(true)
        expect(deepEqual(1n, 2n)).eq(false)
        expect(deepEqual(2n, 1n)).eq(false)
      })

      it('should recognise NaN', () => {
        expect(deepEqual(NaN, NaN)).eq(true)
      })

      it('should distinguish 0 and -0', () => {
        expect(deepEqual(0, 0)).eq(true)
        expect(deepEqual(0, -0)).eq(false)
        expect(deepEqual(-0, 0)).eq(false)
        expect(deepEqual(-0, -0)).eq(true)
      })

      it('should work with strings', () => {
        expect(deepEqual('test', 'test')).eq(true)
        expect(deepEqual('test', 'test1')).eq(false)
        expect(deepEqual('test1', 'test')).eq(false)
      })

      it('should work with boolean', () => {
        expect(deepEqual(true, true)).eq(true)
        expect(deepEqual(true, false)).eq(false)
        expect(deepEqual(false, true)).eq(false)
      })

      it('should work with undefined', () => {
        expect(deepEqual(undefined, undefined)).eq(true)
      })

      it('should work with null', () => {
        expect(deepEqual(null, null)).eq(true)
      })

    })

    it('should work with mixed data types', () => {
      expect(deepEqual(true, 1)).eq(false)

      expect(deepEqual(false, 0)).eq(false)
      expect(deepEqual(0, false)).eq(false)

      expect(deepEqual(false, '')).eq(false)
      expect(deepEqual('', false)).eq(false)

      expect(deepEqual(true, [])).eq(false)
      expect(deepEqual(false, [])).eq(false)

      expect(deepEqual(false, null)).eq(false)
      expect(deepEqual(null, false)).eq(false)

      expect(deepEqual(false, undefined)).eq(false)
      expect(deepEqual(undefined, false)).eq(false)
    })

    describe('objects', () => {

      it('should compare objects deeply', () => {
        expect(deepEqual({}, {})).eq(true)
        expect(deepEqual({ a: 1 }, { a: 1 })).eq(true)
        expect(deepEqual({ a: 2 }, { a: 1 })).eq(false)

        expect(deepEqual({ a: {} }, { a: {} })).eq(true)
        expect(deepEqual({ a: {} }, {})).eq(false)

        expect(deepEqual({ a: {}, b: [1, 2, 3] }, { a: {}, b: [1, 2, 3] })).eq(true)
        expect(deepEqual({ a: {}, b: [1, 2, 3] }, { a: {}, b: [1, 2, 3, 4] })).eq(false)

        expect(deepEqual({ a: {}, b: [1, 2, { b: 1 }] }, { a: {}, b: [1, 2, { b: 1 }] })).eq(true)
        expect(deepEqual({ a: {}, b: [1, 2, { b: 1 }] }, { a: {}, b: [1, { b: 1 }, 2] })).eq(false)
        expect(deepEqual({ a: {}, b: [1, 2, { b: 1 }] }, { a: {}, b: [1, 2, { b: 2 }] })).eq(false)
      })

      it('should compare arrays deeply', () => {
        expect(deepEqual([1, 2, 3], [1, 2, 3])).eq(true)
        expect(deepEqual([1, 2, 3], [1, 2, 3, 4])).eq(false)

        expect(deepEqual([1, 2, { b: 1 }], [1, 2, { b: 1 }])).eq(true)
        expect(deepEqual([1, 2, { b: 1 }], [1, { b: 1 }, 2])).eq(false)
        expect(deepEqual([1, 2, { b: 1 }], [1, 2, { b: 2 }])).eq(false)
      })
    })

  })
})
