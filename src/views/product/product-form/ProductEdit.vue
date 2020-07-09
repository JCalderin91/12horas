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

        <v-col sm="12" class="d-flex">
          <v-btn @click="openConfirm()" color="error" outlined class="mr-2">Eliminar</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()" class="mr-2">Cancelar</v-btn>
          <v-btn @click="saveProduct()" color="success" >Guardar</v-btn>
        </v-col>

      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import VImageInput from 'vuetify-image-input'

export default {
  components: {VImageInput},
  props: {
    product: {
      type: Object
    },
    viewModal: {
      type: Boolean
    }
  },
  data () {
    return {
      beforeEdit: {},
      loading: false
    }
  },
  methods: {
    ...mapActions({
      'fetchCategories':'category/fetchCategories',
      'removeProduct'  :'product/removeProduct',
      'updateProduct'  :'product/updateProduct'
    }),
    saveProduct () {
      this.loading = true
      let categoria = this.categories.filter(c => c.idcategoria === this.product.categoriaid)[0].titulo
      let product = {
        ...this.product,
        categoria
      }
      this.updateProduct(product)
        .then(() => {
          this.$swal('Exito!', 'Producto actualizado','success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','error')
        })
        .then(() => this.loading = false)
    },
    openConfirm () {
      this.$swal({
        title: '¿Esta seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Borrar'
      }).then((result) => {
        if (result.value) {
          this.loading = true
          this.removeProduct(this.product.idproducto)
            .then(() => {
              this.$swal('Borrado!', 'Su registro ha sido borrado','success')
              this.$emit('closePrompt')
            })
            .catch(() => {
              this.$swal('Alerta!', 'Ha ocurrido un error','error')
            })
            .then(() => this.loading = false)
        }
      })
    },    
    cancel () {
      this.product = {...this.beforeEdit}
      this.$emit('closePrompt')
    }
  },
  computed: {
    ...mapState({
      categories: state => state.category.categories
    })
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