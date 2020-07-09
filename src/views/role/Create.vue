<template>
  <div>
    <v-text-field class="inputx w-full" label="Precio" placeholder="Precio" v-model="role.nombre" />
    <br>
    <v-textarea label="Descripción" v-model="role.descripcion" />
    <br>
    <div class="flex justify-end">
      <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
      <v-btn @click="saveRole()" color="success" type="filled">Guardar</v-btn>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
export default {
  data: () => ({
    role: {}
  }),
  methods: {
    ...mapActions({
      'addRole': 'role/addRole'
    }),
    saveRole() {
      this.role = {
        ...this.role,
        status: true
      }
      this.addRole(this.role)
        .then(() => {
          this.$swal('Exito!', 'Rol guardado', 'success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
        })
    },
    cancel() {
      this.$emit('closePrompt')
    }
  }
}
</script>