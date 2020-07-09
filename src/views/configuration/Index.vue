<template>
  <div id="page-configuration-create">
    <div>
      <v-row>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Consumo minimo" placeholder="Consumo minimo"
            v-model="configuration.consumo_minimo" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Tolerancia (Minutos)" placeholder="Tolerancia (Minutos)"
            v-model="configuration.min_tolerancia" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Costo por minuto" placeholder="Costo por minuto"
            v-model="configuration.costo_minuto" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Tarifa minima" placeholder="Tarifa minima"
            v-model="configuration.tarifa_minima" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Km permitidos" placeholder="Km permitidos"
            v-model="configuration.km_permitidos" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Latitud" placeholder="Latitud"
            v-model="configuration.lat_centro_envio" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-text-field  label="Longitud" placeholder="Longitud"
            v-model="configuration.lng_centro_envio" />
        </v-col>

        <v-col sm="12" class="p-4 sm:p-2 flex justify-end">
          <v-btn @click="saveConfiguration()" color="success" >Actualizar</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      beforeEdit: {},
      configuration: {},
      configurationOld: {}
    }
  },
  mounted() {
    this.configuration = {
      ...this.configurationOld
    }
  },
  methods: {
    ...mapActions({
      'addConfiguration': 'configuration/addConfiguration'
    }),
    saveConfiguration() {
      this.configuration = {
        ...this.configuration,
        en_servicio: 1,
        polygono_cobertura: 1,
      }
      this.addConfiguration(this.configuration)
        .then(() => {
          this.$notify({
            color: 'success',
            title: 'Exito',
            text: 'Configuración guardada'
          })
          this.cancel()
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
    },
    cancel() {
      this.$emit('closePrompt')
    }
  },
  computed: {
    configurationChange() {
      return this.configuration !== this.configurationOld
    }
  }
}

</script>

