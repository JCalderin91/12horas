<template>
  <div id="page-user-create">
    <div> 
      <v-row >

        <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
          <v-text-field dense label="Nombres" placeholder="Nombres" v-model="user.nombres"/>
        </v-col>

        <v-col lg="5" sm="5" xs="12" class="p-4 sm:p-2">
          <v-text-field dense label="Teléfono" placeholder="Teléfono" v-model="user.telefono"/>
        </v-col>

        <v-col lg="7" sm="7" xs="12" class="p-4 sm:p-2">
          <v-text-field dense type="email" label="Correo" placeholder="Correo" v-model="user.correo"/>
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field dense type="password" danger-text="Las contraseñas con coinciden" :danger="matchPasswords" label="Contraseña" placeholder="Contraseña" v-model="user.password"/>
        </v-col>

        <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
          <v-text-field dense type="password" :danger="matchPasswords" label="Verificar contraseña" placeholder="Verificar contraseña" v-model="user.verified_password"/>
        </v-col>

        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <v-select
                label="Estado"
                placeholder="Estado"
                class="selectExample w-full"
                v-model="user.status"
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
  
        <v-col sm="12" class="p-4 sm:p-2 flex justify-end">
          <v-btn @click="cancel()" color="danger"  class="mr-2">Cancelar</v-btn>
          <v-btn @click="saveUser()" color="success" type="filled">Guardar</v-btn>            
        </v-col>
      </v-row>
    </div>
  </div>
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
      }
    }
  },
  methods: {
    ...mapActions({
      'addUser'      : 'user/addUser'      
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
          this.$swal('Alerta!', 'Ha ocurrido un error','danger')
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
  }
}

</script>

