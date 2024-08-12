<script setup>
</script>

<template>
    <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Open Dialog"
        variant="flat"
      ></v-btn>
    </template>
  
    <template v-slot:default="{ isActive }">
      <v-card title="Dialog">
        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </v-card-text>
        <v-radio-group label="Radio group label">
        <v-radio label="Radio One" value="one"></v-radio>
        <v-radio label="Radio Two" value="two"></v-radio>
        <v-radio label="Radio Three" value="three"></v-radio>
        </v-radio-group>
  
        <v-card-actions>
          <v-spacer></v-spacer>
  
          <v-btn
            text="Close Dialog"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
