<template>
  <v-card>    
    <v-card-text>
      <v-row>
        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <div>
            <div class="btn-back" @click="toRole()">
              <h5>
                <feather-icon icon="ArrowLeftIcon" svgClasses="h-5 w-5 mr-4" /> Volver</h5>
            </div>
            <div class="d-flex justify-between">
              <h4>Lista de módulos del sistema</h4>
              <v-btn @click="handlePrompt(true)" color="success"  class="mr-2">Agergar</v-btn>
            </div>
            <vs-table stripe noDataText="No hay datos" search max-items="10" pagination :data="modules">

              <template slot="thead">
                <vs-th sort-key="nombre">Título</vs-th>
                <vs-th sort-key="slug">Slug</vs-th>
                <vs-th sort-key="descripcion">Descripción</vs-th>
                <vs-th>Aciones</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].nombre">
                    {{data[indextr].nombre}}
                  </vs-td>
                  <vs-td :data="data[indextr].slug">
                    {{data[indextr].slug}}
                  </vs-td>
                  <vs-td :data="data[indextr].descripcion">
                    {{ data[indextr].descripcion }}
                  </vs-td>
                  <vs-td class="actions">
                    <router-link :to="{name:'permission', params: {id: $route.params.id, idmodulo: tr.id}}">
                      <feather-icon icon="KeyIcon" svgClasses="h-5 w-5 mr-4 hover:text-warning cursor-pointer" />
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
      <module-create v-if="!editing" @closePrompt="close()"></module-create>
      <module-edit v-else @closePrompt="close()" :module="moduleToEdit"></module-edit>
    </v-dialog>
  </v-card>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import ModuleCreate from './Create'
import ModuleEdit from './Edit'

export default {
  components: {
    ModuleCreate,
    ModuleEdit
  },
  data: () => ({
    module: {},
    moduleToEdit: {},
    activePrompt: false,
    showModal: true,
    editing: false
  }),
  methods: {
    ...mapActions({
      'fetchRoleModules': 'role/fetchRoleModules',
      'removeModule': 'module/removeModule'
    }),
    handlePrompt(add) {
      this.activePrompt = true
      if (add) this.module = {}
    },
    close() {
      this.activePrompt = false
      this.module = {}
      this.editing = false
    },
    editRecord(module) {
      this.editing = true
      this.moduleToEdit = {
        ...module
      }
      this.activePrompt = true
    },
    confirmDeleteRecord(idmodule) {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: () => {
          this.deleteHandle(idmodule)
        }
      })
    },
    deleteHandle(idmodule) {
      this.removeModule(idmodule)
        .then(() => {
          this.$swal('Exito!', 'Modulo eliminado', 'success')
          this.$emit('closePrompt')
          this.fetchRoleModules(this.$route.params.id)
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error', 'error')
        })
    },
    toRole() {
      this.$router.push({
        name: 'role'
      })
    }
  },
  created() {
    this.fetchRoleModules(this.$route.params.id)
  },
  computed: {
    ...mapState({
      modules: state => state.role.roleModules
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

.btn-back {
  margin: 1rem 0;
  cursor: pointer;
  display: inline-block;
}
</style>