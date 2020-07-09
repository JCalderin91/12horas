<template>
	<div>
		<v-text-field class="inputx w-full" label="Nombre" placeholder="Nombre" v-model="permission.nombre" />
		<v-text-field class="inputx w-full" label="Slug" placeholder="Slug" v-model="permission.slug" />
		<br>
		<div class="flex justify-end">
			<v-btn @click="cancel()" color="danger"  class="mr-2">Cancelar</v-btn>
			<v-btn @click="savePermission()" color="success" type="filled">Guardar</v-btn>   
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	props: {
		permission: {
			type: Object
		}
	},
	methods: {
		...mapActions({
			'updatePermission' : 'permission/updatePermission',
			'fetchModulePermissions' : 'module/fetchModulePermissions'
		}),
		savePermission () {
			this.permission = {
				...this.permission,
				status: true,
				modulo_id: this.$route.params.idmodulo
			}
			this.updatePermission(this.permission)
				.then(async () => {
					await this.fetchModulePermissions(this.$route.params.idmodulo)
					this.$swal('Exito!', 'Permiso actualizado','success')
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