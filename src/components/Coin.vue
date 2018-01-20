<template>
    <div id="coin_container">


        <!-- Breadcrumbs -->
        <div id="coin_breadcrumbs">
            <router-link to="/">Home</router-link><v-icon>chevron_right</v-icon>{{coin_basic[0].symbol}}
        </div>
        <!-- /Breadcrumbs -->


        <!-- NamePrice -->
        <div class="coin_row-children" id="coin_row-meta">
            <div id="coin_meta" class="coin_row-50">
                <div id="name">
                    <span id="name-name">{{coin_basic[0].name}}</span><span id="name-symbol">({{coin_basic[0].symbol}})</span>
                </div>
                <div id="details" >
                    <i :class="`cc ${coin_basic[0].symbol}`"></i>
                    <router-link to="/">website</router-link>
                    <span id="currency-current_change_1h" class="green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_1h)}">({{coin_basic[0].percent_change_1h}}%)</span>
                </div>
            </div>
            
            <div id="price" class="coin_row-50">
                <div id="currency-current_price"><div class="c_eyebrow c-price">Current Price</div>{{coin_basic[0].price_usd | Price}}</div>   
            </div>
        </div>
        <!-- /NamePrice -->
        

        <!-- Numbers -->
        <div class="coin_row-children clearfix" id="coin_row-numbers">
            <div class="r_numbers-number">
                <div class="c_eyebrow">24hr Volume</div>
                <div class="rn_value">${{coin_basic[0]["24h_volume_usd"] | Currency}}</div>
            </div>
            <div class="r_numbers-number">
                <div class="c_eyebrow">Market Cap</div>
                <div class="rn_value">${{coin_basic[0].market_cap_usd | Currency}}</div>
            </div>
            <div class="r_numbers-number">
                <div class="c_eyebrow">Circulating Supply</div>
                <div class="rn_value">{{coin_basic[0].available_supply | Currency}}</div>
            </div> 
            <div class="r_numbers-number">
                <div class="c_eyebrow">24hr Low / 24 High</div>
                <div class="rn_value">{{coin_basic[0].available_supply | Currency}}</div>
            </div>       
            <div class="r_numbers-changes">                    
                <div class="r_numbers-number">
                    <div class="c_eyebrow">Hour</div>
                    <div class="rn_value"><span class="green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_1h)}">{{coin_basic[0].percent_change_1h}}%</span></div>
                </div>
                <div class="r_numbers-number">
                    <div class="c_eyebrow">Day</div>
                    <div class="rn_value"><span class="green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_24h)}">{{coin_basic[0].percent_change_24h}}%</span></div>
                </div>
                <div class="r_numbers-number">
                    <div class="c_eyebrow">Week</div>
                    <div class="rn_value"><span class="green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_7d)}">{{coin_basic[0].percent_change_7d}}%</span></div>
                </div>                                    
            </div>
        </div>
        <!-- /Numbers -->
        

        <!-- Chart -->
        <div class="coin_row-children clearfix" id="coin_row-graph">
            <div class="coin_row-66" id="graph_main">
                <div class="c_section-title">Social Activity against Price</div>
                <line-chart :chart-data="CoinChart_data"></line-chart>
            </div>
            <div class="coin_row-33" id="_feed">
                <div class="c_section-title">Social Listening</div>
                <div class="social_feeds-row">
                    <v-menu :nudge-width="0"  bottom left>
                        <v-toolbar-title slot="activator"><span>Reddit</span><v-icon>arrow_drop_down</v-icon></v-toolbar-title>
                        <v-list>
                        <v-list-tile v-for="item in social_platforms" :key="item" @click="">
                            <v-list-tile-title v-text="item"></v-list-tile-title>
                        </v-list-tile>
                        </v-list>
                    </v-menu>
                </div>
                <div v-for="post in reddit_titles" :key="post" class="social_feeds-row">
                    <div class="social_feeds-article">"{{post[0]}}"<span class="social_feeds-article-meta">Score:{{post[1]}}, Comments:{{post[2]}}, <a target="blank" :href="'http://reddit.com'+post[3]">view on Reddit</a></span></div>
                </div> 
            </div>
        </div>
        <!-- Chart -->

        <!-- Social / Numbers -->
        <div class="coin_row-children clearfix" id="coin_row-tables">
            
            <!-- Google City Search Bar Chart -->
            <div class="coin_row-33" id="geo_lines_container">
                <div class="coin_row-tables-title">Global Search by City</div>
                <div class="geo_lines" v-for="(obj, index) in geo_data">
                        <div class="gl-text">{{obj.label}}</div>
                        <div class="gl-bar" v-bind:style="{ width: obj.num + '%' }"></div>
                </div>
            </div>

            <div class="coin_row-33" id="social-basics">
                <div class="coin_row-tables-title">Social Data</div>
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
                    <span class="social_basics-row-key">TBD</span>
                    <span class="social_basics-row-value">###</span>
                </div>                             
                <div class="social_basics-row">
                    <span class="social_basics-row-key">1 Hour</span>
                    <span class="social_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_1h)}">###</span>
                </div>
                <div class="social_basics-row">
                    <span class="social_basics-row-key">24 Hours</span>
                    <span class="social_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_24h)}">###</span>
                </div>
                <div class="social_basics-row">
                    <span class="social_basics-row-key">Week</span>
                    <span class="social_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_7d)}">###</span>
                </div>                                  
            </div>
            <div class="coin_row-33" id="news-basics">
                <div class="coin_row-tables-title">Development Data</div>
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Source Code Activity</span>
                    <span class="news_basics-row-value">###</span>
                </div>  
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Page Rank</span>
                    <span class="news_basics-row-value">###</span>
                </div>
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Founder Tweets / 24 Hours</span>
                    <span class="news_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_24h)}">###%</span>
                </div>
                <div class="news_basics-row">
                    <span class="news_basics-row-key">Founder Tweets / Week</span>
                    <span class="news_basics-row-value green-text" v-bind:class="{'red-text':numLessThanZero(coin_basic[0].percent_change_7d)}">###%</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import CoinChart from './sub_components/CoinChart';
