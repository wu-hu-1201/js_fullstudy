//  保证一个类只有一个实例,并提供一个访他的全局访问点

class SingleDog {
    show () {
        console.log('我是一个单例对象');
    }
    static getInstance() {
        // 判断是否被new 过
        // if (!SingleDog.instance) {
        //     SingleDog.instance = new SingleDog()
        // }
        // return SingleDog.instance
        let instance = null 
        return !function() {
            if (!instance) {
                instance = new SingleDog()
            }
            return instance
        }()
    }
}

const s1 = SingleDog.getInstance()
const s2 = SingleDog.getInstance()



console.log(s1 === s2)   // true
