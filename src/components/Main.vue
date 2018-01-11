<template>
    <div id="main-page">

        
        <div id="trending-container" class="clearfix">
            <div class="trending-content clearfix">
                <div class="tc-title">Watch<br />List</div>
                <div class="watch_list-coin" v-for="coin_wl in watchList">
                    <div class="wlc-title"><router-link :to="`/currency/${coin_wl.coin_id}`">{{coin_wl.symbol}}<v-icon>chevron_right</v-icon></router-link></div>
                    <div class="wlc-change clearfix"> 
                        <div class="change_green" v-bind:class="{'change_red':numLessThanZero(coin_wl.day)}">{{coin_wl.day}}%(D)</div>
                        <div class="change_green" v-bind:class="{'change_red':numLessThanZero(coin_wl.week)}">{{coin_wl.week}}%(W)</div>		
                    </div>
                </div>
            </div>
            <div class="trending-ad">
                <img src="https://s3.envato.com/files/62273611/PNG%20Blue/Banner%20blue%20468x60.png" />
            </div>
        </div>


        <div id="table-container">

            <v-card color="white lighten-4" flat>
                <v-toolbar class='elevation-0' id="toolbar-table">
                <v-menu :nudge-width="100">
                    <v-toolbar-title slot="activator">
                        <span>View: <span class="view-filter">Top 100</span></span><v-icon>arrow_drop_down</v-icon>
                    </v-toolbar-title>
                    <v-list>
                    <v-list-tile v-for="item in coinFilter" :key="item" @click="">
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile>
                    </v-list>
                </v-menu>
                <v-menu :nudge-width="100">
                    <v-toolbar-title slot="activator">
                        <span>Highlight: <span class="highlight-filter">None</span></span><v-icon>arrow_drop_down</v-icon>
                    </v-toolbar-title>
                    <v-list>
                    <v-list-tile v-for="item in coinFilter" :key="item" @click="">
                        <v-list-tile-title v-text="item"></v-list-tile-title>
                    </v-list-tile>
                    </v-list>
                </v-menu>                
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon>search</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>filter_list</v-icon>
                </v-btn>                
                </v-toolbar>
            </v-card>

            <table>
                <tr>
                    <th class="left_align">Symbol</th>
                    <th class="id left_align">Name</th> <!-- TODO - truncate -->
                    <th class="usd" @click="sortCoins('price_usd')">$USD</th>
                    <th @click="sortCoins('market_cap_usd')">Market Cap</th>
                    <th @click="sortCoins('available_supply')">Circulating</th>

                    <th class="social_title" @click="sortCoins_rs()">Rddt Score</th>
                    <th class="social_title" @click="sortCoins_ra()">Rddt <v-icon>forum</v-icon></th>
                    <th class="social_title">Rddt 48hr</th>
                    <th class="social_title">Twtr <v-icon>forum</v-icon></th>
                    <th class="social_title">Twtr 24hr</th>

                    <th class="percent_change" @click="sortCoins('hour')">Hour</th>
                    <th class="percent_change" @click="sortCoins('day')">Day </th>
                    <th class="percent_change" @click="sortCoins('week')">Week</th>                               
                </tr>
                <tr v-for="coin in orderedCoins">
                    <td class="symbol left_align" v-ripple>
                        <router-link :to="`/currency/${coin.slug}`">{{coin.symbol}}<v-icon>chevron_right</v-icon></router-link></td>
                    <td class="id left_align">{{coin.coin_id}}</td> 

                    <td class="usd">{{coin.price_usd | Price}}</td>
                    <td class="cap">{{coin.market_cap_usd | BigNumber}}</td>
                    <td class="supply">{{coin.available_supply | BigNumber}}</td>
                    
                    <td class="r_score" v-bind:class="{'bg_red':redditFilter(coin)}">{{coin.r_data | RScoreSum}}</td>
                    <td class="r_activity">{{coin.r_data | RCommentSum}}</td>
                    <td class="r_24hr">00000</td>
                    <td class="t_activity">00000</td>
                    <td class="t_24hr">00000</td>

                    <td class="percent_change hour change_green" v-bind:class="{'change_red':numLessThanZero(coin.hour)}">{{coin.hour}}%</td>
                    <td class="percent_change change_green" v-bind:class="{'change_red':numLessThanZero(coin.day)}">{{coin.day}}%</td>
                    <td class="percent_change change_green" v-bind:class="{'change_red':numLessThanZero(coin.week)}">{{coin.week}}%</td> 
                              
                </tr>
            </table>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'main',
    data () {
        return {
            reverse: false,
            thisJSON: [],
            coinFilter: ['All', 'Top 100'],
            watchList: []
        }
    },
    methods:{
        getTableData: function(){
            axios.get("http://localhost:8005/table-data").then(response => {this.thisJSON = response.data})
        },
        getWatchList: function(){
            axios.get("http://localhost:8005/watch-list")
            .then(response => {

                this.watchList = response.data;

                // Put the code here to build arrays and stuff
            })
        },        
        numLessThanZero : function(num){
            return parseFloat(num) < 0;
        },
        redditFilter(coin){
            return coin.r_data[coin.r_data.length - 1].score_sum > 500;
        },
        sortCoins: function(val){
            this.reverse = !this.reverse;
            if(this.reverse == true){
                this.icon = "arrow_drop_down";
                return this.thisJSON.sort((a,b) => { return b[val] - a[val]});
            }else{
                this.icon = "arrow_drop_up";
                return this.thisJSON.sort((a,b) => { return a[val] - b[val]});
            }
        },
        sortCoins_rs: function(){
            this.reverse = !this.reverse;
            if(this.reverse == true){
                //this.icon = "arrow_drop_down";
                return this.thisJSON.sort((a,b) => { return b.r_data[b.r_data.length - 1].score_sum - a.r_data[a.r_data.length - 1].score_sum});
            }else{
                //this.icon = "arrow_drop_up";
                return this.thisJSON.sort((a,b) => { return a.r_data[a.r_data.length - 1].score_sum - b.r_data[b.r_data.length - 1].score_sum});
            }            
        }
    },
    mounted: function(){
        //this.getData();
        this.getTableData();
        this.getWatchList();
    },
    computed: {
        orderedCoins: function(){
            return this.thisJSON;
            //return this.thisJSON.sort((a,b) => { return b.rank - a.rank});
        }
    },
    filters:{
        Upper(value){
            return value.toUpperCase();
        },
        Commas(value){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        Price(value){
            return formatter.format(value);
        },
        BigNumber(value){
            var value_ = Math.trunc(value / 1000000);
            return value_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M";
        },
        RScoreSum(value){
            return value[value.length-1].score_sum;
        },
        RCommentSum(value){
            return value[value.length-1].comment_sum;
        }
    }
}

var formatter = new Intl.NumberFormat('en-US', {
  //style: 'currency',
  //currency: 'USD',
  minimumFractionDigits: 2

});


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
