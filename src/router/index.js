import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home/index.vue'
import list from '@/pages/list/index.vue'
import detail from '@/pages/detail/index.vue'
import product from '@/pages/product/index.vue'

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'home',
			component: home
		},
		{
			path: '/list',
			name: 'list',
			component: list
		},
		{
			path: '/product',
			name: 'product',
			component: product
		},
		{
			path: '/detail',
			name: 'detail',
			component: detail
		}

	]
})
