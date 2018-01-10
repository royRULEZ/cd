<template>
    <div id="main-page">

        
        <div id="trending-container" class="clearfix">
            <div class="trending-content clearfix">
                <div class="tc-title">Watch<br />List</div>
                <div class="watch_list-coin"></div>
                <div class="watch_list-coin"></div>
                <div class="watch_list-coin"></div>
                <div class="watch_list-coin"></div>
                <div class="watch_list-coin"></div>
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
                        <span>View: <span class="view-filter">All</span></span><v-icon>arrow_drop_down</v-icon>
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
                    <th class="usd" @click="sortCoins('price_usd')">$USD<v-icon>{{icon}}</v-icon></th>
                    <th @click="sortCoins('market_cap_usd')">Market Cap</th>
                    <th @click="sortCoins('available_supply')">Circulating</th>

                    <th class="social_title">Rddt Score</th>
                    <th class="social_title">Rddt <v-icon>forum</v-icon></th>
                    <th class="social_title">Rddt 48hr</th>
                    <th class="social_title">Twtr <v-icon>forum</v-icon></th>
                    <th class="social_title">Twtr 24hr</th>

                    <th class="percent_change" @click="sortCoins('percent_change_1h')">Hour</th>
                    <th class="percent_change" @click="sortCoins('percent_change_24h')">Day </th>
                    <th class="percent_change" @click="sortCoins('percent_change_7d')">Week</th>                               
                </tr>
                <tr v-for="coin in orderedCoins">
                    <td class="symbol left_align" v-ripple>
                        <router-link :to="`/currency/${coin.slug}`">{{coin.symbol}}<v-icon>chevron_right</v-icon></router-link></td>
                    <td class="id left_align">{{coin.id}}</td> 

                    <td class="usd">{{coin.price_usd | Price}}</td>
                    <td class="cap">{{coin.market_cap_usd | BigNumber}}</td>
                    <td class="supply">{{coin.available_supply | BigNumber}}</td>
                    
                    <td class="r_score">14,400.00</td>
                    <td class="r_activity">100.00</td>
                    <td class="r_24hr">100.00</td>
                    <td class="t_activity">100.00</td>
                    <td class="t_24hr">100.00</td>

                    <td class="percent_change hour change_green" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_1h)}">{{coin.percent_change_1h}}%</td>
                    <td class="percent_change change_green" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_24h)}">{{coin.percent_change_24h}}%</td>
                    <td class="percent_change change_green" v-bind:class="{'change_red':numLessThanZero(coin.percent_change_7d)}">{{coin.percent_change_7d}}%</td> 
                              
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
            //Axios call
            this.thisJSON = [{"id":"bitcoin","name":"Bitcoin","symbol":"BTC","rank":"1","price_usd":"15484.0","price_btc":"1.0","24h_volume_usd":"18669800000.0","market_cap_usd":"259991456900","available_supply":"16790975.0","total_supply":"16790975.0","max_supply":"21000000.0","percent_change_1h":"0.45","percent_change_24h":"-3.26","percent_change_7d":"13.34","last_updated":"1515473661"},{"id":"ethereum","name":"Ethereum","symbol":"ETH","rank":"2","price_usd":"1221.62","price_btc":"0.0794028","24h_volume_usd":"8077810000.0","market_cap_usd":"118329107618","available_supply":"96862451.0","total_supply":"96862451.0","max_supply":null,"percent_change_1h":"1.0","percent_change_24h":"-1.39","percent_change_7d":"42.81","last_updated":"1515473650"},{"id":"ripple","name":"Ripple","symbol":"XRP","rank":"3","price_usd":"2.43555","price_btc":"0.0001583","24h_volume_usd":"3360330000.0","market_cap_usd":"94351124232.0","available_supply":"38739144847.0","total_supply":"99993093880.0","max_supply":"100000000000","percent_change_1h":"-0.88","percent_change_24h":"-16.64","percent_change_7d":"5.88","last_updated":"1515473641"},{"id":"bitcoin-cash","name":"Bitcoin Cash","symbol":"BCH","rank":"4","price_usd":"2465.43","price_btc":"0.160247","24h_volume_usd":"1399660000.0","market_cap_usd":"41668756334.0","available_supply":"16901213.0","total_supply":"16901213.0","max_supply":"21000000.0","percent_change_1h":"1.79","percent_change_24h":"-6.63","percent_change_7d":"-0.49","last_updated":"1515473653"},{"id":"cardano","name":"Cardano","symbol":"ADA","rank":"5","price_usd":"0.898633","price_btc":"0.00005841","24h_volume_usd":"253222000.0","market_cap_usd":"23298921179.0","available_supply":"25927070538.0","total_supply":"31112483745.0","max_supply":"45000000000.0","percent_change_1h":"-1.52","percent_change_24h":"-6.21","percent_change_7d":"23.22","last_updated":"1515473655"},{"id":"nem","name":"NEM","symbol":"XEM","rank":"6","price_usd":"1.69089","price_btc":"0.0001099","24h_volume_usd":"85993900.0","market_cap_usd":"15218009998.0","available_supply":"8999999999.0","total_supply":"8999999999.0","max_supply":null,"percent_change_1h":"-0.64","percent_change_24h":"-2.11","percent_change_7d":"57.01","last_updated":"1515473644"},{"id":"litecoin","name":"Litecoin","symbol":"LTC","rank":"7","price_usd":"257.085","price_btc":"0.0167099","24h_volume_usd":"1127010000.0","market_cap_usd":"14056362275.0","available_supply":"54675933.0","total_supply":"54675933.0","max_supply":"84000000.0","percent_change_1h":"0.4","percent_change_24h":"-5.91","percent_change_7d":"5.64","last_updated":"1515473641"},{"id":"stellar","name":"Stellar","symbol":"XLM","rank":"8","price_usd":"0.638821","price_btc":"0.00004152","24h_volume_usd":"250810000.0","market_cap_usd":"11422181882.0","available_supply":"17880097683.0","total_supply":"103590302054","max_supply":null,"percent_change_1h":"-0.58","percent_change_24h":"-5.3","percent_change_7d":"28.35","last_updated":"1515473643"},{"id":"iota","name":"IOTA","symbol":"MIOTA","rank":"9","price_usd":"3.90939","price_btc":"0.0002541","24h_volume_usd":"301116000.0","market_cap_usd":"10866267893.0","available_supply":"2779530283.0","total_supply":"2779530283.0","max_supply":"2779530283.0","percent_change_1h":"0.94","percent_change_24h":"-3.59","percent_change_7d":"-2.78","last_updated":"1515473651"},{"id":"tron","name":"TRON","symbol":"TRX","rank":"10","price_usd":"0.151123","price_btc":"0.00000982","24h_volume_usd":"1391610000.0","market_cap_usd":"9936064091.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"2.14","percent_change_24h":"-12.69","percent_change_7d":"166.66","last_updated":"1515473654"},{"id":"dash","name":"Dash","symbol":"DASH","rank":"11","price_usd":"1124.73","price_btc":"0.0731046","24h_volume_usd":"218169000.0","market_cap_usd":"8780735679.0","available_supply":"7806972.0","total_supply":"7806972.0","max_supply":"18900000.0","percent_change_1h":"0.9","percent_change_24h":"-7.97","percent_change_7d":"1.32","last_updated":"1515473642"},{"id":"neo","name":"NEO","symbol":"NEO","rank":"12","price_usd":"118.947","price_btc":"0.0077313","24h_volume_usd":"319218000.0","market_cap_usd":"7731555000.0","available_supply":"65000000.0","total_supply":"100000000.0","max_supply":null,"percent_change_1h":"2.59","percent_change_24h":"18.46","percent_change_7d":"41.03","last_updated":"1515473648"},{"id":"monero","name":"Monero","symbol":"XMR","rank":"13","price_usd":"441.937","price_btc":"0.0287248","24h_volume_usd":"345926000.0","market_cap_usd":"6885310341.0","available_supply":"15579846.0","total_supply":"15579846.0","max_supply":null,"percent_change_1h":"2.27","percent_change_24h":"4.27","percent_change_7d":"18.21","last_updated":"1515473642"},{"id":"eos","name":"EOS","symbol":"EOS","rank":"14","price_usd":"9.57874","price_btc":"0.0006226","24h_volume_usd":"677145000.0","market_cap_usd":"5661396986.0","available_supply":"591037755.0","total_supply":"900000000.0","max_supply":"1000000000.0","percent_change_1h":"-0.18","percent_change_24h":"-11.3","percent_change_7d":"2.48","last_updated":"1515473652"},{"id":"icon","name":"ICON","symbol":"ICX","rank":"15","price_usd":"11.9359","price_btc":"0.0007758","24h_volume_usd":"263376000.0","market_cap_usd":"4518275325.0","available_supply":"378545005.0","total_supply":"400230000.0","max_supply":null,"percent_change_1h":"-1.9","percent_change_24h":"9.81","percent_change_7d":"86.14","last_updated":"1515473656"},{"id":"qtum","name":"Qtum","symbol":"QTUM","rank":"16","price_usd":"57.5505","price_btc":"0.00374065","24h_volume_usd":"1044670000.0","market_cap_usd":"4246883899.0","available_supply":"73794040.0","total_supply":"100294040.0","max_supply":null,"percent_change_1h":"0.36","percent_change_24h":"-17.17","percent_change_7d":"-6.27","last_updated":"1515473652"},{"id":"bitcoin-gold","name":"Bitcoin Gold","symbol":"BTG","rank":"17","price_usd":"247.888","price_btc":"0.0161121","24h_volume_usd":"163889000.0","market_cap_usd":"4153019146.0","available_supply":"16753611.0","total_supply":"16853611.0","max_supply":"21000000.0","percent_change_1h":"0.47","percent_change_24h":"-7.22","percent_change_7d":"-10.61","last_updated":"1515473656"},{"id":"lisk","name":"Lisk","symbol":"LSK","rank":"18","price_usd":"31.5686","price_btc":"0.00205189","24h_volume_usd":"126212000.0","market_cap_usd":"3687426263.0","available_supply":"116806772.0","total_supply":"116806772.0","max_supply":null,"percent_change_1h":"0.97","percent_change_24h":"1.01","percent_change_7d":"46.94","last_updated":"1515473646"},{"id":"raiblocks","name":"RaiBlocks","symbol":"XRB","rank":"19","price_usd":"26.3237","price_btc":"0.00171098","24h_volume_usd":"41096400.0","market_cap_usd":"3507587991.0","available_supply":"133248289.0","total_supply":"133248289.0","max_supply":"133248290.0","percent_change_1h":"0.53","percent_change_24h":"1.59","percent_change_7d":"-20.54","last_updated":"1515473650"},{"id":"ethereum-classic","name":"Ethereum Classic","symbol":"ETC","rank":"20","price_usd":"34.2562","price_btc":"0.00222657","24h_volume_usd":"709199000.0","market_cap_usd":"3390746195.0","available_supply":"98981971.0","total_supply":"98981971.0","max_supply":null,"percent_change_1h":"-0.6","percent_change_24h":"-14.76","percent_change_7d":"-3.01","last_updated":"1515473647"},{"id":"verge","name":"Verge","symbol":"XVG","rank":"21","price_usd":"0.226005","price_btc":"0.00001469","24h_volume_usd":"899793000.0","market_cap_usd":"3280878382.0","available_supply":"14516839811.0","total_supply":"14516839811.0","max_supply":"16555000000.0","percent_change_1h":"-0.66","percent_change_24h":"30.67","percent_change_7d":"45.23","last_updated":"1515473643"},{"id":"siacoin","name":"Siacoin","symbol":"SC","rank":"22","price_usd":"0.0842649","price_btc":"0.00000548","24h_volume_usd":"173740000.0","market_cap_usd":"2645593118.0","available_supply":"31396146174.0","total_supply":"31396146174.0","max_supply":null,"percent_change_1h":"1.74","percent_change_24h":"-2.64","percent_change_7d":"175.75","last_updated":"1515473645"},{"id":"omisego","name":"OmiseGO","symbol":"OMG","rank":"23","price_usd":"25.3991","price_btc":"0.00165088","24h_volume_usd":"301973000.0","market_cap_usd":"2591788976.0","available_supply":"102042552.0","total_supply":"140245398.0","max_supply":null,"percent_change_1h":"1.2","percent_change_24h":"-4.57","percent_change_7d":"30.27","last_updated":"1515473653"},{"id":"bytecoin-bcn","name":"Bytecoin","symbol":"BCN","rank":"24","price_usd":"0.0129853","price_btc":"0.00000084","24h_volume_usd":"23402000.0","market_cap_usd":"2379602123.0","available_supply":"183253534612","total_supply":"183253534612","max_supply":"184470000000","percent_change_1h":"0.44","percent_change_24h":"-7.39","percent_change_7d":"116.13","last_updated":"1515473643"},{"id":"bitconnect","name":"BitConnect","symbol":"BCC","rank":"25","price_usd":"365.658","price_btc":"0.0237669","24h_volume_usd":"18131900.0","market_cap_usd":"2259206958.0","available_supply":"6178470.0","total_supply":"9456813.0","max_supply":"28000000.0","percent_change_1h":"-0.5","percent_change_24h":"-2.42","percent_change_7d":"-5.09","last_updated":"1515473649"}];
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
        },
        Price(value){
            return formatter.format(value);
        },
        BigNumber(value){
            var value_ = Math.trunc(value / 1000000);
            return value_.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "M";
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
