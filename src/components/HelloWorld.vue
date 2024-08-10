<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">
      <div class="text-center">

      </div>
      <v-img class="mb-5" height="300" src="@/assets/spacelogo.png" />

      <div class="py-4" />

      <v-row class="justify-center">


        <v-col cols="6">
          <v-card append-icon="mdi-shopping" class="py-3 w-75 ms-10" color="light-blue-lighten-1"
          :to="{ path: '/offers' }" rel="noopener noreferrer" rounded="lg"
            subtitle="Confira nossos produtos." title="Ver ofertas" variant="text">
            <template v-slot:title>
              <span class="text-white">Ver ofertas</span>
            </template>

            <!-- Subtítulo com cor de texto branca -->
            <template v-slot:subtitle>
              <span class="text-white">Confira nossos produtos.</span>
            </template>
            <v-overlay opacity=".06" scrim="primary" contained model-value persistent />
          </v-card>
        </v-col>


      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
//
</script>
