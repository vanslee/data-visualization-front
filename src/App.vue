<template>
  <div class="box" :style="{ background: `url(${bg})` }">
    <div style="color: white" class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ 1860</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>本土现有确诊</div>
        </section>

        <section>
          <div>较上日+ 4234</div>
          <div>{{ store.chinaTotal.suspect }}</div>
          <div>现有确诊</div>
        </section>



        <section>
          <div>较上日+ 5584</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计确诊</div>
        </section>



        <section>
          <div>较上日+ 1338</div>
          <div>{{ store.chinaTotal.severe }}</div>
          <div>境外输入</div>
        </section>


        <section>
          <div>较上日+ 92</div>
          <div>{{ store.chinaTotal.heal }}</div>
          <div>无症状感染者</div>
        </section>


        <section>
          <div>较上日+ 289</div>
          <div>{{ store.chinaTotal.suspect }}</div>
          <div>累计死亡</div>
        </section>

      </div>
      <PieChart></PieChart>
      <LineChart></LineChart>

    </div>
    <div class="box-center" id="china">
    </div>
    <div class="box-right">

      <table class="table" cellspacing="0" border="1">
        <thead>
          <tr>
            <th>地区</th>
            <th>总确认病例</th>
            <th>总疑似病例</th>
            <th>总治愈病例</th>
            <th>总死亡病例</th>
            <th>总重症病例</th>
          </tr>
        </thead>
        <TransitionGroup tag="tbody" enter-active-class="animate__animated animate__jackInTheBox">
          <tr :key="item.id" v-for="item in store.items">
            <td>{{ item.name }}</td>
            <td>{{ item.total.confirm }}</td>
            <td>{{ item.total.suspect }}</td>
            <td>{{ item.total.heal }}</td>
            <td>{{ item.total.dead }}</td>
            <td>{{ item.total.severe }}</td>
          </tr>
        </TransitionGroup>
      </table>

    </div>
  </div>
</template>
<script setup lang='ts'>
import { ref, onMounted, reactive } from 'vue'
import 'animate.css'
import bg from './assets/bg.jpg'
import { useStore } from './stores'
import * as echarts from 'echarts'
import './assets/china.js'
import { geoCoordMap } from './types/GeoCoordMap'
import PieChart from './components/PieChart.vue'
import LineChart from './components/LineChart.vue'
const store = useStore();

onMounted(async () => {
  await store.getList();
  initEcharts()

})

const initEcharts = () => {
  const city = store.list.data.children
  const data = city.map(v => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.confirm),
      children: v.children,
      selected: v.name == '湖北'
    }
  })


  const chineseMap = echarts.init(document.querySelector('#china') as HTMLElement)



  chineseMap.setOption({
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        //  normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#0673AD", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            //normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            //},
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        zoom: 1.2,
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: true,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'pin',
        symbolSize: [45, 45],
        label: {
          show: true,
          color: "#fff",
          formatter(data: any) {
            return data.value[2]

          }
        },
        itemStyle: {
          color: '#1E90FF', //标志颜色
        },
        data: data,
      },
    ],
  })
  chineseMap.on('click', (e: any) => {
    store.items = e.data.children

  })
}

</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;

.table {
  width: 100%;
  background: #212028;

  tr {
    th {
      padding: 5px;
      white-space: nowrap;
    }

    td {
      padding: 5px 10px;
      width: 100px;
      white-space: nowrap;
    }
  }
}

html,
body,
#app {
  height: 100%;
  overflow: hidden;
}

.box {
  height: 100%;
  display: flex;
  overflow: hidden;
  padding: 10px;

  &-left {
    width: 400px;


    &-line {
      height: 320px;
      margin-top: 20px;
    }

    &-card {
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;

      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;

        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }

  &-center {
    flex: 1;
  }

  &-right {
    width: 450px;
  }
}
</style>
