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
          text: 'Lista de productos',
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
          text: 'Lista de banners',
          rule: 'editor'
        }
      },
      {
        path: '/configuraciones',
        name: 'configuration',
        component: () => import('@/views/configuration/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Configuraciones', disabled: true }
          ],
          text: 'Configuraciones',
          rule: 'editor'
        }
      },
      {
        path: '/repartidores',
        name: 'dealer-list',
        component: () => import('@/views/dealer/dealer-list/DealerList.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Repartidores' },
            { text: 'Lista', disabled: true }
          ],
          text: 'Lista de repartidores',
          rule: 'editor'
        }
      },
      {
        path: '/categorias',
        name: 'category',
        component: () => import('@/views/category/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Categorias', disabled: true }
          ],
          text: 'Categorias de productos',
          rule: 'editor'
        }
      },
      {
        path: '/usuarios',
        name: 'user',
        component: () => import('@/views/user/user-list/UserList.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Usuarios', disabled: true }
          ],
          text: 'Usuarios',
          rule: 'editor'
        }
      },
      {
        path: '/roles',
        name: 'role',
        component: () => import('@/views/role/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Roles', disabled: true }
          ],
          text: 'Roles',
          rule: 'editor'
        }
      },     
      {
        path: 'roles/:id/modulos',
        name: 'module',
        component: () => import('@/views/role/module/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Roles', href: '/roles' },
            { text: 'Modulos', disabled: true }
          ],
          text: 'Modulos',
          rule: 'editor'
        }
      },
      {
        path: 'roles/:id/modulos/:idmodulo/permisos',
        name: 'permission',
        component: () => import('@/views/role/module/permission/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Roles', href: '/roles' },
            { text: 'Modulos', href: '/roles/:id/modulos' },
            { text: 'Permisos', disabled: true }
          ],
          text: 'Permisos',
          rule: 'editor'
        }
      },
      {
        path: 'usuarios/:id/direcciones',
        name: 'address',
        component: () => import('@/views/user/address/Index.vue'),
        meta: {
          breadcrumb: [
            { text: 'Inicio', href: '/' },
            { text: 'Usuarios', href: '/usuarios' },
            { text: 'Direcciones', disabled: true }
          ],
          text: 'direcciones',
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
