const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
chai.use(sinonChai);
const rewire = require('rewire')

var demo = rewire('./demo');

describe('demo', () => {
    context('add', () => {
        it('Should add two numbers', () => {
            expect(demo.add(1, 2)).to.equal(3)
            expect(demo.add(1, 2)).to.not.equal(5)
        })
    })

    context("Callback add", () => {
        it("Should test the callback", (done) => {
            demo.addCallback(1, 2, (err, result) => {
                expect(err).to.not.exist;
                expect(result).to.equal(3);
                done();
            })
        })
    })

    context("Test promise", () => {
        it("Should add with a promise cb", (done) => {
            demo.addPromise(1, 2).then((result) => {
                expect(result).to.equal(3);
                done();
            }).catch((ex) => {
                console.log("Caught error")
                done(ex)
            })
        })

        it("Should test a promise with return", () => {
            return demo.addPromise(1, 2).then((result) => {
                expect(result).to.equal(3)
            })
        })
    })

    context('Test async await', () => {
        it('Should test promise with async await', async () => {
            let result = await demo.addPromise(1, 2);

            expect(result).to.equal(3)
            expect(result).to.not.equal(4)
        })

        it('Should test promise with chai-as-promised', async ()=>{
            await expect(demo.addPromise(1,2)).to.eventually.equal(3)
            await expect(demo.addPromise(1,2)).to.eventually.not.equal(5)
        })
    })

    context("Test doubles with Sinon", ()=>{
        it("Should spy on log", ()=>{
            let spy = sinon.spy(console, 'log');
            demo.foo();

            // with sinon library
            expect(spy.calledOnce).to.be.true;

            //with sinon-chai library syntax
            expect(spy).to.have.been.calledOnce;

            spy.restore();
        })

        it("Should stub console.warn", ()=>{
            let stub = sinon.stub(console, 'warn').callsFake(()=>{
                console.log("Message from STUB!")
            });

            demo.foo();
            expect(stub).to.have.been.calledOnce;
            expect(stub).to.have.been.calledWith('console.warn was called');
            stub.restore()
        })
    })

    context("Stub private function with revire", ()=>{
        it("Should stub createFile", async ()=>{
            let createStub = sinon.stub(demo, 'createFile').resolves('create_stub')
            let callStub = sinon.stub().resolves('calldb_stub');

            demo.__set__('callDB', callStub)

            let result = await demo.bar('test.txt');

            expect(result).to.equal('calldb_stub');
            expect(createStub).to.have.been.calledOnce;
            expect(createStub).to.have.been.calledWith('test.txt');
            expect(callStub).to.have.been.calledOnce;
        })
    })
})
