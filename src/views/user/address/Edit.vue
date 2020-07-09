<template>
	<div>
		<v-row >
			<v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
				<v-text-field class="inputx w-full" label="Calle" placeholder="Calle" v-model="address.calle" />
			</v-col>
			<v-col lg="6" sm="6" xs="12" class="p-4 sm:p-2">
				<v-text-field class="inputx w-full" label="Colonia" placeholder="Colonia" v-model="address.colonia" />
			</v-col>
			<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
				<v-text-field type="number" class="inputx w-full" label="Num Ext" placeholder="Num Ext" v-model="address.numeroext" />
			</v-col>
			<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
				<v-text-field type="number" class="inputx w-full" label="Num Int" placeholder="Num Int" v-model="address.numeroint" />
			</v-col>
			<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
				<v-text-field class="inputx w-full" label="Referencia" placeholder="Referencia" v-model="address.referencia" />
			</v-col>
			<v-col lg="3" sm="3" xs="12" class="p-4 sm:p-2">
				<v-text-field type="number" class="inputx w-full" label="Codigo postal" placeholder="Codigo postal" v-model="address.codigopostal" />
			</v-col>
		</v-row>
		<br>
		<div class="flex justify-end">
			<v-btn @click="cancel()" color="danger"  class="mr-2">Cancelar</v-btn>
			<v-btn @click="saveAddresses()" color="success" type="filled">Guardar</v-btn>   
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	props: {
		address: {
			type: Object
		}
	},
	methods: {
		...mapActions({
			'updateAddress' : 'address/updateAddress',
			'fetchUserAddresses' : 'user/fetchUserAddresses',
		}),
		saveAddresses () {
			this.updateAddress(this.address)
				.then(() => {
					this.$swal('Exito!', 'Dirección actualizada','success')
					this.fetchUserAddresses(this.$route.params.id)
					this.$emit('closePrompt')
				})
				.catch(() => {
					this.$swal('Alerta!', 'Ha ocurrido un error','danger')
				})
		},
		cancel () {
			this.$emit('closePrompt')
		}
	}
}
</script>