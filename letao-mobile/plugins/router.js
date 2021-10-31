const Cookie = require("js-cookie");
export default ({ app, redirect }) => {
  app.router.beforeEach((to, from, next) => {
    if (to.path == "/my/login") {
      next()
    }

    let cookie = Cookie.get('token')
    if (!cookie) {
      next('/my/login')
    } else {
      next()
    }
  })
}