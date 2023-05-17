<template>
  <v-app>
 <v-card>
      <v-layout>
        <v-app-bar class="bg-brown-darken-1">
          <div class="d-flex">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
          </div>

          <v-app-bar-title>Logo</v-app-bar-title>

          <v-spacer></v-spacer>
          <div>
            <v-responsive class="d-none d-sm-flex mr-5" width="300">
              <v-text-field
                density="compact"
                variant="outlined"
                label="Search"
                append-inner-icon="mdi-magnify"
                single-line
                hide-details
                class="bg-white"
              ></v-text-field>
            </v-responsive>
          </div>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" class="bg-brown-lighten-3">
          <v-list>
            <v-list-item
              prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
              title="Muhammad Haseeb"
              subtitle="haseebn2868@gmail.com"
            ></v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-list density="compact" nav>
            <v-list-item to="/" prepend-icon="mdi-home" title="Home" value="myfiles"></v-list-item>
            <v-list-item
              to="/about"
              prepend-icon="mdi-information"
              title="About"
              value="starred"
            ></v-list-item>
            <v-list-item class="d-flex d-sm-none">
              <v-responsive class="mx-auto" width="344">
                <v-text-field
                  density="compact"
                  variant="outlined"
                  label="Search"
                  append-inner-icon="mdi-magnify"
                  single-line
                  hide-details
                  class="bg-white"
                ></v-text-field>
              </v-responsive>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>

        <v-main style="min-height: 100vh;"><router-view></router-view></v-main>
      </v-layout>
    </v-card>
    </v-app>
</template>
<script>
export default 
{
  data(){
    return{
      drawer : false,
    }
  }
}
</script>
