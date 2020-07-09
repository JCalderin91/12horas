<template>

  <v-card>

    <v-card-text>

      <v-data-table :loading="loading" :headers="headers" :items="users" :search="search">
        <template v-slot:item.url_imagen="{item}">
          <v-avatar size="36px">
            <img alt="Avatar" :src="item.url_imagen">
          </v-avatar>
        </template>
        <template v-slot:item.actions="{item}">
          <div class="d-flex">
            <v-btn @click="handleSelected(item)" small fab text>
              <v-icon>mdi-playlist-edit</v-icon>
            </v-btn>
            <v-btn @click="confirmDeleteRecord(item.idbanner)" small fab text>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>

    </v-card-text>

    <v-btn @click="handleSelected()" bottom color="success" dark small fab fixed right>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

    <v-dialog v-model="activePrompt">
      <user-create v-if="viewModal" @closePrompt="close()"></user-create>
      <user-edit v-else @closePrompt="close()" :user="{...user}"></user-edit>
    </v-dialog>

  </v-card>

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
      user: {},
      loading: false,
      search: '',
      headers: [
          {
            text: 'Nombres',
            value: 'nombres',
          },
          {
            text: 'Telefono',
            value: 'telefono'
          },
          {
            text: 'Correo',
            value: 'correo'
          },
          {
            text: 'Estado',
            value: 'status'
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
      'fetchUsers': 'user/fetchUsers'
    }),
    handleSelected(user) {
      this.activePrompt = true
      if (user) {
        this.user = user
        this.viewModal = false        
      } else {
        this.user = {}
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
      users: ({
        user
      }) => user.users
    })
  },
  created() {
    this.loading = true
    this.fetchUsers()
      .catch(() => this.$swal('Alerta!', 'Ha ocurrido un error','error'))
      .then(() => this.loading = false )
  }
}

</script>
