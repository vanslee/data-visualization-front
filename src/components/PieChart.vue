<template>
    <div class="box-left-pie"></div>
</template>
<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useStore } from '@/stores';
const store = useStore()
onMounted(() => {
    setTimeout(() => {
        initPie()
    }, 1000);
})
const initPie = () => {
    const charts = echarts.init(document.querySelector('.box-left-pie') as HTMLElement)
    charts.setOption({
        backgroundColor: "#223651",
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'pie',
                radius: ['40%', '70%'],
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '15',
                    }
                },
                data: store.items.map(v => {
                    return {
                        name: v.name,
                        value: v.total.confirm
                    }
                })
            }
        ]
    })
}
</script>
<style scoped>
.box-left-pie {
    height: 320px;
    margin-top: 20px;
}
</style>
