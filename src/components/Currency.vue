<template>
  <div>
    <div id="currency_container">

        
        <div class="currency_row-children" id="currency_row-1">
            <div id="coin_meta" class="currency_row-50">
                <div id="symbol">
                    {{coin_basic[0].symbol}}
                    <span id="currency-current_price">{{coin_basic[0].price_usd | Price}}</span>
                </div>
                <div id="name-row" >
                    <img src='https://www.stellar.org/wp-content/themes/stellar/images/stellar-rocket-300.png'/>
                    <span id="name">{{coin_basic[0].id}}</span>
                    <span id="currency-current_change_1h" class="green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_1h)}">({{coin_basic[0].percent_change_1h}}%)</span>
                </div>
            </div>
            <div id="ad" class="currency_row-50">
                Ads
            </div>
        </div>
        
        <div class="currency_row-children clearfix"  id="currency_row-0">
            <div class="currency_row-25" id="header-1">
                <div class="r0-title">Graph Overlay: Reddit Activity, Twitter Activity Price</div>
            </div>
            <div class="currency_row-25" id="header-3">
                <div class="r0-title">Google Trends: {{coin_basic[0].id}}</div>
                <line-chart :chart-data="GoogleChart_data" :options="{responsive: true, maintainAspectRatio: false, legend: { display: false }, scales:{yAxes:[{ticks:{suggestedMax:100}}], xAxes:[{display:false}]}}"></line-chart>    
            </div>
            <div class="currency_row-25" id="header-4">
                <div class="r0-title">CTA</div>
            </div>
        </div>

        <div class="currency_row-children clearfix" id="currency_row-2">
            <div class="currency_row-33" id="market-basics">
                <div class="currency_row-2-title"><span class="primary-text">{{coin_basic[0].symbol}}</span> Market Data</div>
                <div class="market_basics-row">
                    <span class="market_basics-row-key">Market Cap</span>
                    <span class="market_basics-row-value">{{coin_basic[0].market_cap_usd | Currency}}</span>
                </div>          
                <div class="market_basics-row">
                    <span class="market_basics-row-key">Volume (24hr)</span>
                    <span class="market_basics-row-value">{{coin_basic[0].a24h_volume_usd | Currency}}</span>
                </div>
                <div class="market_basics-row">
                    <span class="market_basics-row-key">Circulating Supply</span>
                    <span class="market_basics-row-value">{{coin_basic[0].available_supply | Currency}}</span>
                </div>
                <div class="market_basics-row">
                    <span class="market_basics-row-key">Total Supply</span>
                    <span class="market_basics-row-value">{{coin_basic[0].total_supply | Currency}}</span>
                </div>
                <div class="market_basics-row">
                    <span class="market_basics-row-key">1 Hour</span>
                    <span class="market_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_1h)}">{{coin_basic[0].percent_change_1h}}%</span>
                </div>
                <div class="market_basics-row">
                    <span class="market_basics-row-key">24 Hours</span>
                    <span class="market_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_24h)}">{{coin_basic[0].percent_change_24h}}%</span>
                </div>
                <div class="market_basics-row">
                    <span class="market_basics-row-key">Week</span>
                    <span class="market_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_7d)}">{{coin_basic[0].percent_change_7d}}%</span>
                </div>                                             
            </div>
            <div class="currency_row-33" id="social-basics">
                <div class="currency_row-2-title"><span class="primary-text">{{coin_basic[0].symbol}}</span> Social Data</div>
                <div class="social_basics-row">
                    <v-menu :nudge-width="100">
                        <v-toolbar-title slot="activator"><span>Reddit</span><v-icon>arrow_drop_down</v-icon></v-toolbar-title>
                        <v-list>
                        <v-list-tile v-for="item in social_platforms" :key="item" @click="">
                            <v-list-tile-title v-text="item"></v-list-tile-title>
                        </v-list-tile>
                        </v-list>
                    </v-menu>
                </div>
                <div class="social_basics-row">
                    <span class="social_basics-row-key">Avg. Score / Thread</span>
                    <span class="social_basics-row-value">{{reddit_search.score}}</span>
                </div>  
                <div class="social_basics-row">
                    <span class="social_basics-row-key">Avg. Upvotes / Thread</span>
                    <span class="social_basics-row-value">{{reddit_search.ups}}</span>
                </div>
                <div class="social_basics-row">
                    <span class="social_basics-row-key">Avg. Comments / Thread</span>
                    <span class="social_basics-row-value">{{reddit_search.comments}}</span>
                </div>                                
                <div class="social_basics-row">
                    <span class="social_basics-row-key">1 Hour</span>
                    <span class="social_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_1h)}">{{coin_basic[0].percent_change_1h}}%</span>
                </div>
                <div class="social_basics-row">
                    <span class="social_basics-row-key">24 Hours</span>
                    <span class="social_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_24h)}">{{coin_basic[0].percent_change_24h}}%</span>
                </div>
                <div class="social_basics-row">
                    <span class="social_basics-row-key">Week</span>
                    <span class="social_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_7d)}">{{coin_basic[0].percent_change_7d}}%</span>
                </div>                                  
            </div>
            <div class="currency_row-33" id="news-basics">
                <div class="currency_row-2-title"><span class="primary-text">{{coin_basic[0].symbol}}</span> News Data</div>
                <div class="news_basics-row">
                    <v-menu :nudge-width="100">
                        <v-toolbar-title slot="activator"><span>Forbes</span><v-icon>arrow_drop_down</v-icon></v-toolbar-title>
                        <v-list>
                        <v-list-tile v-for="item in news_platforms" :key="item" @click="">
                            <v-list-tile-title v-text="item"></v-list-tile-title>
                        </v-list-tile>
                        </v-list>
                    </v-menu>
                </div>
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Articles in the last Week</span>
                    <span class="news_basics-row-value">{{reddit_search.score}}</span>
                </div>  
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Avg. Comments / Article</span>
                    <span class="news_basics-row-value">{{reddit_search.score}}</span>
                </div>
                <div class="news_basics-row">
                    <span class="news_basics-row-key">24 Hours</span>
                    <span class="news_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_24h)}">{{coin_basic[0].percent_change_24h}}%</span>
                </div>
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Week</span>
                    <span class="news_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_7d)}">{{coin_basic[0].percent_change_7d}}%</span>
                </div>
            </div>
        </div>

        <div class="currency_row-children clearfix" id="currency_row-3">
            <div class="currency_row-66" id="social-feeds">   
                <div class="currency_row-3-title"><span class="primary-text">{{coin_basic[0].symbol}}</span> Social Data</div>
                <div class="social_feeds-row">
                    <v-menu :nudge-width="100">
                        <v-toolbar-title slot="activator"><span>Reddit</span><v-icon>arrow_drop_down</v-icon></v-toolbar-title>
                        <v-list>
                        <v-list-tile v-for="item in social_platforms" :key="item" @click="">
                            <v-list-tile-title v-text="item"></v-list-tile-title>
                        </v-list-tile>
                        </v-list>
                    </v-menu>
                </div>
                <div v-for="post in reddit_titles" :key="feed" class="social_feeds-row">
                    <span class="social_feeds-article">"{{post[0]}}"<span class="social_feeds-article-meta">Score:{{post[1]}}, Comments:{{post[2]}}, <a target="blank" :href="'http://reddit.com'+post[3]">view</a></span></span>
                </div>  
            </div>
            <div class="currency_row-33" id="news-feeds">
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GoogleChart from './sub_components/GoogleChart';
export default {
    components:{
        'line-chart': GoogleChart
    },
    name: 'currency',
    data () {
    return {
            GoogleChart_data: null,
            coin_basic: [{"id":"bitcoin","name":"Bitcoin","symbol":"BTC","rank":"1","price_usd":"14614.3","price_btc":"1.0","24h_volume_usd":"18037700000.0","market_cap_usd":"245445707070","available_supply":"16794900.0","total_supply":"16794900.0","max_supply":"21000000.0","percent_change_1h":"-0.87","percent_change_24h":"1.27","percent_change_7d":"-3.75","last_updated":"1515638061"}], //{"id":"stellar","name":"Stellar","symbol":"XLM","rank":"8","price_usd":"0.718313","price_btc":"0.00004266","a24h_volume_usd":"421381000.0","market_cap_usd":"12841869482.0","available_supply":"17877818558.0","total_supply":"103570548975","max_supply":null,"percent_change_1h":"-2.88","percent_change_24h":"5.13","percent_change_7d":"122.47","last_updated":"1515298743"}
            reddit_data: [],
            reddit_search: [],
            reddit_titles: [],
            social_platforms: ['Reddit', 'Twitter'],
            news_platforms: ['CNN', 'Forbes', 'MSNBC'],
            headlines: []
        }
    },
    methods:{
        getCoinBasic: function (){
            axios.get("https://api.coinmarketcap.com/v1/ticker/" + this.$route.params.currency)
            .then(response => {
               this.coin_basic = response.data;
            })
        },
        getRedditSearch: function (){
            
            axios.get("https://www.reddit.com/r/cryptocurrency/search.json?q=" + this.$route.params.currency + "&restrict_sr=on&limit=100&sort=hot&t=day")
            .then(response => {
                this.reddit_search = response.data.data;
     
                
                // Get Reddit Titles
                var reddit_data_ = this.reddit_search.children;
                console.log(reddit_data_);
                let titles = [];  
                let titles_ = [];  
                var rt_counter = (reddit_data_.length > 10 ? rt_counter = 10 : rt_counter = reddit_data_.length);            
                reddit_data_.sort((a,b) => { return b.data.num_comments - a.data.num_comments});
                for(var i = 0; i < rt_counter; i++){
                    titles_ = [];
                    titles_.push(reddit_data_[i].data.title);
                    titles_.push(reddit_data_[i].data.score);
                    titles_.push(reddit_data_[i].data.num_comments);
                    titles_.push(reddit_data_[i].data.permalink);
                    titles.push(titles_);
                }
                this.reddit_titles = titles;
                
            })
            
        }, 
        getGoogleTrends: function (){
            
            
            //axios.get("http://localhost:8005/google-trends/" + this.$route.params.currency)
            axios.get("http://52.15.54.43:8005/google-trends/" + this.$route.params.currency)
            .then(response => {
                //console.log(response);
                var google_data = response.data.default.timelineData;
                var data_obj = [];
                var data_labels = [];
                for(var i = 0; i < google_data.length; i++){
                    if(parseInt(google_data[i].time) > 1420070400){
                        data_obj.push(google_data[i].value[0]);
                        data_labels.push(google_data[i].formattedTime);
                    }
                }
                console.log(data_obj);
                this.GoogleChart_data = {labels: data_labels,"datasets":[{"backgroundColor":"rgba(245,72,40,.5)","data":data_obj}]};
            })
            
            
        },    
        numLessThanZero : function(num){
            return parseFloat(num) < 0;
        }
    },
    mounted: function () {
        this.getCoinBasic();
        this.getRedditSearch();
        this.getGoogleTrends();
    },
    created: function() {
        
    },
    filters:{
        Upper(value){
            return value.toUpperCase();
        },
        Currency(value){
            return formatter.format(value);
        },
        Price(value){
            return formatter3.format(value);
        }        
    }
}

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

var formatter3 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 3,
  // the default value for minimumFractionDigits depends on the currency
  // and is usually already 2
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
