import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "full-page" */ '../layouts/main/Main.vue'),
    children: [
      {
        path: '/',
        redirect: '/productos'
      },
      {
        path: '/productos',
        name: 'product-list',
        component: () => import('@/views/product/product-list/ProductList.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Productos', href: '/productos' },
            { text: 'Lista', disabled: true }
          ],
          pageTitle: 'Lista de productos',
          rule: 'editor'
        }
      },
      {
        path: '/banners',
        name: 'banner',
        component: () => import('@/views/banner/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Banner', href: '/banners' },
            { text: 'Lista', disabled: true }
          ],
          pageTitle: 'Lista de banners',
          rule: 'editor'
        }
      },
      {
        path: '/configuraciones',
        name: 'configuration',
        component: () => import('@/views/configuration/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Configuraciones', active: true }
          ],
          pageTitle: 'Configuraciones',
          rule: 'editor'
        }
      },
      {
        path: '/repartidores',
        name: 'dealer-list',
        component: () => import('@/views/dealer/dealer-list/DealerList.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Repartidores' },
            { title: 'Lista', active: true }
          ],
          pageTitle: 'Lista de repartidores',
          rule: 'editor'
        }
      },
      {
        path: '/categorias',
        name: 'category',
        component: () => import('@/views/category/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Categorias', active: true }
          ],
          pageTitle: 'Categorias de productos',
          rule: 'editor'
        }
      },
      {
        path: '/usuarios',
        name: 'user',
        component: () => import('@/views/user/user-list/UserList.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Usuarios', active: true }
          ],
          pageTitle: 'Usuarios',
          rule: 'editor'
        }
      },
      {
        path: '/roles',
        name: 'role',
        component: () => import('@/views/role/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Roles', active: true }
          ],
          pageTitle: 'Roles',
          rule: 'editor'
        }
      },     
      {
        path: 'roles/:id/modulos',
        name: 'module',
        component: () => import('@/views/role/module/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Roles', url: '/roles' },
            { title: 'Modulos', active: true }
          ],
          pageTitle: 'Modulos',
          rule: 'editor'
        }
      },
      {
        path: 'roles/:id/modulos/:idmodulo/permisos',
        name: 'permission',
        component: () => import('@/views/role/module/permission/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Roles', url: '/roles' },
            { title: 'Modulos', url: '/roles/:id/modulos' },
            { title: 'Permisos', active: true }
          ],
          pageTitle: 'Permisos',
          rule: 'editor'
        }
      },
      {
        path: 'usuarios/:id/direcciones',
        name: 'address',
        component: () => import('@/views/user/address/Index.vue'),
        meta: {
          breadcrumb: [
            { title: 'Inicio', url: '/' },
            { title: 'Usuarios', url: '/usuarios' },
            { title: 'Direcciones', active: true }
          ],
          pageTitle: 'direcciones',
          rule: 'editor'
        }
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
})

export default router
