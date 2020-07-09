<template>
  <v-card>
    <v-card-title>Formulario de rol</v-card-title>
    <v-card-text>
      <v-text-field label="Precio" placeholder="Precio" v-model="role.nombre" />
      <br>
      <v-textarea label="Descripción" v-model="role.descripcion" />
      <br>
      <div class="d-flex justify-end">
        <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
        <v-btn @click="saveRole()" color="success">Guardar</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {

  props: {
    role: {
      type: Object
    }
  },
  methods: {
    ...mapActions({
      'updateRole': 'role/updateRole'
    }),
    saveRole() {
      this.role = {
        ...this.role,
        status: true
      }
      this.updateRole(this.role)
        .then(() => {
          this.$swal('Exito!', 'Rol actualizado', 'success')
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