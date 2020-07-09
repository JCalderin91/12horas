<template>
  <div>
    <v-row>
      <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
        <div>
          <div class="btn-back" @click="$router.push({name: 'user'})">
            <h5>
              <feather-icon icon="ArrowLeftIcon" svgClasses="h-5 w-5 mr-4" /> Volver</h5>
          </div>
          <div class="flex justify-between">
            <h4>Lista de direcciones</h4>
            <v-btn @click="handlePrompt(true)" color="success" type="filled" class="mr-2">Agergar</v-btn>
          </div>
          <vs-table stripe noDataText="No hay datos" search max-items="10" pagination :data="addresses">

            <template slot="thead">
              <vs-th sort-key="calle">Calle</vs-th>
              <vs-th sort-key="numeroext">Num Ext</vs-th>
              <vs-th sort-key="numeroint">Num Int</vs-th>
              <vs-th sort-key="colonia">Colonia</vs-th>
              <vs-th sort-key="referencia">Referencia</vs-th>
              <vs-th sort-key="codigopostal">Codigo postal</vs-th>
              <vs-th sort-key="latitud">Latitud</vs-th>
              <vs-th sort-key="longitud">Longitud</vs-th>
              <vs-th>Aciones</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="tr.calle">
                  {{ tr.calle }}
                </vs-td>
                <vs-td :data="tr.numeroext">
                  {{ tr.numeroext }}
                </vs-td>
                <vs-td :data="tr.numeroint">
                  {{ tr.numeroint }}
                </vs-td>
                <vs-td :data="tr.colonia">
                  {{ tr.colonia }}
                </vs-td>
                <vs-td :data="tr.referencia">
                  {{ tr.referencia }}
                </vs-td>
                <vs-td :data="tr.codigopostal">
                  {{ tr.codigopostal }}
                </vs-td>
                <vs-td :data="tr.latitud">
                  {{ tr.latitud }}
                </vs-td>
                <vs-td :data="tr.longitud">
                  {{ tr.longitud }}
                </vs-td>
                <vs-td>
                  <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                    @click="editRecord(tr)" />
                  <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                    @click="confirmDeleteRecord(tr.iddireccion)" />
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </v-col>
    </v-row>

    <v-dialog title="Direcciones" buttons-hidden @close="close" v-model="activePrompt">
      <div class="con-exemple-prompt">
        <address-create v-if="!editing" @closePrompt="close()"></address-create>
        <address-edit v-else @closePrompt="close()" :address="addressToEdit"></address-edit>
      </div>
    </v-dialog>
  </div>
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
    editing: false
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
    confirmDeleteRecord(id) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: () => this.deleteHandle(id)
      })
    },
    deleteHandle(id) {
      this.removeAddress(id)
        .then(async () => {
          await this.fetchUserAddresses(this.$route.params.id)
          this.$notify({
            color: 'success',
            title: 'Exito',
            text: 'Dirección eliminada'
          })
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
        })
    },
  },
  created() {
    this.fetchUserAddresses(this.$route.params.id)
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
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