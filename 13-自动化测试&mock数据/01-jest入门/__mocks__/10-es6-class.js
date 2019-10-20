const Util = jest.fn(() => {
    console.log('constructor --')
})
Util.prototype.a = jest.fn(() => {
    console.log('a --')
})
Util.prototype.b = jest.fn()

export default Util