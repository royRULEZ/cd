
import { Bar, mixins } from 'vue-chartjs';
const {reactiveProp} = mixins;




  var options = { 
    responsive: true, 
    maintainAspectRatio: false, 
    barPercentage: 1,
    scales: { 
        yAxes: [{ 
            gridLines: {
                display: false 
            }, 
            ticks: { 
                suggestedMax: 100 
            } 
        }], 
        xAxes: [{
            display: true 
        }] 
    } 
}


  

export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: ['options'],
    mounted () {
        this.renderChart(
            this.chartData, options)
    }
}