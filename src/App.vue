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


    <!-- Reddit News -->
    <v-navigation-drawer
      temporary
      v-model="news_drawer"
      absolute
      right
      id="drawer_feed"
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Global Feeds
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>


      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>Reddit</span><v-icon dark>arrow_drop_down</v-icon>
        </v-toolbar-title>
        <v-list>
          <v-list-tile v-for="item in global_feeds" :key="item" @click="">
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>


      <v-divider></v-divider>
      <div v-for="post in reddit_sidebar_titles" class="social_feeds-row">
        <div class="social_feeds-article"><a target="blank" :href="'http://reddit.com'+post[3]">"{{post[0]}}"</a><span class="social_feeds-article-meta"> Score:{{post[1]}}, Comments:{{post[2]}}</span></div>
      </div> 
    </v-navigation-drawer>


    <v-toolbar id="toolbar" dark class='elevation-0'>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title>Crypto Dragnet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="news_drawer = !news_drawer">
        <v-icon>public</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>favorite</v-icon>
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
import axios from 'axios';
export default {
  name: "app",
  data() {
    return {
      drawer: false,
      favorite_drawer: false,
      news_drawer: false,
      reddit_sidebar_search: [],
      reddit_sidebar_titles: [],
      global_feeds: ['Reddit', 'Twitter', 'News'],
    };
  },
  methods:{
    getRedditSideBarSearch: function (){
      axios.get("https://www.reddit.com/r/cryptocurrency/search.json?restrict_sr=on&limit=15&sort=top&t=day")
      .then(response => {
          this.reddit_sidebar_search = response.data.data;
          var reddit_data_ = this.reddit_sidebar_search.children;
          console.log(reddit_data_);
          let titles = [];  
          let titles_ = [];  
          //var rt_counter = (reddit_data_.length > 10 ? rt_counter = 10 : rt_counter = reddit_data_.length);            
          reddit_data_.sort((a,b) => { return b.data.num_comments - a.data.num_comments});
          for(var i = 0; i < 15; i++){
              titles_ = [];
              titles_.push(reddit_data_[i].data.title);
              titles_.push(reddit_data_[i].data.score);
              titles_.push(reddit_data_[i].data.num_comments);
              titles_.push(reddit_data_[i].data.permalink);
              titles_.push(reddit_data_[i].data.created);
              titles.push(titles_);
          }
          this.reddit_sidebar_titles = titles;
      })
    }
  },
  mounted: function () {
    this.getRedditSideBarSearch();
  }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
.application {
  font-family: inherit !important;
  line-height: inherit !important;
  &.theme--light {
    background: inherit !important;
    .theme--light.icon {
      color: inherit !important;
    }
    .icon {
      color: inherit !important;
    }
  }
}
</style>
