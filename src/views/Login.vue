<template>
  <v-card width="400" class="mx-auto mt-5">
    <v-card-title>
      <h1 class="display-1">Login</h1>
    </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field label="Username" prepend-icon="mdi-account-circle"></v-text-field>
        <v-text-field
          :type="passwordType"
          label="Password"
          prepend-icon="mdi-lock"
          :append-icon="passwordIcon"
          @click:append="togglePassword"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn color="success">Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn color="info">Login</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  showPassword = false;

  get passwordType() {
    return this.showPassword ? "text" : "password";
  }

  get passwordIcon() {
    return this.showPassword ? "mdi-eye" : "mdi-eye-off";
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
</script>