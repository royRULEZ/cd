<template>
    <div id="main-page">
        <div id="table-container">

            <v-card color="white lighten-4" flat>
                <v-toolbar class='elevation-0' id="toolbar-table">
                <v-menu :nudge-width="100">
                    <v-toolbar-title slot="activator">
                        <span>All</span><v-icon>arrow_drop_down</v-icon>
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
                </v-toolbar>
            </v-card>

            <table>
                <tr>
                    <th class="rank" @click="sortCoins('rank')">#</th>
                    <th class="left_align">Symbol</th>
                    <th class="id left_align">ID</th> 
                    <th class="usd" @click="sortCoins('price_usd')">USD<v-icon>{{icon}}</v-icon></th>
                    <th>Score</th>
                    <th>Votes</th>
                    <th>Comments</th>
                    <th class="posts">Posts</th>
                    <th>% 24h</th>
                    <th>% 1d</th>
                    <th>% 7d</th>                               
                </tr>
                <tr v-for="coin in orderedCoins">
                    <td class="rank">{{coin.rank}}</td>
                    <td class="symbol left_align" v-ripple>
                        <router-link :to="`/currency/${coin.id}`">{{coin.symbol}}</router-link></td>
                    <td class="id left_align">{{coin.id}}</td> 
                    <td class="usd">{{coin.price_usd}}</td>
                    <td>{{coin.reddit.score | Commas}}</td>
                    <td>{{coin.reddit.ups | Commas}}</td>
                    <td>{{coin.reddit.comments | Commas}}</td>
                    <td class="posts" v-ripple>{{coin.reddit.threads | Commas}}</td>
                    <td class="change_green" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_1h)}">{{coin.percent_change_1h}}%</td>
                    <td class="change_green" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_24h)}">{{coin.percent_change_24h}}%</td>
                    <td class="change_green" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_7d)}">{{coin.percent_change_7d}}%</td>           
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
            icon: "",
            reverse: false,
            thisJSON: [],
            coinFilter: ['All', 'Top 100']
        }
    },
    methods:{
        makeJSON: function(){
            this.thisJSON = [{"id":"tron","name":"TRON","symbol":"TRX","rank":"2","price_usd":"0.197","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}},{"id":"ROY","name":"ROY","symbol":"TRX","rank":"8","price_usd":"16500.03","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}},{"id":"tron","name":"TRON","symbol":"TRX","rank":"8","price_usd":"0197","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}},{"id":"ROY","name":"ROY","symbol":"TRX","rank":"5","price_usd":"16500.03","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}}];
        },
        numLessThanZero : function(num){
            return parseFloat(num) < 0;
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
        }
    },
    mounted: function(){
        //this.getData();
        this.makeJSON();
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
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
