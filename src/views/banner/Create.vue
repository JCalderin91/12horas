<template>
  <v-card :loading="loading">
    <v-card-title>
      Formulario de banner
    </v-card-title>
    <v-card-text>
      <v-textarea outlined dense label="Descripción" v-model="banner.descripcion" />
      <v-text-field style="max-width: 300px" outlined dense type="number" class="inputx w-full" label="Precio" placeholder="Precio" v-model="banner.precio" />
      <br>
      <div class="imagen-input">
        <span class="d-block"><small for="">Imagen de referencia</small></span>
        <v-image-input v-model="banner.url_imagen" :image-quality="0.85" clearable image-format="jpeg"
              uploadIcon="mdi-upload" clearIcon="mdi-trash-can-outline" imageMinScaling="contain" overlayPadding="3px"
              :imageHeight="190" fullWidth />
      </div>
      <br>
      <div class="d-flex justify-end">
        <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
        <v-btn @click="saveBanner()" color="success" type="filled">Guardar</v-btn>
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
    banner: {},
    loading: false
  }),
  methods: {
    ...mapActions({
      'addBanner': 'banner/addBanner'
    }),
    saveBanner() {
      this.loading = true
      this.addBanner(this.banner)
        .then(() => {
          this.$swal('Exito!', 'Banner guardado','danger')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','danger')
        })
        .then(() => this.loading = false)
    },
    cancel() {
      this.$emit('closePrompt')
    }
  }
}
</script>