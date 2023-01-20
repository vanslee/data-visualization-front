<template>
    <div class="box-left-line">

    </div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useStore } from '@/stores';
const store = useStore()
onMounted(() => {
    setTimeout(() => {
        initLine()
    }, 1000);
})
const initLine = () => {
    const charts = echarts.init(document.querySelector('.box-left-line') as HTMLElement)
    charts.setOption({
        backgroundColor: "#223651",
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: store.items.map(v => v.name),
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: "#fff"
                }
            }
        },
        label: {
            show: true
        },
        series: [
            {
                data: store.items.map(v => v.total.heal),
                type: 'line',
                smooth: true
            }
        ]
    })
}
</script>
<style scoped>

</style>
