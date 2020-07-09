<template>
  <div>
    <v-text-field class="inputx w-full" label="Titulo" placeholder="Titulo" v-model="category.titulo" />
    <v-text-field type="number" class="inputx w-full" label="Orden" placeholder="Orden" v-model="category.orden" />
    <br>
    <div class="imagen-input">
      <span class="d-block"><small for="">Imagen de referencia</small></span>
      <v-image-input v-model="category.url_imagen" :image-quality="0.85" clearable image-format="jpeg"
        uploadIcon="Cargar imagen" clearIcon="X" hideActions imageMinScaling="contain" overlayPadding="3px"
        :imageHeight="190" fullWidth />
    </div>
    <br>
    <div class="flex justify-end">
      <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
      <v-btn @click="saveCategory()" color="success" type="filled">Guardar</v-btn>
    </div>
  </div>
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
    category: {}
  }),
  methods: {
    ...mapActions({
      'addCategory': 'category/addCategory'
    }),
    saveCategory() {
      this.addCategory(this.category)
        .then(() => {
          this.$swal('Exito!', 'Producto actualizado', 'success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
        })
    }
  }
}
</script>