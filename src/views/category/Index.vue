<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <div>
            <div class="d-flex justify-between">
              <h4>Lista de categorias</h4>
            </div>

            <v-data-table :loading="loading" :headers="headers" :items="categories" :search="search">
              <template v-slot:item.url_imagen="{item}">
                <v-avatar size="36px">
                  <img alt="Avatar" :src="item.url_imagen">
                </v-avatar>
              </template>
              <template v-slot:item.actions="{item}">
                <div class="d-flex">
                  <v-btn @click="editRecord(item)" small fab text>
                    <v-icon>mdi-playlist-edit</v-icon>
                  </v-btn>
                  <v-btn @click="confirmDeleteRecord(item.idcategoria)" small fab text>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-data-table>


          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-btn @click="handlePrompt()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="activePrompt">
      <category-create v-if="!editing" @closePrompt="close()"></category-create>
      <category-edit v-else @closePrompt="close()" :category="categoryToEdit"></category-edit>
    </v-dialog>

  </v-card>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import CategoryCreate from './Create'
import CategoryEdit from './Edit'

export default {
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data: () => ({
    category: {},
    categoryToEdit: {},
    activePrompt: false,
    showModal: true,
    editing: false,
    loading: false,
    search: '',
    headers: [{
        text: 'Orden',
        value: 'orden'
      },
      {
        text: 'Titulo',
        value: 'titulo',
      },
      {
        text: 'Imagen',
        value: 'url_imagen'
      },
      {
        text: 'Acciones',
        value: 'actions'
      },
    ]
  }),
  methods: {
    ...mapActions({
      'fetchCategories': 'category/fetchCategories',
      'removeCategory': 'category/removeCategory'
    }),
    cancel() {
      this.category = {
        url_imagen: null
      }
    },
    handlePrompt(add) {
      this.activePrompt = true
      if (add) this.category = {}
    },
    close() {
      this.activePrompt = false
      this.category = {}
      this.editing = false
    },
    editRecord(category) {
      this.editing = true
      this.categoryToEdit = {
        ...category
      }
      this.activePrompt = true
    },
    confirmDeleteRecord (id) {
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
          this.removeCategory(id)
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
    }
  },
  created() {
    this.loading = true
    this.fetchCategories()
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
      })
      .then(() => this.loading = false)
  },
  computed: {
    ...mapState({
      categories: state => state.category.categories
    })
  }
}
</script>