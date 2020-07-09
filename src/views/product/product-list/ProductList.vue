<template>

  <div>
    <div>
      <v-card-title>
        {{$route.meta.pageTitle}}
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-data-table :loading="loading" :headers="headers" :items="products" :search="search">
        <template v-slot:item.avatar="{item}">
          <v-avatar size="36px">
            <img alt="Avatar" :src="item.url_imagen">
          </v-avatar>
        </template>
        <template v-slot:item.actions="{item}">
          <div>
            <v-btn @click="handleSelected(item)" small fab text>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </div>

    <v-btn @click="handleSelected()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog title="Producto" v-model="activePrompt">
      <product-create v-if="viewModal" @closePrompt="close()"></product-create>
      <product-edit v-else @closePrompt="close()" :product="{...product}"></product-edit>
    </v-dialog>

  </div>

</template>

<script>
  import ProductCreate from '@/views/product/product-form/ProductCreate.vue'
  import ProductEdit from '@/views/product/product-form/ProductEdit.vue'

  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    components: {
      ProductCreate,
      ProductEdit
    },
    data() {
      return {
        activePrompt: false,
        loading: true,
        viewModal: true,
        selectedProduct: {},
        product: [],
        search: '',
        headers: [
          {
            text: 'Avatar',
            value: 'avatar'
          },
          {
            text: 'Nombre',
            value: 'nombre',
          },
          {
            text: 'Cantidad',
            value: 'cantidad'
          },
          {
            text: 'Categoria',
            value: 'categoria'
          },
          {
            text: 'Precio',
            value: 'precio'
          },
          {
            text: 'Acciones',
            value: 'actions'
          },
        ]
      }

    },
    methods: {
      ...mapActions({
        'fetchProducts': 'product/fetchProducts'
      }),
      handleSelected(add) {
        this.activePrompt = true
        if (add) {
          this.product = add
          this.viewModal = false
        } else {
          this.product = {}
          this.viewModal = true
        }
      },
      close() {
        this.product = {}
        this.activePrompt = false
      }
    },
    computed: {
      ...mapState({
        products: ({
          product
        }) => product.products
      })
    },
    created() {
      this.fetchProducts()
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','danger')
        })
        .then(() => this.loading = false)
    }
  }
</script>