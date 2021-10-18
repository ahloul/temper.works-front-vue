import { Line, mixins } from "vue-chartjs";
import { Component, Vue, Prop,Mixins } from "vue-property-decorator";
import { ChartData, ChartOptions } from "chart.js";
@Component({
  extends: Line,
  mixins: [mixins.reactiveProp],
})
export default class LineChart extends Mixins(mixins.reactiveProp, Line) {
  @Prop() chartData!: ChartData;
  // @Prop() chartOptions!: ChartOptions;
  chartOptions:ChartOptions = {
    responsive: true,
    legend: {
      display: true,
    },
    title: {
      display: true,
      text: 'Curve Retention'
    },
    scales: {
      type: 'linear',

      yAxes: [
        {

          ticks: {
            beginAtZero: true
          }
        }
      ],  xAxes: [
        {
          type: 'linear',

          ticks: {
            max: 100,
            min: 0,
            stepSize: 5,
            callback: function(value) {
              return value + "%"
            }
          },
          scaleLabel: {
            display: true,
          },
          gridLines: {
            drawBorder: true,
          },
        },
      ],
    }
  }

  mounted(): void {
    this.renderChart(this.chartData, this.chartOptions);

  }

  public renderChart!: (chartData: any, options: any) => void;



}
