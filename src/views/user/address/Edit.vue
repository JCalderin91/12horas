<template>
	<v-card :loading="loading">
		<v-card-title>Fomulario de dirección</v-card-title>
		<v-card-text>
			<v-row >
				<v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
					<v-text-field  label="Calle" placeholder="Calle" v-model="address.calle" />
				</v-col>
				<v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
					<v-text-field  label="Colonia" placeholder="Colonia" v-model="address.colonia" />
				</v-col>
				<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
					<v-text-field type="number"  label="Num Ext" placeholder="Num Ext" v-model="address.numeroext" />
				</v-col>
				<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
					<v-text-field type="number"  label="Num Int" placeholder="Num Int" v-model="address.numeroint" />
				</v-col>
				<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
					<v-text-field  label="Referencia" placeholder="Referencia" v-model="address.referencia" />
				</v-col>
				<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
					<v-text-field type="number"  label="Codigo postal" placeholder="Codigo postal" v-model="address.codigopostal" />
				</v-col>
			</v-row>
			<br>
			<div class="d-flex justify-end">
				<v-btn @click="cancel()" color="danger"  class="mr-2">Cancelar</v-btn>
				<v-btn @click="saveAddresses()" color="success" >Guardar</v-btn>   
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	props: {
		address: {
			type: Object
		}
	},
	data: () => ({
		loading: false
	}),
	methods: {
		...mapActions({
			'updateAddress' : 'address/updateAddress',
			'fetchUserAddresses' : 'user/fetchUserAddresses',
		}),
		saveAddresses () {
			this.loading = true
			this.updateAddress(this.address)
				.then(() => {
					this.$swal('Exito!', 'Dirección actualizada','success')
					this.fetchUserAddresses(this.$route.params.id)
					this.$emit('closePrompt')
				})
				.catch(() => {
					this.$swal('Alerta!', 'Ha ocurrido un error','error')
				})
				.then(() => this.loading = false)
		},
		cancel () {
			this.$emit('closePrompt')
		}
	}
}
</script>