<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-user-list">

    
    <div>

      <div class="flex justify-between">
        <h4>{{$route.meta.pageTitle}}</h4>
        <v-btn @click="handleSelected(true)" color="success" type="filled">Agregar</v-btn>
      </div>

       
      <vs-table search max-items="5" pagination v-model="selectedDealer" @selected="handleSelected()" :data="usersData">

        <template slot="thead">
          <vs-th sort-key="avatar">Fografia</vs-th>
          <vs-th sort-key="name">Nombre</vs-th>
          <vs-th sort-key="phone">Teléfono</vs-th>
          <vs-th sort-key="id">Fecha</vs-th>
          <vs-th sort-key="id">Tipo</vs-th>
          <vs-th sort-key="id">Estado</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="data[indextr].avatar">
              <vs-avatar :src="data[indextr].avatra" />
            </vs-td>

            <vs-td :data="data[indextr].name">
              {{ data[indextr].name }}
            </vs-td>

            <vs-td :data="data[indextr].is_verifield">
              +52 {{ Math.floor(Math.random() * (9999999999 - 1111111111 ) + 1111111111)}}
            </vs-td>

            <vs-td :data="data[indextr].id">
              {{Math.floor(Math.random()*(31 - 1) + 1)}}-{{ Math.floor(Math.random() * (12 - 1 ) + 1) }}-2020
            </vs-td>

            <vs-td :data="data[indextr].id">
              {{ Math.floor(Math.random()*(3 - 1) + 1) == 1 ? 'Principal' : 'Auxiliar' }}
            </vs-td>
     
            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>    

          </vs-tr>
        </template>
      </vs-table>   
    </div>

    <vs-prompt
      title="Repartidor"
      @cancel="val=''"
      @close="close"
      buttons-hidden
      class="custom"
      v-model="activePrompt">
      <div class="con-exemple-prompt">
        <dealer-form :viewModal="viewModal" @closePrompt="close()" :dealer="{...dealer}"></dealer-form>
      </div>
    </vs-prompt> 

  </div>

</template>

<script>
import DealerForm from '../dealer-form/DealerForm'

export default {
  components: {
    DealerForm
  },
  data () {
    return {
      activePrompt:false,
      viewModal: true,
      selectedDealer:{},
      dealer: {}
    }

  },
  methods: {
    handleSelected (add) {
      this.activePrompt = true
      if (add) {
        this.dealer = {}
        this.viewModal = false
      } else {
        this.dealer = this.selectedDealer
        this.viewModal = true
      }
    }, 
    close () {
      this.selectedDealer = {}
      this.promptConfig = {}
      this.dealer = {}
      this.activePrompt = false
    }
  },
  computed: {
    usersData () {
      return this.$store.state.userManagement.users
    }    
  }
}

</script>

<style lang="scss">
.con-vs-dialog.custom {
  z-index: 52000 !important; 
  .vs-dialog{
    max-width: 95vw;
    max-height: 95vw;
    .vs-dialog-text{
      overflow:auto;
    }
  }
}
</style>