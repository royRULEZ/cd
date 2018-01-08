<template>
  <div>
    <div id="currency_container">
        <div class="currency_row" id="currency_row-1">
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
                <div v-for="feed in reddit_titles" :key="feed" class="social_feeds-row">
                    <span class="social_feeds-article">"{{feed}}"<span class="social_feeds-article-meta">150 ups, 201 comments, <a href="/">view</a></span></span>
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
export default {
  name: 'currency',
  data () {
    return {
            coin_basic: [{"id":"stellar","name":"Stellar","symbol":"XLM","rank":"8","price_usd":"0.718313","price_btc":"0.00004266","a24h_volume_usd":"421381000.0","market_cap_usd":"12841869482.0","available_supply":"17877818558.0","total_supply":"103570548975","max_supply":null,"percent_change_1h":"-2.88","percent_change_24h":"5.13","percent_change_7d":"122.47","last_updated":"1515298743"}],
            reddit_search: {"score":"124", "ups":"124", "comments":"37", "posts":">100"},
            reddit_titles: ["Stellar Lumens (XLM) just hit $0.4!!","PSA: Buyers of Stellar Lumens (XLM), don't forget to set your inflation pool to get free Lumens weekly.","Sell XRP for XLM?","The 5 most promising cryptocurrencies to buy in 2018. This list features XRB, REQ and XLM. Are there any glaringly obvious coins you think are missing?","Planning to diversify and hodl for 1 month with XRP, REQ, XLM and VEN. Looking for a fifth coin, but can't decide. What would you suggest?","LUMENS (XLM) IBM Partnership Confirmed","Stellar (XLM) going interstellar","What next: Stellar (XLM) or Request Network REQ?","Do you believe in OMG or XLM more?","XLM Consolidation pattern nearly complete. It's ready to take off again!"],
            social_platforms: ['Reddit', 'Twitter'],
            news_platforms: ['CNN', 'Forbes', 'MSNBC'],
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
            //https://www.reddit.com/r/cryptocurrency/search.json?q=xlm&limit=100&restrict_sr=on
            axios.get("https://www.reddit.com/r/cryptocurrency/search.json?q=" + this.$route.params.currency + "&limit=100&restrict_sr=on")
            .then(response => {
               this.reddit_search = response.data;
            })
        },        
        numLessThanZero : function(num){
            return parseFloat(num) < 0;
        }
    },
    mounted: function () {
        //this.getCoinBasic();
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
