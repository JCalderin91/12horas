<template>

  <v-card>
    <v-card-title>Formulario de usuario</v-card-title>

    <v-card-text>
      <v-row>

        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <v-text-field label="Nombres" placeholder="Nombres" v-model="user.nombres" />
        </v-col>

        <v-col lg="5" sm="5" xs="12" class="p-4 sm:p-2">
          <v-text-field label="Teléfono" placeholder="Teléfono" v-model="user.telefono" />
        </v-col>

        <v-col lg="7" sm="7" xs="12" class="p-4 sm:p-2">
          <v-text-field type="email" label="Correo" placeholder="Correo" v-model="user.correo" />
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field type="password" danger-text="Las contraseñas con coinciden" :danger="matchPasswords"
            label="Contraseña" placeholder="Contraseña" v-model="user.password" />
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field type="password" :danger="matchPasswords" label="Verificar contraseña"
            placeholder="Verificar contraseña" v-model="user.verified_password" />
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-select dense outlined label="Estado(s)" :items="status" v-model="user.status">
              </v-select>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-select dense outlined label="Rol(es)" item-text="nombre" item-value="id"
                :items="roles" v-model="user.rol_id">
              </v-select>
        </v-col>


        <v-col sm="12" class="d-flex">
          <v-btn @click="openConfirm()" color="error" outlined class="mr-2">Eliminar</v-btn>

          <v-btn @click="toAddress(user.idusuario)" color="warning" class="mr-2">Direcciones</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
          <v-btn @click="saveUser()" color="success">Guardar</v-btn>
        </v-col>

      </v-row>
    </v-card-text>
    <!-- <div>{{user}}</div>  -->
  </v-card>

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
  data: () => ({
    status: [
      {
        text: 'Activo',
        value: 'Activo'
      },
      {
        text: 'Inactivo',
        value: 'Inactivo'
      },
    ]
  }),
  methods: {
    ...mapActions({
      'removeUser'  :'user/removeUser',
      'updateUser'  :'user/updateUser',
      'fetchCategories'  :'category/fetchCategories',
      'fetchRoles'  :'role/fetchRoles',
    }),
    editUser () {
      this.beforeEdit = {...this.user}
    },
    saveUser () {
      this.updateUser(this.user)
        .then(() => {
          this.$swal('Exito!', 'Usuario actualizado','success')
          this.$emit('closePrompt')
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','error')
        })
    },
    openConfirm () {
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
          this.removeProduct(this.user.idusuario)
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
    },
    cancel () {
      this.$emit('closePrompt')
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
    this.fetchRoles()
  }
}

</script>
