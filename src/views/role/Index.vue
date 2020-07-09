<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <div>
            <div class="d-flex justify-between">
              <h4>Lista de roles</h4>
              <v-btn @click="handlePrompt(true)" color="success"  class="mr-2">Agergar</v-btn>
            </div>
            <vs-table stripe noDataText="No hay datos" search max-items="10" pagination :data="roles">

              <template slot="thead">
                <vs-th sort-key="nombre">Nombre</vs-th>
                <vs-th sort-key="descripcion">Descripción</vs-th>
                <vs-th>Aciones</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].nombre">
                    {{ data[indextr].nombre }}
                  </vs-td>
                  <vs-td :data="data[indextr].descripcion">
                    {{ data[indextr].descripcion }}
                  </vs-td>
                  <vs-td class="actions">
                    <router-link :to="{name:'module', params: {id: tr.id}}">
                      <feather-icon icon="BoxIcon" svgClasses="h-5 w-5 mr-4 hover:text-warning cursor-pointer" />
                    </router-link>
                    <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer"
                      @click="editRecord(tr)" />
                    <feather-icon icon="Trash2Icon" svgClasses="h-5 w-5 hover:text-danger cursor-pointer"
                      @click="confirmDeleteRecord(tr.id)" />
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </v-col>
      </v-row>
    </v-card-text>

    <v-btn @click="handlePrompt()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="activePrompt">
      <role-create v-if="!editing" @closePrompt="close()"></role-create>
      <role-edit v-else @closePrompt="close()" :role="roleToEdit"></role-edit>
    </v-dialog>
  </v-card>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import RoleCreate from './Create'
import RoleEdit from './Edit'

export default {
  components: {
    RoleCreate,
    RoleEdit
  },
  data: () => ({
    role: {},
    roleToEdit: {},
    activePrompt: false,
    showModal: true,
    editing: false
  }),
  methods: {
    ...mapActions({
      'fetchRoles': 'role/fetchRoles',
      'removeRole': 'role/removeRole'
    }),
    cancel() {
      this.role = {
        url_imagen: null
      }
    },
    handlePrompt(add) {
      this.activePrompt = true
      if (add) this.role = {}
    },
    close() {
      this.activePrompt = false
      this.role = {}
      this.editing = false
    },
    editRecord(role) {
      this.editing = true
      this.roleToEdit = {
        ...role
      }
      this.activePrompt = true
    },
    confirmDeleteRecord(idrole) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: () => this.deleteHandle(idrole)
      })
    },
    deleteHandle(idrole) {
      this.removeRole(idrole)
        .then(() => {
          this.$swal('Exito!', 'Rol eliminado', 'success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
    },
  },
  created() {
    this.fetchRoles()
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
      })
  },
  computed: {
    ...mapState({
      roles: state => state.role.roles
    })
  }
}
</script>

<style scoped lang="scss">
.actions {
  width: 111px;

  a {
    color: currentColor;
  }
}
</style>