const assert = require('assert')

describe('File to be tested', ()=>{
    context("Function to be tested", ()=>{

        before(()=>{
            console.log("--------- BEFORE ----------")
        })
        after(()=>{
            console.log("--------- AFTER ----------")
        })

        beforeEach(()=>{
            console.log("--------- beforeEach ----------")

        })

        afterEach(()=>{
            console.log("--------- afterEach ----------")

        })

        it("Should do something", ()=>{
            assert.equal(1,1)
        });

        it("Should do something else", ()=>{
            assert.deepEqual({name:"Joe"}, {name:"Joe"})
        })

        it("This is pending test")

    })

    context('Another function', ()=>{
            it('Should do something')
        }
    )
})
