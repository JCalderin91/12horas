<!-- =========================================================================================
  File Name: UserList.vue
  Description: User List page
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>

  <div id="page-user-create">

    
    <div> 

      <v-row >

        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <v-text-field class="inputx w-full" label="Nombres" placeholder="Nombres" v-model="user.nombres" :readonly="!editing"/>
        </v-col>

        <v-col lg="5" sm="5" xs="12" class="p-4 sm:p-2">
          <v-text-field class="inputx w-full" label="Teléfono" placeholder="Teléfono" v-model="user.telefono" :readonly="!editing"/>
        </v-col>

        <v-col lg="7" sm="7" xs="12" class="p-4 sm:p-2">
          <v-text-field type="email" class="inputx w-full" label="Correo" placeholder="Correo" v-model="user.correo" :readonly="!editing"/>
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field type="password" danger-text="Las contraseñas con coinciden" :danger="matchPasswords" class="inputx w-full" label="Contraseña" placeholder="Contraseña" v-model="user.password" :readonly="!editing"/>
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field type="password" :danger="matchPasswords" class="inputx w-full" label="Verificar contraseña" placeholder="Verificar contraseña" v-model="user.verified_password" :readonly="!editing"/>
        </v-col>  

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-select
                label="Estado"
                placeholder="Estado"
                class="selectExample w-full"
                v-model="user.status"
                :readonly="!editing"
              >
                <v-select-item value="Activo" text="Activo" />
                <v-select-item value="Inactivo" text="Inactivo" />
              </v-select>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-select
                label="Roles"
                placeholder="Roles"
                class="selectExample w-full"
                v-model="user.rol_id"
              >
                <v-select-item :value="rol.id" :text="rol.nombre" v-for="(rol, key) in roles" :key="key" />
              </v-select>
        </v-col>     


        <v-col sm="12" class="p-4 sm:p-2 flex justify-between">
          <v-btn @click="openConfirm()" color="danger"  :disabled="editing" class="mr-2">Eliminar</v-btn>

          <v-btn 
            @click="toAddress(user.idusuario)"
            color="warning"
            type="filled"
            :disabled="editing"
            class="mr-2">Direcciones</v-btn>

          <div class="flex justify-end">
            <v-btn v-if="!editing" @click="editUser()" color="primary" type="filled" class="mr-2">Editar</v-btn>
            <v-btn @click="cancel()" v-else color="danger"  class="mr-2">Cancelar</v-btn>
            <v-btn @click="saveUser()" :disabled="!editing" color="success" type="filled">Guardar</v-btn>            
          </div>
        </v-col>

      </v-row>
    </div>
  <!-- <div>{{user}}</div>  -->
  </div>

</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  props: {
    user: {
      type: Object
    },
    viewModal: {
      type: Boolean
    }
  },
  data () {
    return {
      editing: false,
      beforeEdit: {}
    }
  },
  methods: {
    ...mapActions({
      'removeUser'  :'user/removeUser',
      'updateUser'  :'user/updateUser',
      'fetchCategories'  :'category/fetchCategories'
    }),
    editUser () {
      this.beforeEdit = {...this.user}
      this.editing = !this.editing
    },
    saveUser () {
      this.updateUser(this.user)
        .then(() => {
          this.$swal('Exito!', 'Usuario actualizado','success')
          this.$emit('closePrompt')
          this.editing = !this.editing
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','danger')
        })
    },
    openConfirm () {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: () => this.deleteUser
      })
    },
    deleteUser () {
      this.removeUser(this.user.idusuario)
        .then(() => {          
          this.$swal('Exito!', 'Usuario eliminado','success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','danger')
        })
    },
    cancel () {
      if (this.editing) this.user = {...this.beforeEdit}
      else this.$emit('closePrompt')
      this.editing = !this.editing
    },
    toAddress (id) {
      this.$emit('closePrompt')
      this.$nextTick(() => {
        this.$router.push({name: 'address', params: {id}})
      })
    }
  },
  computed: {
    ...mapState({
      categoriesData: state => state.category.categories,
      roles: ({role}) => role.roles
    }),
    matchPasswords () {
      if (this.user.password.length > 0 && this.user.password !== this.user.verified_password) return true
      else return false 
    }
  },
  created () {
    this.fetchCategories()
  }
}

</script>
