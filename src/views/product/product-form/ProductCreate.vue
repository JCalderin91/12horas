<template>
  <v-card :loading="loading">
    <v-card-title>
      Formulario de producto
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col lg="8" sm="8" xs="12">
          <v-row>
            <v-col lg="12" sm="12" xs="12">
              <v-text-field dense outlined label="Nombre" v-model="product.nombre" />
            </v-col>
            <v-col lg="6" sm="6" xs="12">
              <v-text-field dense type="number" outlined label="Precio" v-model="product.precio" />
            </v-col>
            <v-col lg="6" sm="6" xs="12">
              <v-text-field dense outlined label="Código" v-model="product.clave" />
            </v-col>
            <v-col lg="4" sm="4" xs="12">
              <v-text-field type="number" dense outlined label="Descuento" v-model="product.descuento" />
            </v-col>
            <v-col lg="4" sm="4" xs="12">
              <v-text-field dense type="number" outlined placeholder="Cantidad" v-model="product.cantidad" />
            </v-col>
            <v-col lg="4" sm="4" xs="12">
              <v-select dense outlined label="Categoría(s)" item-text="titulo" item-value="idcategoria"
                :items="categories" v-model="product.categoriaid">
              </v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="4" sm="4" xs="12">
          <div class="imagen-input">
            <span class="d-block"><small for="">Imagen de referencia</small></span>
            <v-image-input v-model="product.url_imagen" :image-quality="0.85" clearable image-format="jpeg"
              uploadIcon="mdi-upload" clearIcon="mdi-trash-can-outline" imageMinScaling="contain" overlayPadding="3px"
              :imageHeight="190" fullWidth />
          </div>
        </v-col>
        <v-col sm="12">
          <v-textarea dense outlined label="Descripción" v-model="product.descripcion" />
        </v-col>
        <v-col sm="12" class="d-flex justify-end">
          <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
          <v-btn @click="saveProduct()" color="success">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import VImageInput from 'vuetify-image-input'
import {
  mapActions,
  mapState
} from 'vuex'
export default {
  components: {
    VImageInput
  },
  data() {
    return {
      loading: false,
      beforeEdit: {},
      product: {}
    }
  },
  methods: {
    ...mapActions({
      'addProduct': 'product/addProduct',
      'fetchCategories': 'category/fetchCategories'
    }),
    saveProduct() {
      let categoria = this.categories.filter(c => c.idcategoria === this.product.categoriaid)[0].titulo
      this.loading = true
      this.product = {
        ...this.product,
        categoria
      }
      this.addProduct(this.product)
        .then(() => {
          this.$swal('Exito!', 'Su registro ha sido guardado', 'success')
          this.cancel()
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
        .then(() => this.loading = false)

    },
    cancel() {
      this.$emit('closePrompt')
    }
  },
  computed: {
    ...mapState({
      categories: ({
        category
      }) => category.categories
    })
  },
  created() {
    this.fetchCategories()
  }
}

</script>

