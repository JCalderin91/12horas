<template>
  <v-card>
    
    <v-card-text>
      <v-card-text>
        <v-card-title>
          {{$route.meta.pageTitle}}
          <v-spacer></v-spacer>
          <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
        </v-card-title>

        <v-data-table :loading="loading" :headers="headers" :items="addresses" :search="search">
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
              <v-btn @click="confirmDeleteRecord(item.iddireccion)" small fab text>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </div>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card-text>

    <v-btn @click="handlePrompt()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="activePrompt">
      <address-create v-if="!editing" @closePrompt="close()"></address-create>
      <address-edit v-else @closePrompt="close()" :address="addressToEdit"></address-edit>
    </v-dialog>
  </v-card>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import AddressCreate from './Create'
import AddressEdit from './Edit'

export default {
  components: {
    AddressCreate,
    AddressEdit
  },
  data: () => ({
    address: {},
    addressToEdit: {},
    activePrompt: false,
    showModal: true,
    editing: false,
    search: '',
    loading: false,
    headers: [
      {
        text: 'Calle',
        value: 'calle'
      },
      {
        text: 'Num Ext',
        value: 'numeroext',
      },
      {
        text: 'Num Int',
        value: 'numeroint',
      },
      {
        text: 'Colonia',
        value: 'colonia'
      },
      {
        text: 'Referencia',
        value: 'referencia'
      },
      {
        text: 'Codigo Postal',
        value: 'codigopostal'
      },
      {
        text: 'Latitud',
        value: 'latitud'
      },
      {
        text: 'Longitud',
        value: 'longitud'
      },
      {
        text: 'Acciones',
        value: 'actions'
      },
    ]
  }),
  methods: {
    ...mapActions({
      'fetchUserAddresses': 'user/fetchUserAddresses',
      'removeAddress': 'address/removeAddress',
    }),
    cancel() {
      this.address = {
        url_imagen: null
      }
    },
    handlePrompt(add) {
      this.activePrompt = true
      if (add) this.address = {}
    },
    close() {
      this.activePrompt = false
      this.address = {}
      this.editing = false
    },
    editRecord(address) {
      this.editing = true
      this.addressToEdit = {
        ...address
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
          this.removeAddress(id)
            .then(async () => {
              await this.fetchUserAddresses(this.$route.params.id)
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
    this.fetchUserAddresses(this.$route.params.id)
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
      })
  },
  computed: {
    ...mapState({
      addresses: state => state.user.userAddresses
    })
  }
}
</script>

<style scoped lang="scss">
	.btn-back{
		margin: 1rem 0;
		cursor: pointer;
		display: inline-block;
	}	
</style>