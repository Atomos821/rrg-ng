import { Component, computed, input } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { ChartData } from '../chart-models';

@Component({
    selector: 'app-chart-line',
    imports: [NgxEchartsDirective],
    templateUrl: './chart-line.html',
    styleUrl: './chart-line.scss',
})
export class ChartLine {
    title = input<string | null>();
    data = input.required<ChartData[]>();

    options = computed<EChartsOption>(() => {
        const data = this.data();
        if (!data.length) return {};

        const seriesKeys = Object.keys(data[0].y);

        return {
            textStyle: {
                fontFamily: 'Inter, sans-serif',
            },
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                textStyle: {
                    color: '#f0f0f0',
                },
                extraCssText: 'backdrop-filter: blur(8px); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);',
            },
            // legend: {
            //     data: seriesKeys,
            //     textStyle: {
            //         color: '#ccc'
            //     },
            // },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
                borderColor: '#333',
            },
            xAxis: {
                type: 'category',
                data: data.map((d) => d.x),
                axisLabel: {
                    color: '#aaa'
                },
                axisLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                boundaryGap: false // Better for line charts
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: '#333'
                    }
                },
                axisLabel: {
                    color: '#aaa'
                }
            },
            color: ['#FF4C4C', '#4CA6FF', '#4CFF4C', '#FFFF4C'],
            series: seriesKeys.map(key => ({
                name: key,
                type: 'line',
                smooth: true,
                // stack: 'total', // Stacking might not be desired for lines always, usually comparison is better. I'll remove stack for now unless "histogram" implies stacking context. User said "similar component", let's keep it simple first. Actually, for kills/deaths, stacking lines (area) is common or just separate lines. I'll use separate lines for clarity.
                // stack: 'total', 
                emphasis: {
                    focus: 'series',
                },
                data: data.map((d) => d.y[key]),
                symbol: 'none', // Cleaner look for smooth lines
            })),
        };
    });
}
