<script setup>
</script>

<template>
    <div>
        <v-img class="mb-5" height="300" src="@/assets/spacelogo.png" />
    </div>
    <v-row class="mt-10">
        <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto"  max-width="400">
                <v-img class="align-end text-white" height="400" src="@/assets/AstroFunko.png"
                    cover>
                    <v-card-title>Action Figure Astronauta</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    R$ 149,99
                </v-card-subtitle>

                <v-card-actions class="justify-center mb-4">
                    <v-btn class="bg-primary" text="Comprar" :to="{ path: '/form-user' }"></v-btn>
                    
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="400" src="@/assets/Rocket.png"
                    cover>
                    <v-card-title>Miniatura Foguete Nasa</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    R$ 299,99
                </v-card-subtitle>

                <v-card-actions class="justify-center mb-4">
                    <v-btn class="bg-primary" text="Comprar" :to="{ path: '/form-user' }"></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="400" src="@/assets/Telescopio.png"
                    cover>
                    <v-card-title>Telescopio</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    R$ 599,00
                </v-card-subtitle>

                <v-card-actions class="justify-center mb-4">
                    <v-btn class="bg-primary" text="Comprar" :to="{ path: '/form-user' }"></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>