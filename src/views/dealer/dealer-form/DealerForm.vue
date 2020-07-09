<template>

  <div id="page-user-create">


    <div>

      <v-row>
        <v-col lg="8" sm="8" xs="12" class="p-4 sm:p-2">
          <v-row>
            <v-col lg="12" sm="12" xs="12" class="p-4 sm:p-2">
              <v-text-field  label="Nombres y Apellidos" placeholder="Nombres y Apellidos"
                v-model="dealer.name" :readonly="!editing" />
            </v-col>
            <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
              <v-text-field  label="Teléfono" placeholder="Teléfono" v-model="dealer.price"
                :readonly="!editing" />
            </v-col>
            <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
              <v-select label="Tipo" placeholder="Tipo" multiple vs-autocomplete class="selectExample w-full"
                v-model="dealer.category_id" :readonly="!editing">
                <v-select-item value="1" text="Principal" />
                <v-select-item value="2" text="Auxiliar" />
              </v-select>
            </v-col>
            <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
              <v-text-field  label="Usuario" placeholder="Usuario" v-model="dealer.discount"
                :readonly="!editing" />
            </v-col>
            <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
              <v-text-field  label="Contraseña" placeholder="Contraseña" v-model="dealer.price"
                :readonly="!editing" />
            </v-col>
            <v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
              <v-text-field  label="Confirmar contraseña" placeholder="Confirmar contraseña"
                v-model="dealer.discount" :readonly="!editing" />
            </v-col>


          </v-row>
        </v-col>
        <v-col lg="4" sm="4" xs="12" class="p-4 sm:p-2">
          <div class="imagen-input">
            <small for="">Foto de perfil</small>
            <v-image-input v-model="dealer.img" :image-quality="0.85" clearable image-format="jpeg"
              uploadIcon="Cargar imagen" clearIcon="X" hideActions imageMinScaling="contain" overlayPadding="3px"
              :imageHeight="190" fullWidth :readonly="!editing && viewModal" />
          </div>
        </v-col>

        <v-col v-if="viewModal" sm="12" class="p-4 sm:p-2 flex justify-between">
          <v-btn @click="openConfirm()" color="danger" :disabled="editing" class="mr-2">Eliminar</v-btn>
          <div class="d-flex justify-end">
            <v-btn v-if="!editing" @click="editDealer()" color="primary"  class="mr-2">Editar</v-btn>
            <v-btn @click="cancel()" v-else color="danger" class="mr-2">Cancelar</v-btn>
            <v-btn @click="updateDealer()" :disabled="!editing" color="success" >Guardar</v-btn>
          </div>
        </v-col>

        <v-col v-else sm="12" class="p-4 sm:p-2 flex justify-end">
          <v-btn @click="cancel()" color="danger" class="mr-2">Cancelar</v-btn>
          <v-btn @click="saveDealer()" :disabled="!editing" color="success" >Guardar</v-btn>
        </v-col>

      </v-row>
    </div>
    <!-- <pre>{{dealer}}</pre> -->
  </div>

</template>

<script>
import VImageInput from 'vuetify-image-input'
export default {
  components: {
    VImageInput
  },
  props: {
    dealer: {
      type: Object
    },
    viewModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      beforeEdit: {}
    }
  },
  methods: {
    editDealer() {
      this.beforeEdit = {
        ...this.dealer
      }
      this.editing = !this.editing
    },
    saveDealer() {
      this.$notify({
        color: 'success',
        title: 'Exito',
        text: 'Dealero guardado'
      })
      this.editing = false
    },
    openConfirm() {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirmar',
        text: '¿Está seguro de eliminar?',
        accept: this.deleteDealer
      })
    },
    deleteDealer() {
      this.$notify({
        color: 'success',
        title: 'Exito',
        text: 'Dealero eliminado'
      })
      this.$emit('closePrompt')
    },
    cancel() {
      if (this.editing) this.dealer = {
        ...this.beforeEdit
      }
      else this.$emit('closePrompt')
      this.editing = !this.editing
    }
  }
}

</script>

<style lang="scss">
vbtn{
  margin: 3px;
  border-radius: 3px;
  padding: 5px 8px;
  cursor:pointer;
  background-color: red;
  color: white;

}
</style>