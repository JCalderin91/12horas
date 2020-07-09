<template>
  <v-card>
    <v-card-title>Formulario de módulo</v-card-title>
    <v-card-text>
      <v-text-field  label="Nombre" placeholder="Nombre" v-model="module.nombre" />
      <v-text-field  label="Slug" placeholder="Slug" v-model="module.slug" />
      <br>
      <v-textarea label="Descripción" v-model="module.descripcion" />
      <div class="d-flex justify-end">
        <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
        <v-btn @click="saveModule()" color="success" >Guardar</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  data: () => ({
    module: {}
  }),
  methods: {
    ...mapActions({
      'addModule': 'module/addModule',
      'fetchRoleModules': 'role/fetchRoleModules'
    }),
    saveModule() {
      this.module = {
        ...this.module,
        status: true,
        rol_id: this.$route.params.id
      }
      this.addModule(this.module)
        .then(() => {
          this.$swal('Exito!', 'Modulo guardado', 'success')
          this.fetchRoleModules(this.$route.params.id)
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
    },
    cancel() {
      this.$emit('closePrompt')
    }
  }
}
</script>