import { assert } from 'chai'

import { describe, it } from 'mocha'
import { REGEXP } from '../../src/lib/colors/strategies/browser-strategy'
import { regex_exec } from '../test-util'

// Defines a Mocha test suite to group tests of similar kind together
describe('Test browser predefined color Regex', () => {
   it('white should match', () => {
      assert.equal(regex_exec(' white', REGEXP)[1], 'white')
      assert.equal(regex_exec(',white', REGEXP)[1], 'white')
      assert.equal(regex_exec('(white', REGEXP)[1], 'white')
      assert.equal(regex_exec(':white', REGEXP)[1], 'white')
      assert.equal(regex_exec('"white"', REGEXP)[1], 'white')
      // eslint-disable-next-line
    assert.equal(regex_exec("'white'", REGEXP)[1], 'white');
   })
   it('Should not match without a valid char before', () => {
      assert.isNull(regex_exec('awhite', REGEXP))
      assert.isNull(regex_exec('-white', REGEXP))
      assert.isNull(regex_exec('$white', REGEXP))
   })

   it('Should match with different characters at the end', () => {
      assert.equal(regex_exec(' white', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white ', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white,', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white;', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white\n', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white)', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white}', REGEXP)[1], 'white')
      assert.equal(regex_exec(' white<', REGEXP)[1], 'white')
   })
   it('Should not match', () => {
      assert.isNull(regex_exec('white-', REGEXP))
      assert.isNull(regex_exec('-white', REGEXP))
   })
})
