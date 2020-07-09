<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        {{$route.meta.pageTitle}}
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title>

      <v-data-table :loading="loading" :headers="headers" :items="banners" :search="search">
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
            <v-btn @click="confirmDeleteRecord(item.idbanner)" small fab text>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card-text>

    <v-btn @click="handlePrompt()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="activePrompt">
      <banner-create v-if="!editing" @closePrompt="close()"></banner-create>
      <banner-edit v-else @closePrompt="close()" :banner="bannerToEdit"></banner-edit>
    </v-dialog>
  </v-card>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import BannerCreate from './Create'
import BannerEdit from './Edit'

export default {
  components: {
    BannerCreate,
    BannerEdit
  },
  data: () => ({
    banner: {},
    bannerToEdit: {},
    activePrompt: false,
    showModal: true,
    editing: false,
    loading: false,
    search: '',
    headers: [{
        text: 'Descripcion',
        value: 'descripcion'
      },
      {
        text: 'Precio',
        value: 'precio',
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
      'fetchBanners': 'banner/fetchBanners',
      'removeBanner': 'banner/removeBanner'
    }),
    cancel() {
      this.banner = {
        url_imagen: null
      }
    },
    handlePrompt(add) {
      this.activePrompt = true
      if (add) this.banner = {}
    },
    close() {
      this.activePrompt = false
      this.banner = {}
      this.editing = false
    },
    editRecord(banner) {
      this.editing = true
      this.bannerToEdit = {
        ...banner
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
          this.removeBanner(id)
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
    this.fetchBanners()
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error','error')
      })
      .then(() => this.loading = false)
  },
  computed: {
    ...mapState({
      banners: state => state.banner.banners
    })
  }
}
</script>