<template>
  <v-card :loading="loading">
    <v-card-title>Formulario de categorias</v-card-title>
    <v-card-text>
      <v-text-field outlined dense label="Titulo" placeholder="Titulo" v-model="category.titulo" />
      <v-text-field outlined dense type="number"  label="Orden" placeholder="Orden" v-model="category.orden" />
      <br>
      <div class="imagen-input">
        <span class="d-block"><small for="">Imagen de referencia</small></span>
        <v-image-input v-model="category.url_imagen" :image-quality="0.85" clearable image-format="jpeg"
              uploadIcon="mdi-upload" clearIcon="mdi-trash-can-outline" imageMinScaling="contain" overlayPadding="3px"
              :imageHeight="190" fullWidth />
      </div>
      <br>
      <div class="d-flex justify-end">
        <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
        <v-btn @click="saveCategory()" color="success" >Guardar</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import VImageInput from 'vuetify-image-input'
import {
  mapActions
} from 'vuex'
export default {
  components: {
    VImageInput
  },
  data: () => ({
    loading: false,
    category: {}
  }),
  methods: {
    ...mapActions({
      'addCategory': 'category/addCategory'
    }),
    saveCategory() {
      this.loading = true
      this.addCategory(this.category)
        .then(() => {
          this.$swal('Exito!', 'Producto actualizado', 'success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
        .then(() => this.loading = true)
    }
  }
}
</script>