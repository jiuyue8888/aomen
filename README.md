# aomen

> A Vue.js project

## Build Setup

``` bash
# install dependencies
yarn

# serve with hot reload at localhost:8080
yarn run dev

# 测试包
yarn run build:test
main.js 这里改成：
window.localStorage.setItem('env','test')
# 正式包
main.js 这里改成：
 window.localStorage.setItem('env','pro')
yarn run build
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
