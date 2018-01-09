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
                        <router-link :to="`/currency/${coin.slug}`">{{coin.symbol}}</router-link></td>
                    <td class="id left_align">{{coin.slug}}</td> 
                    <td class="posts" v-ripple>1000</td>
                    <td class="posts" v-ripple>1000</td>
                    <td class="posts" v-ripple>1000</td>
                    <td class="posts" v-ripple>1000</td>
                    <td class="posts" v-ripple>1000</td>
                    <td class="change_green">10%</td>
                    <td class="change_green">100%</td>
                    <td class="change_green">500%</td>           
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
            this.thisJSON = [{"tokens":["Bitcoin","BTC"],"symbol":"BTC","name":"Bitcoin","rank":1,"slug":"bitcoin"},{"tokens":["Ethereum","ETH"],"symbol":"ETH","name":"Ethereum","rank":2,"slug":"ethereum"},{"tokens":["Ripple","XRP"],"symbol":"XRP","name":"Ripple","rank":3,"slug":"ripple"},{"tokens":["Bitcoin Cash","BCH"],"symbol":"BCH","name":"Bitcoin Cash","rank":4,"slug":"bitcoin-cash"},{"tokens":["Cardano","ADA"],"symbol":"ADA","name":"Cardano","rank":5,"slug":"cardano"},{"tokens":["NEM","XEM"],"symbol":"XEM","name":"NEM","rank":6,"slug":"nem"},{"tokens":["Litecoin","LTC"],"symbol":"LTC","name":"Litecoin","rank":7,"slug":"litecoin"},{"tokens":["Stellar","XLM"],"symbol":"XLM","name":"Stellar","rank":8,"slug":"stellar"},{"tokens":["IOTA","MIOTA"],"symbol":"MIOTA","name":"IOTA","rank":9,"slug":"iota"},{"tokens":["TRON","TRX"],"symbol":"TRX","name":"TRON","rank":10,"slug":"tron"},{"tokens":["Dash","DASH"],"symbol":"DASH","name":"Dash","rank":11,"slug":"dash"},{"tokens":["NEO","NEO"],"symbol":"NEO","name":"NEO","rank":12,"slug":"neo"},{"tokens":["Monero","XMR"],"symbol":"XMR","name":"Monero","rank":13,"slug":"monero"},{"tokens":["EOS","EOS"],"symbol":"EOS","name":"EOS","rank":14,"slug":"eos"},{"tokens":["Qtum","QTUM"],"symbol":"QTUM","name":"Qtum","rank":15,"slug":"qtum"},{"tokens":["ICON","ICX"],"symbol":"ICX","name":"ICON","rank":16,"slug":"icon"},{"tokens":["Bitcoin Gold","BTG"],"symbol":"BTG","name":"Bitcoin Gold","rank":17,"slug":"bitcoin-gold"},{"tokens":["Lisk","LSK"],"symbol":"LSK","name":"Lisk","rank":18,"slug":"lisk"},{"tokens":["RaiBlocks","XRB"],"symbol":"XRB","name":"RaiBlocks","rank":19,"slug":"raiblocks"},{"tokens":["Ethereum Classic","ETC"],"symbol":"ETC","name":"Ethereum Classic","rank":20,"slug":"ethereum-classic"},{"tokens":["Verge","XVG"],"symbol":"XVG","name":"Verge","rank":21,"slug":"verge"},{"tokens":["OmiseGO","OMG"],"symbol":"OMG","name":"OmiseGO","rank":22,"slug":"omisego"},{"tokens":["Siacoin","SC"],"symbol":"SC","name":"Siacoin","rank":23,"slug":"siacoin"},{"tokens":["Bytecoin","BCN"],"symbol":"BCN","name":"Bytecoin","rank":24,"slug":"bytecoin-bcn"},{"tokens":["BitConnect","BCC"],"symbol":"BCC","name":"BitConnect","rank":25,"slug":"bitconnect"},{"tokens":["Populous","PPT"],"symbol":"PPT","name":"Populous","rank":26,"slug":"populous"},{"tokens":["Stratis","STRAT"],"symbol":"STRAT","name":"Stratis","rank":27,"slug":"stratis"},{"tokens":["Zcash","ZEC"],"symbol":"ZEC","name":"Zcash","rank":28,"slug":"zcash"},{"tokens":["BitShares","BTS"],"symbol":"BTS","name":"BitShares","rank":29,"slug":"bitshares"},{"tokens":["Dentacoin","DCN"],"symbol":"DCN","name":"Dentacoin","rank":30,"slug":"dentacoin"},{"tokens":["Dogecoin","DOGE"],"symbol":"DOGE","name":"Dogecoin","rank":31,"slug":"dogecoin"},{"tokens":["Binance Coin","BNB"],"symbol":"BNB","name":"Binance Coin","rank":32,"slug":"binance-coin"},{"tokens":["Status","SNT"],"symbol":"SNT","name":"Status","rank":33,"slug":"status"},{"tokens":["Ardor","ARDR"],"symbol":"ARDR","name":"Ardor","rank":34,"slug":"ardor"},{"tokens":["KuCoin Shares","KCS"],"symbol":"KCS","name":"KuCoin Shares","rank":35,"slug":"kucoin-shares"},{"tokens":["Steem","STEEM"],"symbol":"STEEM","name":"Steem","rank":36,"slug":"steem"},{"tokens":["Tether","USDT"],"symbol":"USDT","name":"Tether","rank":37,"slug":"tether"},{"tokens":["Waves","WAVES"],"symbol":"WAVES","name":"Waves","rank":38,"slug":"waves"},{"tokens":["VeChain","VEN"],"symbol":"VEN","name":"VeChain","rank":39,"slug":"vechain"},{"tokens":["DigiByte","DGB"],"symbol":"DGB","name":"DigiByte","rank":40,"slug":"digibyte"},{"tokens":["Komodo","KMD"],"symbol":"KMD","name":"Komodo","rank":41,"slug":"komodo"},{"tokens":["Dragonchain","DRGN"],"symbol":"DRGN","name":"Dragonchain","rank":42,"slug":"dragonchain"},{"tokens":["Golem","GNT"],"symbol":"GNT","name":"Golem","rank":43,"slug":"golem-network-tokens"},{"tokens":["Augur","REP"],"symbol":"REP","name":"Augur","rank":44,"slug":"augur"},{"tokens":["Hshare","HSR"],"symbol":"HSR","name":"Hshare","rank":45,"slug":"hshare"},{"tokens":["Veritaseum","VERI"],"symbol":"VERI","name":"Veritaseum","rank":46,"slug":"veritaseum"},{"tokens":["Electroneum","ETN"],"symbol":"ETN","name":"Electroneum","rank":47,"slug":"electroneum"},{"tokens":["Kin","KIN"],"symbol":"KIN","name":"Kin","rank":48,"slug":"kin"},{"tokens":["Ark","ARK"],"symbol":"ARK","name":"Ark","rank":49,"slug":"ark"},{"tokens":["Nexus","NXS"],"symbol":"NXS","name":"Nexus","rank":50,"slug":"nexus"},{"tokens":["ReddCoin","RDD"],"symbol":"RDD","name":"ReddCoin","rank":51,"slug":"reddcoin"},{"tokens":["Ethos","ETHOS"],"symbol":"ETHOS","name":"Ethos","rank":52,"slug":"ethos"},{"tokens":["Dent","DENT"],"symbol":"DENT","name":"Dent","rank":53,"slug":"dent"},{"tokens":["Basic Attention Token","BAT"],"symbol":"BAT","name":"Basic Attention Token","rank":54,"slug":"basic-attention-token"},{"tokens":["Decred","DCR"],"symbol":"DCR","name":"Decred","rank":55,"slug":"decred"},{"tokens":["PIVX","PIVX"],"symbol":"PIVX","name":"PIVX","rank":56,"slug":"pivx"},{"tokens":["Experience Points","XP"],"symbol":"XP","name":"Experience Points","rank":57,"slug":"experience-points"},{"tokens":["SALT","SALT"],"symbol":"SALT","name":"SALT","rank":58,"slug":"salt"},{"tokens":["0x","ZRX"],"symbol":"ZRX","name":"0x","rank":59,"slug":"0x"},{"tokens":["FunFair","FUN"],"symbol":"FUN","name":"FunFair","rank":60,"slug":"funfair"},{"tokens":["Factom","FCT"],"symbol":"FCT","name":"Factom","rank":61,"slug":"factom"},{"tokens":["QASH","QASH"],"symbol":"QASH","name":"QASH","rank":62,"slug":"qash"},{"tokens":["Kyber Network","KNC"],"symbol":"KNC","name":"Kyber Network","rank":63,"slug":"kyber-network"},{"tokens":["Aion","AION"],"symbol":"AION","name":"Aion","rank":64,"slug":"aion"},{"tokens":["Power Ledger","POWR"],"symbol":"POWR","name":"Power Ledger","rank":65,"slug":"power-ledger"},{"tokens":["WAX","WAX"],"symbol":"WAX","name":"WAX","rank":66,"slug":"wax"},{"tokens":["Request Network","REQ"],"symbol":"REQ","name":"Request Network","rank":67,"slug":"request-network"},{"tokens":["Bytom","BTM"],"symbol":"BTM","name":"Bytom","rank":68,"slug":"bytom"},{"tokens":["aelf","ELF"],"symbol":"ELF","name":"aelf","rank":69,"slug":"aelf"},{"tokens":["Aeternity","AE"],"symbol":"AE","name":"Aeternity","rank":70,"slug":"aeternity"},{"tokens":["Substratum","SUB"],"symbol":"SUB","name":"Substratum","rank":71,"slug":"substratum"},{"tokens":["Nxt","NXT"],"symbol":"NXT","name":"Nxt","rank":72,"slug":"nxt"},{"tokens":["DigitalNote","XDN"],"symbol":"XDN","name":"DigitalNote","rank":73,"slug":"digitalnote"},{"tokens":["Enigma","ENG"],"symbol":"ENG","name":"Enigma","rank":74,"slug":"enigma-project"},{"tokens":["Byteball Bytes","GBYTE"],"symbol":"GBYTE","name":"Byteball Bytes","rank":75,"slug":"byteball"},{"tokens":["MaidSafeCoin","MAID"],"symbol":"MAID","name":"MaidSafeCoin","rank":76,"slug":"maidsafecoin"},{"tokens":["Gas","GAS"],"symbol":"GAS","name":"Gas","rank":77,"slug":"gas"},{"tokens":["RChain","RHOC"],"symbol":"RHOC","name":"RChain","rank":78,"slug":"rchain"},{"tokens":["Syscoin","SYS"],"symbol":"SYS","name":"Syscoin","rank":79,"slug":"syscoin"},{"tokens":["MonaCoin","MONA"],"symbol":"MONA","name":"MonaCoin","rank":80,"slug":"monacoin"},{"tokens":["Santiment Network Token","SAN"],"symbol":"SAN","name":"Santiment Network Token","rank":81,"slug":"santiment"},{"tokens":["Iconomi","ICN"],"symbol":"ICN","name":"Iconomi","rank":82,"slug":"iconomi"},{"tokens":["BitcoinDark","BTCD"],"symbol":"BTCD","name":"BitcoinDark","rank":83,"slug":"bitcoindark"},{"tokens":["Quantstamp","QSP"],"symbol":"QSP","name":"Quantstamp","rank":84,"slug":"quantstamp"},{"tokens":["ChainLink","LINK"],"symbol":"LINK","name":"ChainLink","rank":85,"slug":"chainlink"},{"tokens":["ZCoin","XZC"],"symbol":"XZC","name":"ZCoin","rank":86,"slug":"zcoin"},{"tokens":["Time New Bank","TNB"],"symbol":"TNB","name":"Time New Bank","rank":87,"slug":"time-new-bank"},{"tokens":["Po.et","POE"],"symbol":"POE","name":"Po.et","rank":88,"slug":"poet"},{"tokens":["DigixDAO","DGD"],"symbol":"DGD","name":"DigixDAO","rank":89,"slug":"digixdao"},{"tokens":["TenX","PAY"],"symbol":"PAY","name":"TenX","rank":90,"slug":"tenx"},{"tokens":["PACcoin","PAC"],"symbol":"PAC","name":"PACcoin","rank":91,"slug":"paccoin"},{"tokens":["Neblio","NEBL"],"symbol":"NEBL","name":"Neblio","rank":92,"slug":"neblio"},{"tokens":["Walton","WTC"],"symbol":"WTC","name":"Walton","rank":93,"slug":"walton"},{"tokens":["Gnosis","GNO"],"symbol":"GNO","name":"Gnosis","rank":94,"slug":"gnosis-gno"},{"tokens":["Civic","CVC"],"symbol":"CVC","name":"Civic","rank":95,"slug":"civic"},{"tokens":["ETHLend","LEND"],"symbol":"LEND","name":"ETHLend","rank":96,"slug":"ethlend"},{"tokens":["Raiden Network Token","RDN"],"symbol":"RDN","name":"Raiden Network Token","rank":97,"slug":"raiden-network-token"},{"tokens":["Bancor","BNT"],"symbol":"BNT","name":"Bancor","rank":98,"slug":"bancor"},{"tokens":["DeepBrain Chain","DBC"],"symbol":"DBC","name":"DeepBrain Chain","rank":99,"slug":"deepbrain-chain"},{"tokens":["ZClassic","ZCL"],"symbol":"ZCL","name":"ZClassic","rank":100,"slug":"zclassic"}];
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
    
    /*
    
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
                    
                                this.thisJSON = [{"id":"tron","name":"TRON","symbol":"TRX","rank":"2","price_usd":"0.197","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}},{"id":"ROY","name":"ROY","symbol":"TRX","rank":"8","price_usd":"16500.03","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}},{"id":"tron","name":"TRON","symbol":"TRX","rank":"8","price_usd":"0197","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}},{"id":"ROY","name":"ROY","symbol":"TRX","rank":"5","price_usd":"16500.03","price_btc":"0.00001142","24h_volume_usd":"3199220000.0","market_cap_usd":"12589266651.0","available_supply":"65748192475.0","total_supply":"100000000000","max_supply":null,"percent_change_1h":"-13.64","percent_change_24h":"-27.58","percent_change_7d":"449.78","last_updated":"1515206954","reddit":{"score":"1000","ups":"4000","comments":"1001","threads":"10002"}}];
                                
                                
                    */

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
