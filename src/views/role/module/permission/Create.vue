<template>
	<v-card>
		<v-card-title>Formulario de permiso</v-card-title>
		<v-card-text>
			<v-text-field  label="Nombre" placeholder="Nombre" v-model="permission.nombre" />
			<v-text-field  label="Slug" placeholder="Slug" v-model="permission.slug" />
			<br>
			<div class="d-flex justify-end">
				<v-btn @click="cancel()" color="danger"  class="mr-2">Cancelar</v-btn>
				<v-btn @click="savePermission()" color="success" >Guardar</v-btn>   
			</div>
		</v-card-text>
	</v-card>
</template>

<script>
	import {mapActions} from 'vuex'
	export default {
		data: () => ({
			permission: {}
		}),
		methods: {
			...mapActions({
				'addPermission' : 'permission/addPermission',
				'fetchModulePermissions' : 'module/fetchModulePermissions'
			}),
			savePermission () {
				this.permission = {
					...this.permission,
					status: true,
					modulo_id: this.$route.params.idmodulo
				}
				this.addPermission(this.permission)
					.then(async () => {
						await this.fetchModulePermissions(this.$route.params.idmodulo)
						this.$swal('Exito!', 'Permiso actualizado','success')
						this.$emit('closePrompt')
					})
					.catch(() => {
						this.$swal('Alerta!', 'Ha ocurrido un error','error')
					})
			},
			cancel () {
				this.$emit('closePrompt')
			}
		}
	}
</script>