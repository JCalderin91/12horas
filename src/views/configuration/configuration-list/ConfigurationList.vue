<template>

  <div id="page-configuration-list">

    
    <div>

      <div class="flex justify-between">
        <h4>{{$route.meta.pageTitle}}</h4>
        <v-btn @click="handleSelected(true)" color="success" type="filled">Agregar</v-btn>
      </div>

       
      <vs-table stripe noDataText="No hay datos" search max-items="10" pagination v-model="selectedConfiguration" @selected="handleSelected()" :data="configurationsData">

        <template slot="thead">
          <vs-th sort-key="consumo_minimo">Consumo minimo</vs-th>
          <vs-th sort-key="min_tolerancia">Minimo Tolerancia</vs-th>
          <vs-th sort-key="costo_minuto">Costo por minuto</vs-th>
          <vs-th sort-key="tarifa_minima">Tarifa minima</vs-th>
          <vs-th sort-key="km_permitidos">Km permitidos</vs-th>
          <vs-th sort-key="lat_centro_envio">Latitud</vs-th>
          <vs-th sort-key="lng_centro_envio">Longitud</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="data[indextr].consumo_minimo">
              {{ data[indextr].consumo_minimo }}
            </vs-td>

            <vs-td :data="data[indextr].min_tolerancia">
              {{ data[indextr].min_tolerancia }}
            </vs-td>

            <vs-td :data="data[indextr].costo_minuto">
              {{ data[indextr].costo_minuto }}
            </vs-td>
     
            <vs-td :data="data[indextr].tarifa_minima">
              {{ data[indextr].tarifa_minima }}
            </vs-td>

            <vs-td :data="data[indextr].km_permitidos">
              {{ data[indextr].km_permitidos }}
            </vs-td>  

            <vs-td :data="data[indextr].lat_centro_envio">
              {{ data[indextr].lat_centro_envio }}
            </vs-td>

            <vs-td :data="data[indextr].lng_centro_envio">
              {{ data[indextr].lng_centro_envio }}
            </vs-td>    

          </vs-tr>
        </template>
      </vs-table>   

    </div>

    <v-dialog
      title="Configuración"
      @cancel="val=''"
      @close="close"
      buttons-hidden
      class="custom"
      v-model="activePrompt">
      <configuration-create v-if="!viewModal" @closePrompt="close()"></configuration-create>
      <configuration-edit v-else @closePrompt="close()" :configuration="{...configuration}"></configuration-edit>
    </v-dialog> 

  </div>

</template>

<script>

// Cell Renderer
import CellRendererActions from './cell-renderer/CellRendererActions.vue'


import ConfigurationCreate from '@/views/apps/configuration/configuration-form/ConfigurationCreate.vue'
import ConfigurationEdit from '@/views/apps/configuration/configuration-form/ConfigurationEdit.vue'

import {mapState, mapActions} from 'vuex'

export default {
  components: {
    CellRendererActions,
    ConfigurationCreate,
    ConfigurationEdit
  },
  data () {
    return {
      activePrompt:false,
      viewModal: true,
      selectedConfiguration:{},
      configuration: {}
    }

  },
  methods: {
    ...mapActions({
      'fetchConfigurations' : 'configuration/fetchConfigurations'
    }),
    handleSelected (add) {
      this.activePrompt = true
      if (add) {
        this.configuration = {}
        this.viewModal = false
      } else {
        this.configuration = this.selectedConfiguration
        this.viewModal = true
      }
    }, 
    close () {
      this.selectedConfiguration = {}
      this.promptConfig = {}
      this.configuration = {}
      this.activePrompt = false
    }
  },
  computed: {
    ...mapState({
      configurationsData: ({configuration}) => configuration.configurations
    })  
  },
  created () {    
    this.fetchConfigurations()
      .catch(() => {

        console.error('Error en fetchConfigurations')
      })
  }
}

</script>

<style lang="scss">
.v-dialog.custom {
  z-index: 52000 !important; 
  .v-dialog{
    max-width: 95vw;
    max-height: 95vh;
    width: 1200px;
    .v-dialog-text{
      overflow:auto;
    }
  }
}
</style>