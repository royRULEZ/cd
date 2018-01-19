
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

var options = { 
    responsive: true, 
    maintainAspectRatio: false, 
    scales: { 
        yAxes: [{ 
            gridLines: {
                display: true 
            }, 
            ticks: { 
                suggestedMax: 100 
            } 
        }], 
        xAxes: [{
            display: false 
        }] 
    } 
}



export default {
    extends: Line,
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.chartData, options)
    }
}