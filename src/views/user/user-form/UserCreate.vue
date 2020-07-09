<template>
  <v-card>
    <v-card-title>Formulario de usuario</v-card-title>
    <v-card-text>
      <v-row>

        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <v-text-field outlined dense label="Nombres" placeholder="Nombres" v-model="user.nombres" />
        </v-col>

        <v-col lg="5" sm="5" xs="12" class="p-4 sm:p-2">
          <v-text-field outlined dense label="Teléfono" placeholder="Teléfono" v-model="user.telefono" />
        </v-col>

        <v-col lg="7" sm="7" xs="12" class="p-4 sm:p-2">
          <v-text-field outlined dense type="email" label="Correo" placeholder="Correo" v-model="user.correo" />
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field outlined dense type="password" danger-text="Las contraseñas con coinciden"
            :danger="matchPasswords" label="Contraseña" placeholder="Contraseña" v-model="user.password" />
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field outlined dense type="password" :danger="matchPasswords" label="Verificar contraseña"
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

        <v-col sm="12" class="d-flex justify-end">
          <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
          <v-btn @click="saveUser()" color="success">Guardar</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

import {mapActions, mapState} from 'vuex'

export default {
  data () {
    return {
      beforeEdit: {},
      user: {
        password: '',
        verified_password: '',
        correo: ''
      },
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
    }
  },
  methods: {
    ...mapActions({
      'addUser'      : 'user/addUser',  
      'fetchRoles'      : 'role/fetchRoles'  
    }),
    saveUser () {
      this.user = {
        ...this.user,
        token: '',
        customer_id: ''
      }
      this.addUser(this.user)
        .then(() => {
          this.$swal('Exito!', 'Usuario guardado','success')
          this.cancel()
        })
        .catch(() => {
          this.$swal('Alerta!', 'Ha ocurrido un error','error')
        })

    },
    cancel () {
      this.$emit('closePrompt')
    }
  },
  computed: {
    ...mapState({
      roles: ({role}) => role.roles 
    }),
    matchPasswords () {
      if (this.user.password.length > 0 && this.user.password !== this.user.verified_password) return true
      else return false 
    }
  },
  mounted () {
    this.fetchRoles()
  }
}

</script>

