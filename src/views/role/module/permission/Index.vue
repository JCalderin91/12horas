<template>
  <v-card>
    <v-card>
      <v-row>
        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <div>
            <div class="btn-back" @click="toModule()">
              <h5>
                <feather-icon icon="ArrowLeftIcon" svgClasses="h-5 w-5 mr-4" /> Volver</h5>
            </div>
            <div class="d-flex justify-between">
              <h4>Lista de permisos del módulo</h4>
              <v-btn @click="handlePrompt(true)" color="success"  class="mr-2">Agergar</v-btn>
            </div>
            <vs-table stripe noDataText="No hay datos" search max-items="10" pagination :data="permissions">

              <template slot="thead">
                <vs-th sort-key="nombre">Título</vs-th>
                <vs-th sort-key="slug">Slug</vs-th>
                <vs-th>Aciones</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].nombre">
                    {{ data[indextr].nombre }}
                  </vs-td>
                  <vs-td :data="data[indextr].slug">
                    {{ data[indextr].slug }}
                  </vs-td>
                  <vs-td>
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
    </v-card>

    <v-btn @click="handlePrompt()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="activePrompt">
      <permission-create v-if="!editing" @closePrompt="close()"></permission-create>
      <permission-edit v-else @closePrompt="close()" :permission="permissionToEdit"></permission-edit>
    </v-dialog>
  </v-card>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'
import PermissionCreate from './Create'
import PermissionEdit from './Edit'

export default {
  components: {
    PermissionCreate,
    PermissionEdit
  },
  data: () => ({
    permission: {},
    permissionToEdit: {},
    activePrompt: false,
    showModal: true,
    editing: false
  }),
  methods: {
    ...mapActions({
      'fetchPermissions': 'permission/fetchPermissions',
      'removePermission': 'permission/removePermission',
      'fetchModulePermissions': 'module/fetchModulePermissions'
    }),
    cancel() {
      this.permission = {
        url_imagen: null
      }
    },
    handlePrompt(add) {
      this.activePrompt = true
      if (add) this.permission = {}
    },
    close() {
      this.activePrompt = false
      this.permission = {}
      this.editing = false
    },
    editRecord(permission) {
      this.editing = true
      this.permissionToEdit = {
        ...permission
      }
      this.activePrompt = true
    },
    confirmDeleteRecord(idpermission) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: () => this.deleteHandle(idpermission)
      })
    },
    deleteHandle(idpermission) {
      this.removePermission(idpermission)
        .then(async () => {
          await this.fetchModulePermissions(this.$route.params.idmodulo)
          this.$swal('Exito!', 'Permiso eliminado', 'success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
    },
    toModule() {
      this.$router.push({
        name: 'module'
      })
    }
  },
  created() {
    this.fetchModulePermissions(this.$route.params.idmodulo)
  },
  computed: {
    ...mapState({
      permissions: ({
        module
      }) => module.modulePermissions
    })
  }
}
</script>

<style scoped lang="scss">
.btn-back {
  margin: 1rem 0;
  cursor: pointer;
  display: inline-block;
}
</style>