<!-- =========================================================================================
  File Name: ConfigurationList.vue
  Description: Configuration List page
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/configuration/pixinvent
========================================================================================== -->

<template>

  <div id="page-configuration-create">

    
    <div> 

      <v-row >

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Consumo minimo" placeholder="Consumo minimo" v-model="configuration.consumo_minimo" :readonly="!editing"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Tolerancia (Minutos)" placeholder="Tolerancia (Minutos)" v-model="configuration.min_tolerancia" :readonly="!editing"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Costo por minuto" placeholder="Costo por minuto" v-model="configuration.costo_minuto" :readonly="!editing"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Tarifa minima" placeholder="Tarifa minima" v-model="configuration.tarifa_minima" :readonly="!editing"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Km permitidos" placeholder="Km permitidos" v-model="configuration.km_permitidos" :readonly="!editing"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Latitud" placeholder="Latitud" v-model="configuration.lat_centro_envio" :readonly="!editing"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Longitud" placeholder="Longitud" v-model="configuration.lng_centro_envio" :readonly="!editing"/>
        </v-col>      


        <v-col sm="12" class="p-4 sm:p-2 flex justify-between">
          <v-btn @click="openConfirm()" color="danger"  :disabled="editing" class="mr-2">Eliminar</v-btn>
          <div class="d-flex justify-end">
            <v-btn v-if="!editing" @click="editConfiguration()" color="primary"  class="mr-2">Editar</v-btn>
            <v-btn @click="cancel()" v-else color="danger"  class="mr-2">Cancelar</v-btn>
            <v-btn @click="saveConfiguration()" :disabled="!editing" color="success" >Guardar</v-btn>            
          </div>
        </v-col>

      </v-row>
    </div>
  <!-- <div>{{configuration}}</div>  -->
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  props: {
    configuration: {
      type: Object
    },
    viewModal: {
      type: Boolean
    }
  },
  data () {
    return {
      editing: false,
      beforeEdit: {}
    }
  },
  methods: {
    ...mapActions({
      'removeConfiguration'  :'configuration/removeConfiguration',
      'updateConfiguration'  :'configuration/updateConfiguration'
    }),
    editConfiguration () {
      this.beforeEdit = {...this.configuration}
      this.editing = !this.editing
    },
    saveConfiguration () {
      this.updateConfiguration(this.configuration)
        .then(() => {
          this.$notify({
            color:'success',
            title:'Exito',
            text:'Usuario acualizado'
          })
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','error')
        })
    },
    openConfirm () {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept:this.deleteConfiguration
      })
    },
    deleteConfiguration () {
      this.removeConfiguration(this.configuration.idconfiguracion)
        .then(() => {          
          this.$notify({
            color:'success',
            title:'Exito',
            text:'Usuario eliminado'
          })
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','error')
        })
    },
    cancel () {
      if (this.editing) this.configuration = {...this.beforeEdit}
      else this.$emit('closePrompt')
      this.editing = !this.editing
    }
  },
  computed: {
    ...mapState({
      categoriesData: state => state.category.categories
    }),
    matchPasswords () {
      if (this.configuration.password.length > 0 && this.configuration.password !== this.configuration.verified_password) return true
      else return false 
    }
  },
  created () {
    this.fetchCategories()
  }
}

</script>

<style lang="scss">
vbtn{
  margin: 3px;
  border-radius: 3px;
  padding: 5px 8px;
  cursor:pointer;
  background-color: red;
  color: white;

}
</style>