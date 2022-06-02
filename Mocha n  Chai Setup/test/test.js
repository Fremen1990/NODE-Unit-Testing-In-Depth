const assert = require('assert')

describe('File to be tested', ()=>{
	context("Function to be tested", ()=>{
		it("Should do something", ()=>{
			assert.equal(1,1)
		});

		it("Should do something else", ()=>{
			assert.deepEqual({name:"Joe"}, {name:"Joe"})
		})

		it("This is pending test")

	})
})
