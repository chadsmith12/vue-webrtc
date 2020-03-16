<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Signup</h1>
        <v-form ref="signUpForm" v-model="isFormValid">
          <v-text-field label="Email" type="email" v-model="email" :rules="emailRules"></v-text-field>
          <v-autocomplete label="Which browser do you use?" :items="browsers"></v-autocomplete>
          <v-file-input label="Attach profile picture"></v-file-input>
          <v-date-picker label="Birthday" v-model="birthday" readonly></v-date-picker>
          <v-checkbox
            label="Agree to terms and conditions"
            v-model="agreeToTerms"
            :rules="agreeToTermsRules"
            required
          ></v-checkbox>
          <v-btn class="mr-4" color="success" @click="validateForm">Validate Form</v-btn>
          <v-btn class="mr-4" type="submit" color="primary" :disabled="!isFormValid">Submit</v-btn>
          <v-btn class="mr-4" color="warning" @click="resetValidation">Reset Validation</v-btn>
          <v-btn class="mr-4" color="error" @click="resetForm">Reset</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Signup extends Vue {
  isFormValid = false;
  browsers = ["Chrome", "Firefox", "Safari", "Edge", "Brave"];
  birthday = "";
  email = "";
  agreeToTerms = false;
  agreeToTermsRules = [
    (value: string) =>
      !!value ||
      "You must agree to the terms and conditions to sign up for an account"
  ];
  emailRules = [
    (value: string) => !!value || "Email is required",
    (value: string) =>
      value.indexOf("@") !== 0 || "Email should have a username",
    (value: string) => value.includes("@") || "Email should include an @ symbol"
  ];
  $refs!: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    signUpForm: any;
  };

  resetValidation() {
    this.$refs.signUpForm.resetValidation();
  }

  resetForm() {
    this.$refs.signUpForm.reset();
  }

  validateForm() {
    this.$refs.signUpForm.validate();
  }
}
</script>