<template>
    <div id="main-page">

        
        <div id="trending-container" class="clearfix">
            <h2>Watch List</h2>
            <!-- <div class="coin_watch" v-for="coin_wl in watchList"> -->
            <div class="coin_watch" v-for="coin_wl in watchList">
                <div class="cw-coin_info"><router-link to="/coin/XRP">XRP</router-link> <span>(-11.39%)</span></div>
                <line-chart :chart-data="WatchListChart_data" :options="{responsive: true, maintainAspectRatio: false, legend: { display: false }, scales:{yAxes:[{display:false}], xAxes:[{display:false}]}}"></line-chart>
            </div>
        </div>
        

        <div id="table-container">
            <h2>All Currencies</h2>
            

            <v-card color="lighten-4" flat>
                <v-toolbar class='elevation-0' id="toolbar-table">
                <!--
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
                -->
                <v-btn icon>
                    <v-icon>filter_list</v-icon>
                </v-btn>
                
                <v-spacer></v-spacer>
                <v-text-field
                    append-icon="search"
                    autofocus
                    label="Search Coins"
                    single-line
                    hide-details
                    v-model="search"
                    >
                </v-text-field>              
                </v-toolbar>
            </v-card>

            <table>
                <tr>
                    <th></th>
                    <th class="left_align symbol phone">Symbol</th>
                    <th class="id left_align desktop">Name</th> <!-- TODO - truncate -->
                    <th class="usd phone" @click="sortCoins('price_usd')">$USD</th>
                    <th class="tablet" @click="sortCoins('24h_volume_usd')">24Hr Volume</th>
                    <th class="tablet" @click="sortCoins('market_cap_usd')">Market Cap</th>


                    <th class="social_title desktop" @click="sortCoins_rs()">Rddt Score</th>
                    <th class="social_title desktop" @click="sortCoins_ra()">Rddt <v-icon>forum</v-icon></th>
                    <th class="social_title desktop">Rddt 48hr</th>
                    <th class="social_title desktop">Twtr <v-icon>forum</v-icon></th>
                    <th class="social_title phone">Listen Score</th>

                    <th class="percent_change phone" @click="sortCoins('hour')">Hour</th>
                    <th class="percent_change desktop" @click="sortCoins('day')">Day </th>
                    <th class="percent_change desktop" @click="sortCoins('week')">Week</th>                               
                </tr>
                <tr v-for="coin in orderedCoins">
                    <td class="c_icon phone"><i :class="`cc ${coin.symbol}`"></i></td>
                    
                    <td class="symbol left_align phone" v-ripple>
                        <router-link :to="`/coin/${coin.name}`">{{coin.symbol}}</router-link><v-icon class="chevron--right">chevron_right</v-icon></td>
                    <td class="id left_align desktop">{{coin.name | CharLimit}}</td> 
                    
                    <td class="usd phone">{{coin.price_usd | Price}}</td>
                    <td class="volume tablet">{{coin["24h_vol_usd"] | BigNumber}}<span>M</span></td>                    
                    <td class="cap tablet">{{coin.market_cap_usd | BigNumber}}<span>M</span></td>

                    
                    <td class="r_score desktop">0000
                        <!--
                        {{coin.r_data | RScoreSum}}
                        <div class="circle_no" v-bind:class="{'circle':redditFilter(coin)}"></div>
                        -->
                    </td>
                    <td class="r_activity desktop">00000<!--{{coin.r_data | RCommentSum}}--></td>
                    <td class="r_24hr desktop">00000</td>
                    <td class="t_activity desktop">00000</td>
                    <td class="t_24hr phone">00000</td>
                    
                    <td class="percent_change hour change_green phone" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_1h)}">{{coin.percent_change_1h}}%</td>
                    <td class="percent_change change_green desktop" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_24h)}">{{coin.percent_change_24h}}%</td>
                    <td class="percent_change change_green desktop" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_7d)}">{{coin.percent_change_7d}}%</td> 
                              
                </tr>
            </table>
        </div>

    </div>
<!--
<div id="trending-container" class="clearfix">
    <div class="trending-content clearfix">
        <div class="tc-title">Watch List</div>
        <div class="tc-coins">
            <div class="watch_list-coin" v-for="coin_wl in watchList">
                <div class="wlc-title"><router-link :to="`/currency/${coin_wl.coin_id}`">{{coin_wl.symbol}}</router-link></div>
                <div class="wlc-change"> 
                    <div class="change_green" v-bind:class="{'change_red':numLessThanZero(coin_wl.day)}">{{coin_wl.day}}%(Day)</div>

                </div>
            </div>
        </div>
    </div>
    <div class="trending-ad">
        1PnRmqgMeCFNuMkYyPV18f5Xn7kVRRhTkg
    </div>
</div>
-->
</template>

<script>
import axios from 'axios';
import WatchListChart from './sub_components/WatchListChart';
export default {
    components:{
        'line-chart': WatchListChart
    },
    name: 'main',
    data () {
        return {
            search: '',
            WatchListChart_data: null,
            reverse: false,
            coinFilter: ['All', 'Top 100'],
            watchList: [],
            tableData: []
        }
    },
    methods:{
        getTableData: function(){
            axios.get("http://75.140.65.11/api/homepage/list?offset=0")
            .then(response => {
                this.tableData = response.data.payload.data;
            })
        },
        getWatchList: function(){
            axios.get("http://52.15.54.43:8005/watch-list")
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
        },
        getGoogleTrends: function (){
            let data_obj = [];
            let data_labels = data_obj;
            for(var i = 0; i < 10; i++){
                data_obj.push(Math.random()*((i*10)-i)+(i));
                data_labels.push(Math.random()*((i*10)-i)+i);
            }
            this.WatchListChart_data = {labels: data_labels,"datasets":[{"backgroundColor":"rgba(246,196,46,0)","borderColor":"#f5c42e","borderWidth":2,"pointRadius":1,"data":data_obj}]};  
        }        
    },
    mounted: function(){
        this.getTableData();
        this.getWatchList();
        this.getGoogleTrends();
    },
    computed: {
        orderedCoins: function(){
            var self = this;
            return this.tableData.filter(function(coin){
                let found = false;
                if(coin.name.toLowerCase().indexOf(self.search.toLowerCase())>=0 || coin.symbol.toLowerCase().indexOf(self.search.toLowerCase())>=0){
                    return true;
                }
            });
            //return this.thisJSON;
            //return this.thisJSON.sort((a,b) => { return b.rank - a.rank});
        }
    },
    filters:{
        Upper(value){
            return value.toUpperCase();
        },
        CharLimit(value){
            if(value.length > 10){
                return value.substring(0,10) + "...";
            }else{
                return value
            }
        },
        Commas(value){
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        Price(value){
            return formatter.format(value);
        },
        BigNumber(value){
            var value_ = Math.trunc(value / 1000000);
            return value_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        RScoreSum(value){
            return value[value.length-1].score_sum;
        },
        RCommentSum(value){
            return value[value.length-1].comment_sum;
        }
    }
}

/* Extra Functions
*
*/

var formatter = new Intl.NumberFormat('en-US', {
  //style: 'currency',
  //currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
