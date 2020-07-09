<template>
  <v-app id="inspire">
    <side-bar-menu />

    <nav-bar />

    <v-main>
      <div class="pa-4 pb-10">
        <breadcrumbs :items="$route.meta.breadcrumb" />
        <router-view></router-view>
      </div>
    </v-main>

  </v-app>
</template>

<script>
import SideBarMenu from './components/SideBarMenu'
import NavBar from './components/NavBar'
import Breadcrumbs from './components/Breadcrumbs'
  export default {
    components: {SideBarMenu, NavBar, Breadcrumbs},
    props: {
      source: String,
    },
    data: () => ({
      dialog: false,
      drawer: null,      
    }),
  }
</script>