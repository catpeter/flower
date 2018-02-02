<template>
  <div class="date-picker">
    <el-select v-model="type" @change="typeChange">
      <el-option v-for="item in types" :key="item.type" :label="item.msg" :value="item.type"></el-option>
    </el-select> 
    <el-date-picker
    　v-show="type === 'date'"
      v-model="dateValue"
      type="date"
      placeholder="选择日期"
      :picker-options="date.options"
      @change="handleChange">
    </el-date-picker>
    <el-date-picker
    　v-show="type === 'week'"
      v-model="weekValue"
      type="week"
      placeholder="选择日期"
      :picker-options="week.options"
      @change="handleChange">
    </el-date-picker>
    <el-date-picker
    　v-show="type === 'month'"
      v-model="monthValue"
      type="month"
      placeholder="选择日期"
      :picker-options="month.options"
      @change="handleChange">
    </el-date-picker>
    <el-date-picker
    　v-show="type === 'year'"
      v-model="yearValue"
      type="year"
      placeholder="选择日期"
      :picker-options="year.options"
      @change="handleChange">
    </el-date-picker>
    <el-date-picker
      v-show="type === 'daterange'"
      v-model="rangeValue"
      type="daterange"
      placeholder="选择日期"
      :picker-options="daterange.options"
      @change="handleChange">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        startTime: '',
        endTime: '',
        dateValue: '',
        weekValue: '',
        monthValue: '',
        yearValue: '',
        rangeValue: '',
        msg: '时间范围',
        type: 'date',
        types: [{
          msg: '按日统计',
          type: 'date'
        }, {
          msg: '按周统计',
          type: 'week'
        }, {
          msg: '按月统计',
          type: 'month'
        }, {
          msg: '按年统计',
          type: 'year'
        }, {
          msg: '自定义范围',
          type: 'daterange'
        }],
        date: {
          type: 'date',
          options: {
            firstDayOfWeek: 1,
            disabledDate (time) {
              return time.getTime() > Date.now()
            }
          }
        },
        week: {
          type: 'week',
          options: {
            firstDayOfWeek: 1,
            disabledDate (time) {
              return time.getTime() > Date.now()
            }
          }
        },
        month: {
          type: 'month',
          options: {
            firstDayOfWeek: 1,
            disabledDate (time) {
              return time.getTime() > Date.now()
            }
          }
        },
        year: {
          type: 'year',
          options: {
            firstDayOfWeek: 1,
            disabledDate (time) {
              return time.getTime() > Date.now()
            }
          }
        },
        daterange: {
          type: 'daterange',
          options: {
            firstDayOfWeek: 1,
            disabledDate (time) {
              return time.getTime() > Date.now()
            }
          }
        }
      }
    },
    created () {
      // let tabId = this.getcookie('tabId')
      // let sysModelId = this.getcookie('sysModelId')
      // this.getData(tabId + '-' + sysModelId + '-')
    },
    // props: {
    //   datePickerType: {
    //     type: String,
    //     required: true
    //   }
    // },
    // computed: mapGetters({
    //   top_sideTree: 'getSideTree'
    // }),
    methods: {
      typeChange (val) {
        console.log('typeChange')
        // console.log(this.type)
        console.log(val)
        this.dateValue = ''
        this.weekValue = ''
        this.monthValue = ''
        this.yearValue = ''
        this.rangeValue = ''
        console.log(this.dateValue)
        console.log(this.weekValue)
        console.log(this.monthValue)
        console.log(this.yearValue)
        console.log(this.rangeValue)
        // this.value1 = ''
        // this.value2.splice(0)
        // this.value2.splice(0)
      },
      handleChange (val) {
        console.log('handleChange')
        console.log(val)
        console.log(this.dateValue)
        console.log(this.weekValue)
        console.log(this.monthValue)
        console.log(this.yearValue)
        console.log(this.rangeValue)
        // console.log(this.value1)
        // console.log(this.value2)
        // this.value2.splice(0)
      }
    }
  }
</script>
