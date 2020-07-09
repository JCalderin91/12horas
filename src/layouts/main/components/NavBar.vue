<template>
    <v-app-bar dense :clipped-left="$vuetify.breakpoint.lgAndUp" app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="$emit('menu')"></v-app-bar-nav-icon>
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <span class="hidden-sm-and-down">12 Horas de fiesta</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-bell</v-icon>
        </v-btn>
        <v-btn icon large>

            <v-avatar size="32px" item>
                <v-img src="@/assets/logo.png" alt="Vuetify"></v-img>
            </v-avatar>
        </v-btn>
    </v-app-bar>
</template>

