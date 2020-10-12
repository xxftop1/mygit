<template>
  <div class="main_area fd-home-wrap">
    <div class="main_name">修改罪犯信息<aty-breadcrumb  can-click="" separator=">"></aty-breadcrumb></div>
    <div class="main_box">
      <div class="dr_edit_butn">
          <aty-button class="dr_edit_b1" type="primary">
              <span>
                 <router-link :to="{path:'/criminalInfo'}" >罪犯信息列表</router-link>
              </span>
          </aty-button>
      </div>
      <div class="fd-filter-panel">
              <aty-form :label-width="110" ref="form">
                <aty-row>
                  <aty-col>
                    <aty-select label="状态" v-model="zt" :data="ztList"></aty-select>
                  </aty-col>
                  <aty-col>
                    <aty-date-picker label ="状态生效日期" type="date" name="ztSxDate" v-model="ztsxDate"></aty-date-picker>
                  </aty-col>
                </aty-row>
                <aty-row>
                  <aty-col>
                    <aty-input label="工种" v-model="gz"></aty-input>
                  </aty-col>
                  <aty-col>
                    <aty-input label="劳动小组" v-model="ldxz"></aty-input>
                  </aty-col>
                </aty-row>
                <aty-row>
                  <aty-col>
                    <aty-radio-group label="有无劳动能力" name="ywldnl" v-model="ywldnl" :data-list="ywRadioGroup"></aty-radio-group>
                  </aty-col>
                  <aty-col>
                    <aty-date-picker label ="生效日期" type="date" name="ywldnlSxDate" v-model="ywldnlSxDate"></aty-date-picker>
                  </aty-col>
                </aty-row>
                <aty-row>
                  <aty-col>
                    <aty-radio-group label="有无劳动定额" name="ywldde" v-model="ywldde" :data-list="ywRadioGroup"></aty-radio-group>
                  </aty-col>
                  <aty-col>
                    <aty-date-picker label ="生效日期" type="date" name="ywlddeSxDate" v-model="ywlddeSxDate"></aty-date-picker>
                  </aty-col>
                </aty-row>
               <aty-row>
                  <aty-col>
                    <aty-radio-group label="是否关键技术岗位" name="sfgjjsgw" v-model="sfgjjsgw" :data-list="sfRadioGroup"></aty-radio-group>
                  </aty-col>
                  <aty-col>
                    <aty-date-picker label ="生效日期" type="date" name="sfgjjsgwSxDate" v-model="sfgjjsgwSxDate"></aty-date-picker>
                  </aty-col>
                </aty-row>

              </aty-form>
            <aty-panel class="btm-btns">
              <aty-button size="large" type="success" icon="chatbubbles">保存</aty-button>
            </aty-panel>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function() {
      return {
        bjyy:'',
        sftq:'',
        sfyz:'',
        sfjx:'',
        sftb:'',
        score:'',
        endDate:'',
        startDate:'',
        zfxmbh:'',
        sftb:'',
        ztList:[
          {
            code:'1',
            codeType:'1',
            name: '在押'
          },
          {
            code:'2',
            codeType:'2',
            name: '入监教育期新犯'
          },
          {
            code:'3',
            codeType:'3',
            name: '监狱医院住院'
          },
          {
            code:'4',
            codeType:'4',
            name: '隔离审查（立案侦查）'
          },
          {
            code:'5',
            codeType:'5',
            name: '解回再审'
          },
          {
            code:'6',
            codeType:'6',
            name: '社会医院住院'
          },
          {
            code:'7',
            codeType:'7',
            name: '暂予监外执行'
          },
          {
            code:'8',
            codeType:'8',
            name: '金华监狱精神病区（重症）'
          },
          {
            code:'9',
            codeType:'9',
            name: '高度戒备'
          },
          {
            code:'10',
            codeType:'10',
            name: '借用'
          },
          {
            code:'11',
            codeType:'11',
            name: '脱逃'
          },
          {
            code:'12',
            codeType:'12',
            name: '监狱中心医院住院'
          },
        ],
        //有无单选
        ywRadioGroup:[
          {
            code: '0',
            codeType:'radioGroup',
            name: '无'
          },
          {
            code: '1',
            codeType:'radioGroup',
            name: '有'
          }
        ],
        //是否单选
        sfRadioGroup:[
          {
            code: '0',
            codeType:'radioGroup',
            name: '否'
          },
          {
            code: '1',
            codeType:'radioGroup',
            name: '是'
          }
        ]
      }
    },
    methods:{

    },
    computed:{

    },
    mounted() {

    }
  }
</script>

<style scoped>
.dr_edit_b1{
    height: 30px;
    line-height: 30px;
    padding-top: 0px;
    padding-bottom: 0px;
    font-size: 14px;
    background-color: #00ccbb;
    border-color: #00ccbb;
    margin-right: 12px;
}
.dr_edit_b1:hover{
    background-color: #0fdbca;
    border-color: #0fdbca;
}
  .fd-home-wrap{
    height:100%;
  }
  .fd-home-wrap .main_box{
    height:calc(100% - 80px);
  }

</style>
