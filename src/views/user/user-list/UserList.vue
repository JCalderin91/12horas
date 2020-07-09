<template>

  <div id="page-user-list">


    <div>

      <div class="flex justify-between">
        <h4>{{$route.meta.pageTitle}}</h4>
        <v-btn @click="handleSelected(true)" color="success" type="filled">Agregar</v-btn>
      </div>


      <vs-table stripe noDataText="No hay datos" search max-items="10" pagination v-model="selectedUser"
        @selected="handleSelected()" :data="usersData">

        <template slot="thead">
          <vs-th sort-key="nombres">Nombres</vs-th>
          <vs-th sort-key="telefono">Teléfono</vs-th>
          <vs-th sort-key="correo">Correo</vs-th>
          <vs-th sort-key="status">Estado</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

            <vs-td :data="data[indextr].nombres">
              {{ data[indextr].nombres }}
            </vs-td>

            <vs-td :data="data[indextr].telefono">
              {{ data[indextr].telefono }}
            </vs-td>

            <vs-td :data="data[indextr].correo">
              {{ data[indextr].correo }}
            </vs-td>

            <vs-td :data="data[indextr].status">
              {{ data[indextr].status }}
            </vs-td>

          </vs-tr>
        </template>
      </vs-table>

    </div>

    <v-dialog title="Usuario" @cancel="val=''" @close="close" buttons-hidden class="custom" v-model="activePrompt">
      <user-create v-if="!viewModal" @closePrompt="close()"></user-create>
      <user-edit v-else @closePrompt="close()" :user="{...user}"></user-edit>
    </v-dialog>

  </div>

</template>

<script>
import UserCreate from '..//user-form/UserCreate'
import UserEdit from '..//user-form/UserEdit'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    UserCreate,
    UserEdit
  },
  data() {
    return {
      activePrompt: false,
      viewModal: true,
      selectedUser: {},
      user: {}
    }

  },
  methods: {
    ...mapActions({
      'fetchUsers': 'user/fetchUsers',
      'fetchRoles': 'role/fetchRoles',
    }),
    handleSelected(add) {
      this.activePrompt = true
      if (add) {
        this.user = {}
        this.viewModal = false
      } else {
        this.user = this.selectedUser
        this.viewModal = true
      }
    },
    close() {
      this.selectedUser = {}
      this.promptConfig = {}
      this.user = {}
      this.activePrompt = false
    }
  },
  computed: {
    ...mapState({
      usersData: ({
        user
      }) => user.users
    })
  },
  created() {
    this.fetchRoles()
    this.fetchUsers()
      .catch(() => {
        this.$swal('Alerta!', 'Ha ocurrido un error', 'danger')
      })
  }
}

</script>
