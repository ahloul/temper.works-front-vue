<template>
  <div class="container">
    <LineChart
      :chartData="lineChartData"
    ></LineChart>
  </div>

</template>

<script lang="ts">
import LineChart from '~/components/LineChart'
import {Vue, Component, Prop} from "vue-property-decorator";
import {ChartData, ChartOptions, ChartDataSets, ChartPoint} from "chart.js";
import axios from "axios";
import {RerentionCurve, RerentionCurveWeek} from '~/types/RerentionCurve'


@Component({
  components: {LineChart}
})

export default class ClassifiersDetailsInformation extends Vue {
  lineChartData: ChartData = {};
  chartOptions: ChartOptions = {};
  items: RerentionCurveWeek[] = [];


  chartColors = [
    "#1b31c1",
    "#5c69bd",
    "#ce7272",
    "#d55c5c",
    "#dc4747",
    "#438119",
    "#d77171",
    "#9f4545",
    "#797272",
    "#0c2105",

  ];

  async getData() {
    console.log(process.env)
    const response: RerentionCurveWeek[] = (await axios.get<RerentionCurveWeek[]>(this.$config.baseURL+'/api/retention-curves/index')).data;
    const datasets: ChartDataSets[] = [];
    for (const data of response) {
      console.log(1)
      const dataSet: ChartDataSets = {};
      dataSet.borderColor = this.chartColors[Math.floor(Math.random() * this.chartColors.length)];
      console.log(data.data)

      dataSet.label = data.week
      dataSet.data = data.data
      dataSet.showLine = true
      dataSet.fill = false
      datasets.push(dataSet);
    }
    console.log("datasets")
    console.log(datasets)
    console.log("datasets")

    return datasets

  }

  async mounted() {
    let lineChartData = await this.getData()
    const labels = [];
    console.log(lineChartData)
    for (let i = 0; i < 100; ++i) {
      labels.push(i.toString());
    }
    this.lineChartData = {
      // labels: labels,
      datasets: lineChartData
    }

  }
}
</script>
