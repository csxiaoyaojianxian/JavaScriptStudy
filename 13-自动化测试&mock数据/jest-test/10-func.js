import Util from './10-es6-class'

const demoFunction = (a, b) => {
    const util = new Util()
    util.a(a)
    util.b(b)
}

export default demoFunction