const Koa = require('koa');
const md5 = require('md5')
const app = new Koa();
const path = require('path');
const router = require('koa-router')();

router.get('/', async function (ctx) {
    ctx.body = `
    <html>
        <body>hello world</body>
        <script src="./a.js"></script>
    </html>
    `
});

router.get('/a.js', async function(ctx) {
    console.log('请求来到这了')
    const fs = require('fs')
    const js = fs.readFileSync('./a.js', 'utf-8')
    // http 1.0 expires: 2020-10-16: 17:00  浏览器时间可以修改，有可能导致缓存失效
    // http 1.1 200 请求不会来到服务器的 浏览器把上一次得到的内容取出来用
    // (from memory/disk cache)
    const etag = md5(js)
    if (ctx.headers['if-none-match'] === etag) {
        ctx.status = 304  // 304 告诉浏览器内容没有变化
        ctx.body = '';
        return
    }
    ctx.set('Cache-Control', 'public, max-age=30')
    // 能够根据文件内容 生成的 hash 字符串(md5)
    // md('js') => 'xxx'
    // md('js1') => 'xxx1'
    // 输入一样输出一样； 输入不一样输出也不一样
    ctx.set('ETag', etag)
    // lat-modified:  上一次的文件修改时间
    // 文件的修改时间变了  文件内容就变了
    // ctx.set('last-modified', '文件修改时间')
    // 大文件的时候 hash  耗时比较久 取修改时间
    // 强缓存优先生效
    // 30秒之后请求就会来到服务器  顺便 用if-none-match 把上一次的etag带回来
    ctx.body = js
})
app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(9090, () => {
  console.log('server is running 9090');
});
