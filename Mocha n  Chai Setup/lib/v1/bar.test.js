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
            assert.equal(1,1);
            // console.log("ENV", process.env.NODE_ENV)

            if(process.env.NODE_ENV === 'development'){
                console.log('\n THIS IS DEVELOPMENT MODE \n')
            }
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
