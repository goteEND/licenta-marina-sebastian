<template>
  <v-app id="register">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Formular Inregistrare</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Nume"
                    name="name"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="name"
                    :rules="nameRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-at"
                    type="text"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Parola"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="passwordRules"
                    required
                  ></v-text-field>

                  <v-text-field
                    id="confirm_password"
                    label="Confirmare Parola"
                    name="confirm_password"
                    prepend-icon="mdi-repeat"
                    type="password"
                    v-model="confirm_password"
                    :rules="[
                      password === confirm_password ||
                        'Parolele trebuie sa coincida'
                    ]"
                    required
                  ></v-text-field>
                </v-form>
                <p class="mt-5">
                  Aveti deja cont?
                  <v-btn text small href="/login">Autentificare</v-btn>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="validate"
                  >Inregistrare</v-btn
                >
                <v-btn color="primary" @click="registerUser">Test</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["msg"],
  data() {
    return {
      valid: true,
      name: "",
      nameRules: [v => !!v || "Camp obligatoriu"],
      email: "",
      emailRules: [
        v => !!v || "Camp obligatoriu",
        v => /.+@.+\..+/.test(v) || "Trebuie sa fie un email valid"
      ],
      password: "",
      passwordRules: [
        v => !!v || "Camp obligatoriu",
        v => (v && v.length >= 8) || "Cel putin 8 caractere"
      ],
      confirm_password: ""
    };
  },
  methods: {
    validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.registerUser();
      }
    },
    ...mapActions(["register"]),
    registerUser() {
      let user = {
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        name: this.name
      };
      this.register(user).then(res => {
        if (res.data.success) {
          this.$router.push("login");
        }
      });
    }
  }
};
</script>

<style>
.card {
  width: 60%;
  border-radius: 0;
}
.btn {
  border-radius: 0;
}
.form-control {
  border-radius: 0;
}
</style>
