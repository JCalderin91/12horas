<template>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
        <v-list dense>
            <template v-for="item in items">
                <v-subheader v-if="item.heading" :key="item.heading">
                    {{ item.heading }}
                </v-subheader>  
                <v-list-group v-else-if="item.children" :key="item.text" v-model="item.model"
                    :prepend-icon="item.model ? item.icon : item['icon-alt']" append-icon="">
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title  class="text-left">
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-list-item v-for="(child, i) in item.children" :key="i" link>
                        <v-list-item-action v-if="child.icon">
                            <v-icon>{{ child.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="text-left">
                                {{ child.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-item v-else :key="item.text" link :to="{name: item.name}">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>            
                        <v-list-item-title class="text-left">
                            {{ item.text }}
                        </v-list-item-title>              
                    </v-list-item-content>
                </v-list-item>
            </template>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    data: () => ({
        items: [{
                icon: 'mdi-contacts',
                text: 'Productos',
                name: 'product-list'
             },
            {
                icon: 'mdi-history',
                text: 'Usuarios',
                name: 'user'
            },
            {
                icon: 'mdi-content-copy',
                text: 'Banners',
                name: 'banner'
            },
            {
                icon: 'mdi-content-copy',
                text: 'Categorias',
                name: 'category'
            },
            {
                icon: 'mdi-content-copy',
                text: 'Roles',
                name: 'role'
            },
            {
                icon: 'mdi-content-copy',
                text: 'Cofiguraciones',
                name: 'configuration'
            }
            // {
            //     icon: 'mdi-chevron-up',
            //     'icon-alt': 'mdi-chevron-down',
            //     text: 'More',
            //     model: false,
            //     children: [{
            //         text: 'Import'
            //     }, ],
            // },
        ],
    })
}
</script>