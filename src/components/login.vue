<template>
	<v-app id="login">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Formular Autentificare</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
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
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                    :rules="pwRules"
                    required
                  ></v-text-field>
                </v-form>
                <p class="mt-5">
                  Nu aveti cont?
                  <v-btn text small href="/register">Inregistrare</v-btn>
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn :disabled="!valid" @click="validate" color="primary"
                  >Autentificare</v-btn
                >
                <v-btn @click="signin" color="primary"
                  >Test</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

	export default {
		name: "Login",
		data: () => ({
    valid: true,
    email: "",
    emailRules: [
      (v) => !!v || "Camp obligatoriu",
      (v) => /.+@.+\..+/.test(v) || "Trebuie sa fie un email valid",
    ],
    password: "",
    pwRules: [
      (v) => !!v || "Camp obligatoriu",
      (v) => (v && v.length >= 8) || "Cel putin 8 caractere",
    ],
	}),
	computed: mapState(['authError', 'authenticated']),
		watch: {
			authenticated() {
				this.$router.push('/dashboard')
			}
		},
		methods: {
			validate() {
      const valid = this.$refs.form.validate();
      if (valid) {
				this.signin();
      }
    },
			signin() {
				this.$store.dispatch({
					type: 'signin',
					email: this.email,
					password: this.password
				})
				this.email = ''
				this.password = ''
			}
		}
	}
</script>

