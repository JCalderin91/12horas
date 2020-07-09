<template>
  <div>
    <v-row>
      <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
        <div>
          <div class="flex justify-between">
            <h4>Lista de categorias</h4>
            <v-btn @click="handlePrompt(true)" color="success" type="filled" class="mr-2">Agergar</v-btn>
          </div>
          <vs-table stripe noDataText="No hay datos" search max-items="10" pagination :data="categories">

            <template slot="thead">
              <vs-th sort-key="orden">Orden</vs-th>
              <vs-th sort-key="titulo">Título</vs-th>
              <vs-th>Imagen</vs-th>
              <vs-th>Aciones</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].orden">
                  {{ data[indextr].orden }}
                </vs-td>
                <vs-td :data="data[indextr].titulo">
                  {{ data[indextr].titulo }}
                </vs-td>
                <vs-td :data="data[indextr].url_imagen">
                  <img key="onlineImg" :src="data[indextr].url_imagen" alt="user-img" width="30" height="30"
                    class="rounded-full shadow-md block" />
                </vs-td>
                <vs-td :data="data[indextr].url_imagen">

                  <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    @click="editRecord(tr)" />
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                    @click="confirmDeleteRecord(tr.idcategoria)" />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </v-col>
    </v-row>

    <v-dialog title="Categoria" buttons-hidden @close="close" v-model="activePrompt">
      <div class="con-exemple-prompt">
        <category-create v-if="!editing" @closePrompt="close()"></category-create>
        <category-edit v-else @closePrompt="close()" :category="categoryToEdit"></category-edit>
      </div>
    </v-dialog>
  </div>
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
    editing: false
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
    confirmDeleteRecord(idcategoria) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: () => this.deleteHandle(idcategoria)
      })
    },
    deleteHandle(idcategoria) {
      this.removeCategory(idcategoria)
        .then(() => {
          this.$swal('Exito!', 'Categoria eliminada', 'success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
        })
    },
  },
  created() {
    this.fetchCategories()
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
      })
  },
  computed: {
    ...mapState({
      categories: state => state.category.categories
    })
  }
}
</script>