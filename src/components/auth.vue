<template>
  <v-app id="home">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>
                  Creati un cont sau autentificati-va
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-img
                alt="logo"
                src="https://madewithvuejs.com/mandant/madewithvuejs/images/logo-vuetify.png"
                class="ma-4"
              ></v-img>
              <div class="text-center py-2">
                <v-btn large href="/login" color="primary" class="ma-2"
                  >Autentificare</v-btn
                >
                <v-btn large href="/register" color="secondary" class="ma-2"
                  >Inregistrare</v-btn
                >
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<!-- <div>
	<div class="error">
		{{ authError }}
	</div>
	<signin />
	<signup />
</div> -->

<script>
	import { mapState } from 'vuex'

	export default {
		computed: mapState(['authError', 'authenticated']),
		watch: {
			authenticated() {
				this.$router.push('/dashboard')
			}
		}
	}
</script>
