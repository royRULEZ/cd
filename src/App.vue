<template>
  <v-app>
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
    >
      <v-list class="pa-1">
        
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        
      </v-list>
    </v-navigation-drawer>

    <v-toolbar id="toolbar" dark class='elevation-0'>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Crypto Dragnet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      Footer
    </v-footer>
  </v-app>  
</template>

<script>
export default {
  name: "app",
  data () {
    return {
      drawer: false
    }
  }
};
</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
  .application{
    font-family: inherit !important;
    line-height: inherit !important;
    &.theme--light{
      background: inherit !important;
      .theme--light.icon{
          color: inherit !important;
      }
      .icon{
          color: inherit !important;
      }
    }
  }
</style>
