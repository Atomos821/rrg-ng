import { Component, computed, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ChartData } from '../chart-models';
// import { OverviewActivity } from '../../../features/stats/models/stats.models';

@Component({
  selector: 'app-chart-histogram',
  imports: [NgxEchartsDirective],
  templateUrl: './chart-histogram.html',
  styleUrl: './chart-histogram.scss',
})
export class ChartHistogram {
  title = input<string | null>();
  data = input.required<ChartData[]>();

  options = computed<EChartsOption>(() => {
    const data = this.data();
    if (!data.length) return {};

    const seriesKeys = Object.keys(data[0].y);

    return {
      textStyle: {
        fontFamily: 'Inter, sans-serif', // TODO: make this configurable and injectable
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // TODO: make this configurable and injectable
        borderColor: 'rgba(255, 255, 255, 0.1)', // TODO: make this configurable and injectable
        textStyle: {
          color: '#f0f0f0',
        },
        extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);', // TODO: make this configurable and injectable
      },
      // legend: {
      //   data: seriesKeys,
      //   textStyle: {
      //     color: '#ccc'
      //   }
      // },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        borderColor: '#333', // TODO: make this configurable and injectable
      },
      xAxis: {
        type: 'category',
        data: data.map((d) => d.x),
        axisLabel: {
          color: '#aaa' // TODO: make this configurable and injectable
        },
        axisLine: {
          lineStyle: {
            color: '#333' // TODO: make this configurable and injectable
          }
        }
      },
      yAxis: {
        type: 'value',
        splitLine: {
          lineStyle: {
            color: '#333' // TODO: make this configurable and injectable
          }
        },
        axisLabel: {
          color: '#aaa' // TODO: make this configurable and injectable
        }
      },
      color: ['#FF4C4C', '#4CA6FF', '#4CFF4C', '#FFFF4C'], // TODO: make this configurable and injectable
      series: seriesKeys.map(key => ({
        name: key,
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series',
        },
        data: data.map((d) => d.y[key]),
        itemStyle: {
          borderRadius: [4, 4, 0, 0]
        }
      })),
    };
  });
}
