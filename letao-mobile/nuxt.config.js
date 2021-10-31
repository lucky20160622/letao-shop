export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'letao-mobile',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vant',
    '~/plugins/axios',
    '~/plugins/axios/api',
    '~/plugins/router'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true,
    prefix: '/api' //前端调用接口时,自动带/api
  },
  //代理配置
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      pathRewrite: {
        '^/api': '/'
      }
    }
  },
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules


  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    ip: 'localhost', //ip地址或者本地域名的配置
    port: 8080
  },
  loading: '~/components/Loading.vue'
}
