const Koa = require('koa')

const { initRouter, initController } = require('./lm-loader')

class lm {
    constructor(conf) {
        this.$app = new Koa(conf)
        this.$ctrl = initController(this)
        this.$router = initRouter(this)
        this.$app.use(this.$router.routes())
    }

    start(port) {
        this.$app.listen(port, () => {
            console.log('lm服务器端口启动: ' + port)
        })
    }
}
module.exports = lm