<script setup>
</script>

<template>
    <div>
        <v-img class="mb-5" height="300" src="@/assets/spacelogo.png" />
    </div>
    <v-row class="mt-10">
        <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    Number 10
                </v-card-subtitle>

                <v-card-text>
                    <div>Whitehaven Beach</div>
                    <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="blue" text="Comprar" :to="{ path: '/form-user' }"></v-btn>
                    
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    Number 10
                </v-card-subtitle>

                <v-card-text>
                    <div>Whitehaven Beach</div>
                    <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="blue" text="Comprar" :to="{ path: '/form-user' }"></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4">
            <v-card class="mx-auto" max-width="400">
                <v-img class="align-end text-white" height="200" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                    cover>
                    <v-card-title>Top 10 Australian beaches</v-card-title>
                </v-img>

                <v-card-subtitle class="pt-4">
                    Number 10
                </v-card-subtitle>

                <v-card-text>
                    <div>Whitehaven Beach</div>
                    <div>Whitsunday Island, Whitsunday Islands</div>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="blue" text="Comprar" :to="{ path: '/form-user' }"></v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</template>