import GoogleChart from './sub_components/GoogleChart';
export default {
    components:{
        'doughnut-chart': GoogleChart,
        'line-chart': CoinChart
    },
    name: 'coin',
    data () {
    return {
            CoinChart_data: null,
            GoogleChart_data: null,
            coin_basic: [{"id":"bitcoin","name":"Bitcoin","symbol":"BTC","rank":"1","price_usd":"14614.3","price_btc":"1.0","24h_volume_usd":"18037700000.0","market_cap_usd":"245445707070","available_supply":"16794900.0","total_supply":"16794900.0","max_supply":"21000000.0","percent_change_1h":"-0.87","percent_change_24h":"1.27","percent_change_7d":"-3.75","last_updated":"1515638061"}], //{"id":"stellar","name":"Stellar","symbol":"XLM","rank":"8","price_usd":"0.718313","price_btc":"0.00004266","a24h_volume_usd":"421381000.0","market_cap_usd":"12841869482.0","available_supply":"17877818558.0","total_supply":"103570548975","max_supply":null,"percent_change_1h":"-2.88","percent_change_24h":"5.13","percent_change_7d":"122.47","last_updated":"1515298743"}
            reddit_data: [],
            reddit_search: [],
            reddit_titles: [],
            social_platforms: ['Reddit', 'Twitter'],
            news_platforms: ['CNN', 'Forbes', 'MSNBC'],
            headlines: [],
            geo_data: [],
            geo_labels: []
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
            
            axios.get("https://www.reddit.com/r/cryptocurrency/search.json?q=" + this.$route.params.coin + "&restrict_sr=on&limit=100&sort=hot&t=day")
            .then(response => {
                this.reddit_search = response.data.data;
                
                // Get Reddit Titles
                let reddit_data__ = this.reddit_search.children;   
                let titles_ = [];  
                let titles__ = [];  
                var rt_counter = (reddit_data__.length > 6 ? rt_counter = 6 : rt_counter = reddit_data__.length);            
                reddit_data__.sort((a,b) => { return b.data.num_comments - a.data.num_comments});
                for(var i = 0; i < rt_counter; i++){
                    titles__ = [];
                    titles__.push(reddit_data__[i].data.title);
                    titles__.push(reddit_data__[i].data.score);
                    titles__.push(reddit_data__[i].data.num_comments);
                    titles__.push(reddit_data__[i].data.permalink);
                    titles__.push(reddit_data__[i].data.created);
                    titles_.push(titles__);
                }
                this.reddit_titles = titles_;
                console.log(this.reddit_titles);
            })
            
        }, 
        getGoogleTrends: function (){
            axios.get("http://52.15.54.43:8005/google-trends/" + this.$route.params.coin)
            .then(response => {
                //console.log(response);
                var google_data = response.data.default.geoMapData;
                var data_obj = [];
                var data_labels = [];
                for(var i = 0; i < 10; i++){
                    //data_obj.push(google_data[i].value[0]);
                    //data_labels.push(google_data[i].geoName);
                    data_obj.push({'label':google_data[i].geoName,'num':google_data[i].value[0]});
                }
                this.geo_data = data_obj;
                console.log(data_obj);
                //this.geo_labels = data_labels;
            })
        },   
        getCoinChart: function(){
            let data_obj = [];
            let data_labels = ["A","A","A","A","A","B","A","A","A","A","C","A","A","A","A","D","A","A","A","A"];
            let data_obj_1 = [];
            let data_labels_1 = ["A","A","A","A","A","B","A","A","A","A","C","A","A","A","A","D","A","A","A","A"];
            let price_obj = [4, 11, 14, 15, 16, 27, 48, 70, 31, 34, 60, 52, 71, 77, 60, 84, 88, 91, 93, 95];
            
            for(var i = 0; i < 20; i++){
                data_obj.push(Math.random()*((i*5)-i)+(i));
            }
            for(var i = 0; i < 20; i++){
                data_obj_1.push(Math.random()*((i*5)-i)+(i));
            }
        
            
            this.CoinChart_data = {labels: data_labels,type: 'horizontalBar',"datasets":[{"label": "Reddit", "backgroundColor":"rgba(43,176,165,.6)", "borderColor": "rgba(0,0,0,0)","data":data_obj},{"label": "Twitter","backgroundColor":"rgba(40,95,114,.6)", "borderColor": "rgba(0,0,0,0)", "data":data_obj_1},{"label": "Price", "backgroundColor": "rgba(0,0,0,0)", "borderColor":"#5d25fa","data":price_obj}]};
        },
        getTwitter: function (){
            // Todo
        }, 
        numLessThanZero : function(num){
            return parseFloat(num) < 0;
        }
    },
    mounted: function () {
        //this.getCoinBasic();
        this.getRedditSearch();
        this.getGoogleTrends();
        //this.getTwitter();
        this.getCoinChart();
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
  //style: 'currency',
  //currency: 'USD',
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
