<template>
  <v-app>

    <!-- Menu -->
    <v-navigation-drawer
      temporary
      v-model="drawer"
      absolute
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              Menu
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list dense class="pt-0">
        <v-list-tile @click="goHome">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
      </v-list>      
    </v-navigation-drawer>
    <!-- /Menu -->

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
    <!-- /Reddit News -->

    <!-- Toolbar -->
    <v-toolbar id="toolbar" dark class='elevation-0'>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-spacer></v-spacer>
      <v-toolbar-title @click="goHome">Crypto Dragnet</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="news_drawer = !news_drawer">
        <v-icon>public</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>favorite</v-icon>
      </v-btn>      
    </v-toolbar>
    <!-- /Toolbar -->

  
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <!-- Disclaimer -->
    <v-dialog v-model="dislaimer_dialog" scrollable max-width="600px">
      <v-card>
        <v-card-title>CryptoDragnet.com Disclaimer</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          All stock recommendations and comments are the opinion of writer.
          Investors should be cautious about any and all stock recommendations and should consider the source of any advice on stock selection. Various factors, including personal ownership, may influence or factor into a stock analysis or opinion.
          All investors are advised to conduct their own independent research into individual stocks before making a purchase decision. In addition, investors are advised that past stock performance is not indicative of future price action.
          You should be aware of the risks involved in stock investing, and you use the material contained herein at your own risk. Neither AnalysisTime.com nor any of its suppliers guarantee its accuracy or validity, nor are they responsible for any errors or omissions which may have occurred. The analysis, ratings, and/or recommendations made by AnalysisTime.com, and/or any of its suppliers do not provide, imply, or otherwise constitute a guarantee of performance.
          AnalysisTime.com is comprised of reports, if any, embodying a unique system of stock analysis. Accuracy and completeness cannot be guaranteed. Users should be aware of the risks involved in stock investments. It should not be assumed that future results will be profitable or will equal past performance, real, indicated or implied.
          The material on this website are provided for information purpose only. AnalysisTime.com does not accept liability for your use of the website. The website is provided on an “as is” and “as available” basis, without any representations, warranties or conditions of any kind.
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click.native="dislaimer_dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- /Disclaimer -->

    <!-- Footer-->
    <v-footer app>
      <div id="footer_container">
        <div id="disclaimer">
          <v-icon>warning</v-icon>
          <a @click="dislaimer_dialog = !dislaimer_dialog">Read the Disclaimer</a>
          <span>The material on this website are provided for information purpose only.</span>
          <span>CyrptoDragnet.com does not accept liability for your use of the website.</span>
        </div>
        <div id="footer_content">
          <div id="footer_content-inner">
            <div>© {{ new Date().getFullYear() }}</div>
          </div>
        </div>
      </div>
    </v-footer>
    <!-- /Footer-->

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
      dislaimer_dialog: false
    };
  },
  methods:{
    getRedditSideBarSearch: function (){
      axios.get("https://www.reddit.com/r/cryptocurrency/search.json?restrict_sr=on&limit=15&sort=top&t=hour")
      .then(response => {
          this.reddit_sidebar_search = response.data.data;
          var reddit_data_ = this.reddit_sidebar_search.children;
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
    },
    goHome: function (){
      this.$router.push({path: '/',});
    }
  },
  mounted: function () {
    this.getRedditSideBarSearch();
  }
};
</script>

<style lang="scss">
@import "./assets/scss/main.scss";
@import './assets/icons/cryptocoins.css';
@import './assets/icons/cryptocoins-colors.css';
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
