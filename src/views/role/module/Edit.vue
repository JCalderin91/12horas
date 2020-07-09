<template>
	<div>
		<v-text-field class="inputx w-full" label="Nombre" placeholder="Nombre" v-model="module.nombre" />
		<v-text-field class="inputx w-full" label="Slug" placeholder="Slug" v-model="module.slug" />
		<br>
		<v-textarea label="Descripción" v-model="module.descripcion" />
		<div class="flex justify-end">
			<v-btn @click="cancel()" color="danger"  class="mr-2">Cancelar</v-btn>
			<v-btn @click="saveModule()" color="success" type="filled">Guardar</v-btn>   
		</div>
	</div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
	props: {
		module: {
			type: Object
		}
	},
	methods: {
		...mapActions({
			'updateModule' : 'module/updateModule',
			'fetchRoleModules' : 'role/fetchRoleModules'
		}),
		saveModule () {
			this.updateModule(this.module)
				.then(() => {
					this.$swal('Exito!', 'Modulo actualizado','success')
					this.$emit('closePrompt')
					this.fetchRoleModules(this.$route.params.id)
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