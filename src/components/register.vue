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
                    id="password2"
                    label="Confirmare Parola"
                    name="password2"
                    prepend-icon="mdi-repeat"
                    type="password"
                    v-model="password2"
                    :rules="[
                      password === password2 || 'Parolele trebuie sa coincida',
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
                <v-btn color="primary" @click="signup"
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
	export default {
		data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "Camp obligatoriu"],
    email: "",
    emailRules: [
      (v) => !!v || "Camp obligatoriu",
      (v) => /.+@.+\..+/.test(v) || "Trebuie sa fie un email valid",
    ],
    password: "",
    passwordRules: [
      (v) => !!v || "Camp obligatoriu",
      (v) => (v && v.length >= 8) || "Cel putin 8 caractere",
    ],
    password2: "",
  }),
		methods: {
			validate() {
				const valid = this.$refs.form.validate();
				if (valid) {
					this.signup();
				}
    	},
			signup() {
				this.$store.dispatch({
					type: 'signup',
					name: this.name,
					email: this.email,
					password: this.password
				})
				this.name = ''
				this.email = ''
				this.password = ''
				this.password2 = ''
			}
		}
	}
</script>