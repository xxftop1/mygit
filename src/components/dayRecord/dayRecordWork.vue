<template>
    <!-- 内容部分start -->
    <div class="main_area fd-home-wrap fd-index-wrap fd-rjz-box">
      <div class="main_name"><aty-breadcrumb can-click  separator=">" :data="breadcrumbdata"></aty-breadcrumb></div>
      <happy-scroll resize hide-horizontal color="rgba(112,177,243,1)" size="5" >
      <div class="p_main_box  fd-day-record">
        <aty-row class="search_option_box">
          <aty-col span="6" class="search_option_marginb">
            <p class="search_option_text_long">罪犯姓名/编号:</p>
            <aty-input class="search_option_input" v-model="zfbhHxm" clearable></aty-input>
          </aty-col>
          <aty-col span="6" class="search_option_marginb">
            <p class="search_option_text">小组:</p>
            <aty-input class="search_option_input" v-model="szxz" clearable></aty-input>
          </aty-col>
          <aty-col span="6" class="search_option_marginb">
            <p class="search_option_text">工种:</p>
            <aty-input class="search_option_input" v-model="gz" clearable></aty-input>
          </aty-col>
          <aty-col  span="6" class="search_option_marginb">
              <p class="search_option_text">年月:</p>
              <aty-date-picker type="month" :clearable="false" :options= "options1" placeholder="选择年月" v-model="ssny" :editable='false'></aty-date-picker>
          </aty-col>
          <aty-col span="24" class="search_option_marginb search_option_textr fd-btns-center">
            <aty-button @click="searchButn()" class="search_option_butn1" type="primary">
              <i>
                <img src="../../assets/images/w-png17.png">
              </i>
              <span>查询</span>
            </aty-button>
            <aty-button @click="reSetSearchOption()" class="search_option_butn2" type="default">
              <i>
                <img src="../../assets/images/w-png18.png">
              </i>
              <span>重置</span>
            </aty-button>
          </aty-col>
        </aty-row>
        <!-- table區域 start -->
        <aty-table class="drw_table fd-rjzhz-table" :pageable-data="tableData" style="width: 100%;" :exp-all="false"  :exp-current-page="false">
          <aty-table-column prop="zfxm" label="罪犯姓名" class-name="lh">
            <!--<template slot-scope="props" >
              <a :title="props.row.zfxm"  v-text="props.row.zfxm" :href = "url+ props.row.zfxxBh"  target="_blank"></a>
            </template>-->
          </aty-table-column>
          <aty-table-column prop="zfBh" label="罪犯编号" class-name="lh">
          </aty-table-column>
          <aty-table-column prop="szxz" label="小组" class-name="lh">
          </aty-table-column>
          <aty-table-column prop="gz" label="工种" class-name="lh">
          </aty-table-column>
          <aty-table-column :label="'年月:'+lbssny" min-width="952" :showOverflowTooltip="false">
            <aty-table-column prop="type" width="34" label="1" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '1')) && (scope.row.bx[0] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[0]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '1')) && (scope.row.bx[0] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[0]" :data="sameSelect" disabled="true"></aty-select>
                </div>
                <div v-if="scope.row.bx[0] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="2" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '2')) && (scope.row.bx[1] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[1]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '2')) && (scope.row.bx[1] != '0')">
                  {{scope.row.bx[1]}}
                </div>
                <div v-if="scope.row.bx[1] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="3" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '3')) && (scope.row.bx[2] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[2]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '3')) && (scope.row.bx[2] != '0')">
                  {{scope.row.bx[2]}}
                </div>
                <div v-if="scope.row.bx[2] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="4" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '4')) && (scope.row.bx[3] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[3]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '4')) && (scope.row.bx[3] != '0')">
                  {{scope.row.bx[3]}}
                </div>
                <div v-if="scope.row.bx[3] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="5" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '5')) && (scope.row.bx[4] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[4]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '5')) && (scope.row.bx[4] != '0')">
                  {{scope.row.bx[4]}}
                </div>
                <div v-if="scope.row.bx[4] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="6" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '6')) && (scope.row.bx[5] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[5]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '6')) && (scope.row.bx[5] != '0')">
                  {{scope.row.bx[5]}}
                </div>
                <div v-if="scope.row.bx[5] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="7" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '7')) && (scope.row.bx[6] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[6]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '7')) && (scope.row.bx[6] != '0')">
                  {{scope.row.bx[6]}}
                </div>
                <div v-if="scope.row.bx[6] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="8" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '8')) && (scope.row.bx[7] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[7]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '8')) && (scope.row.bx[7] != '0')">
                  {{scope.row.bx[7]}}
                </div>
                <div v-if="scope.row.bx[7] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="9" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '9')) && (scope.row.bx[8] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[8]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '9')) && (scope.row.bx[8] != '0')">
                  {{scope.row.bx[8]}}
                </div>
                <div v-if="scope.row.bx[8] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="10" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '10')) && (scope.row.bx[9] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[9]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '10')) && (scope.row.bx[9] != '0')">
                  {{scope.row.bx[9]}}
                </div>
                <div v-if="scope.row.bx[9] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="11" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '11')) && (scope.row.bx[10] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[10]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '11')) && (scope.row.bx[10] != '0')">
                  {{scope.row.bx[10]}}
                </div>
                <div v-if="scope.row.bx[10] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="12" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '12')) && (scope.row.bx[11] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[11]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '12')) && (scope.row.bx[11] != '0')">
                  {{scope.row.bx[11]}}
                </div>
                <div v-if="scope.row.bx[11] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="13" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '13')) && (scope.row.bx[12] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[12]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '13')) && (scope.row.bx[12] != '0')">
                  {{scope.row.bx[12]}}
                </div>
                <div v-if="scope.row.bx[12] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="14" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '14')) && (scope.row.bx[13] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[13]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '14')) && (scope.row.bx[13] != '0')">
                  {{scope.row.bx[13]}}
                </div>
                <div v-if="scope.row.bx[13] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="15" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '15')) && (scope.row.bx[14] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[14]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '15')) && (scope.row.bx[14] != '0')">
                  {{scope.row.bx[14]}}
                </div>
                <div v-if="scope.row.bx[14] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="16" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '16')) && (scope.row.bx[15] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[15]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '16')) && (scope.row.bx[15] != '0')">
                  {{scope.row.bx[15]}}
                </div>
                <div v-if="scope.row.bx[15] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="17" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '17')) && (scope.row.bx[16] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[16]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '17')) && (scope.row.bx[16] != '0')">
                  {{scope.row.bx[16]}}
                </div>
                <div v-if="scope.row.bx[16] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="18" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '18')) && (scope.row.bx[17] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[17]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '18')) && (scope.row.bx[17] != '0')">
                  {{scope.row.bx[17]}}
                </div>
                <div v-if="scope.row.bx[17] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="19" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '19')) && (scope.row.bx[18] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[18]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '19')) && (scope.row.bx[18] != '0')">
                  {{scope.row.bx[18]}}
                </div>
                <div v-if="scope.row.bx[18] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="20" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '20')) && (scope.row.bx[19] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[19]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '20')) && (scope.row.bx[19] != '0')">
                  {{scope.row.bx[19]}}
                </div>
                <div v-if="scope.row.bx[19] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="21" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '21')) && (scope.row.bx[20] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[20]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '21')) && (scope.row.bx[20] != '0')">
                  {{scope.row.bx[20]}}
                </div>
                <div v-if="scope.row.bx[20] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="22" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '22')) && (scope.row.bx[21] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[21]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '22')) && (scope.row.bx[21] != '0')">
                  {{scope.row.bx[21]}}
                </div>
                <div v-if="scope.row.bx[21] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="23" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '23')) && (scope.row.bx[22] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[22]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '23')) && (scope.row.bx[22] != '0')">
                  {{scope.row.bx[22]}}
                </div>
                <div v-if="scope.row.bx[22] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="24" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '24')) && (scope.row.bx[23] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[23]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '24')) && (scope.row.bx[23] != '0')">
                  {{scope.row.bx[23]}}
                </div>
                <div v-if="scope.row.bx[23] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="25" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '25')) && (scope.row.bx[24] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[24]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '25')) && (scope.row.bx[24] != '0')">
                  {{scope.row.bx[24]}}
                </div>
                <div v-if="scope.row.bx[24] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="26" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '26')) && (scope.row.bx[25] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[25]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '26')) && (scope.row.bx[25] != '0')">
                  {{scope.row.bx[25]}}
                </div>
                <div v-if="scope.row.bx[25] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="27" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '27')) && (scope.row.bx[26] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[26]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '27')) && (scope.row.bx[26] != '0')">
                  {{scope.row.bx[26]}}
                </div>
                <div v-if="scope.row.bx[26] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column prop="type" width="34" label="28" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '28')) && (scope.row.bx[27] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[27]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '28')) && (scope.row.bx[27] != '0')">
                  {{scope.row.bx[27]}}
                </div>
                <div v-if="scope.row.bx[27] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column v-if="pickMonthTotalDay >= 29" prop="type" width="34" label="29" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '29')) && (scope.row.bx[28] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[28]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '29')) && (scope.row.bx[28] != '0')">
                  {{scope.row.bx[28]}}
                </div>
                <div v-if="scope.row.bx[28] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column v-if="pickMonthTotalDay >= 30" prop="type" width="34" label="30" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '30')) && (scope.row.bx[29] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[29]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '30')) && (scope.row.bx[29] != '0')">
                  {{scope.row.bx[29]}}
                </div>
                <div v-if="scope.row.bx[29] == '0'"></div>
              </template>
            </aty-table-column>
            <aty-table-column v-if="pickMonthTotalDay == 31" prop="type" width="34" label="31" :showOverflowTooltip="false">
              <template slot-scope="scope">
                <div v-if="((mydEdit == 'less') || (mydEdit == 'same' && currentDay >= '31')) && (scope.row.bx[30] != '0')">
                  <aty-select class="search_option_input_drw" v-model="scope.row.bx[30]" :data="sameSelect"></aty-select>
                </div>
                <div v-if="((mydEdit == 'more') || (mydEdit == 'same' && currentDay < '31')) && (scope.row.bx[30] != '0')">
                  {{scope.row.bx[30]}}
                </div>
                <div v-if="scope.row.bx[30] == '0'"></div>
              </template>
            </aty-table-column>
          </aty-table-column>
        </aty-table>
        <!-- table區域 end -->
        <div class="drw_notice">
          <aty-icon type="android-alert"></aty-icon>
          <span>一：一般</span>
          <span>良：良好</span>
          <span>优：优秀</span>
          <span>突：突出</span>
          <span>缺：缺勤</span>
          <span>无：当日不劳动</span>
        </div>
        <div class="drw_save_butn">
          <aty-button @click="saveButn()" class="search_option_butn1" type="primary">
            <i>
              <img src="../../assets/images/save.png">
            </i>
            <span>保存</span>
          </aty-button>
        </div>
      </div>
      </happy-scroll>
      <loading :isLoading="isLoading"></loading>
    </div>
</template>

<script>
import loading from '../base/loading'
export default {
  components: {
      loading:loading
  },
  data: function() {
    return {
      breadcrumbdata:[
          {
          name:'日记载'
          },
          {
          name:'无劳动定额罪犯日记载',
          href:'/dayRecord/dayRecordWork'
          }
      ],
      selectData: ["优", "良", "中"],
      // table数据
      tableData: [],
      // 是否可以编辑
      isEdit: false,
      narr: [],
      sameSelect: [
        {
          name: "一",
          code: "1"
        },
        {
          name: "良",
          code: "2"
        },
        {
          name: "优",
          code: "3"
        },
        {
          name: "突",
          code: "4"
        },
        {
          name: "缺",
          code: "5"
        },
        {
          name: "无",
          code: "-1"
        }
      ],
      // 根据年月和月公示 判断是否可以编辑标识
      mydEdit: "less",
      // 当前日
      currentDay: "1",
      // 查询条件 月份
      ssny: '',
      // 选择的月份一共有多少天
      pickMonthTotalDay: 0,
      // 查询条件
      zfbhHxm: "",
      gz: "",
      szxz: "",
      options1: {
        disabledDate: function(date) {
          return date && date.valueOf() > Date.now();
        }
      },
      lbssny: this.dateFormat(new Date()),
      isLoading:false,
      url:_zfxxDetail.url,
    };
  },
  watch: {},
  created() {
    //每次打开页面时需要生成的无劳动定额罪犯日记载记录
    this.generateWlddeRjz();
  },
  mounted() {
    // 初始调取 判断日期是否可以编辑方法
    this.dateEdit();
    // 获取当前日
    this.currentDay = new Date().getDate();
    // 查询条件设置为当前月
    this.ssny = this.dateFormat(new Date());
    // 获取当前月一共有多少天
    this.getMonthLength(this.ssny);
  },
  methods: {
    // 格式化 当前年月
    dateFormat(date,type) {
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      // var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      var currentdate = date.getFullYear() + seperator1 + month;
      if(type == "generate"){
        currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
      }
      return currentdate;
    },
    // 判断日期是否可以编辑
    dateEdit() {
      // 后台取得的是否可以编辑标识
      var backIsEdit = true;
      // 后台取得的年月
      var backYearMonth = "2018-07";
      // 当前的年月
      var currentYaerMonth = this.dateFormat(new Date());
      if (!backIsEdit || backYearMonth > currentYaerMonth) {
        this.mydEdit = "more"; // 过了月公示 或 选择的年月大于当前年月 都是不可编辑的
      } else if (backIsEdit && backYearMonth == currentYaerMonth) {
        this.mydEdit = "same"; // 没过月公示 且 选择的年月等于当前年月 再判断日期
      } else if (backIsEdit && backYearMonth < currentYaerMonth) {
        this.mydEdit = "less"; // 没过月公示 且 选择的年月小于当前年月 都可编辑
      }
    },
    // 判断是否有 28 29 30 31
    getMonthLength(date) {
      let d = new Date(date);
      // 将日期设置为下月一号
      d.setMonth(d.getMonth() + 1);
      d.setDate("1");
      // 获取本月最后一天
      d.setDate(d.getDate() - 1);
      this.pickMonthTotalDay = d.getDate();
    },
    generateWlddeRjz() {
      this.ssny = this.dateFormat(new Date());
      let params = {
        ssny: this.ssny,
      };
      this.isLoading=true
      this.postRequest("/api/v1/wldderjz/generateWlddeZfRjz", params).then(
        resp => {
          if(resp && resp.status == 200) {
            this.initDataList();
          } else {
            this.isLoading=false
            Artery.message.info({
              content:'获取无劳动定额日记载列表出错！',
              duration:3
            });
          }
        }
      );
    },
    //初始化数据列表
    initDataList() {
      var ny = this.ssny;
      if(this.ssny && this.ssny instanceof Date){
        ny = this.dateFormat(this.ssny);
      }
      let params = {
        ssny: ny
      };
      this.postRequest("/api/v1/wldderjz/getWldderjzList", params).then(
        resp => {
          if (resp && resp.status == 200) {
            this.tableData = resp.data;
            this.isLoading=false
          } else {
            this.isLoading=false
            Artery.message.info({
              content:'获取无劳动定额日记载列表出错！',
              duration:3
            });
          }
        }
      );
    },
    // 保存按钮
    saveButn() {
      let params = this.tableData;
      this.postRequest("/api/v1/wldderjz/saveWldderjz", params).then(resp => {
        if (resp && resp.status == 200) {
          Artery.message.info("保存成功！");
        } else {
          Artery.message.error({
               content:'保存失败！',
               duration:3
          });
        }
      });
    },
    // 查询按钮
    searchButn() {
      if (this.ssny && this.ssny == null) {
        Artary.message.console.error({
            content:'请选择年月再进行查询！',
            duration:3
        });
        return;
      }
      let params = {
        zfbhHxm: this.zfbhHxm,
        szxz: this.szxz,
        gz: this.gz,
        ssny: this.ssny
      };
      this.postRequest("/api/v1/wldderjz/getWldderjzList", params).then(
        resp => {
          if (resp && resp.status == 200) {
            this.lbssny = this.ssny;
            this.getMonthLength(this.ssny);
            this.tableData = resp.data;
          } else {
            Artery.message.info({
                  content:'获取无劳动定额日记载列表出错！',
                  duration:3
            });
          }
        }
      );
    },
    // 重置按钮
    reSetSearchOption() {
      this.zfbhHxm = "";
      this.szxz = "";
      this.gz = "";
      this.ssny = this.dateFormat(new Date());
      this.lbssny = this.dateFormat(new Date());
      this.searchButn();
    }
  }
};
</script>
<style scoped>
.aty-table .cell.aty-tooltip {
  min-width: auto;
}
.search_option_box .aty-input {
  height: 34px;
}
.search_option_box .search_option_text {
  display: inline-block;
  width: 21%;
  text-align: right;
}
.search_option_box .search_option_text_long {
  display: inline-block;
  text-align: center;
  width: 32%;
}
.search_option_box .search_option_text_long + .search_option_input {
  width: 60%;
}
.search_option_box .aty-date-picker {
  width: 77%;
}
.search_option_input {
  width: 77%;
}
.search_option_marginb {
  margin-bottom: 21px;
  padding-left: 20px;
}
/* .search_option_butn1 i{
    display: block;
    width: 16px;
    height: 16px;
    background: url(../../assets/images/w-jpg3.png) no-repeat;
    float: left;
}
.search_option_butn2 i{
    display: block;
    width: 21px;
    height: 15px;
    background: url(../../assets/images/w-jpg4.png) no-repeat;
    float: left;
    margin-top: 1px;
} */
.search_option_butn_text {
  float: left;
  margin-left: 7px;
}
.search_option_butn1 {
  width: 86px;
  height: 32px;
  line-height: 32px;
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: #188aff;
  border-color: #188aff;
  font-size: 14px;
}
.search_option_butn1 img {
  margin-top: -3px;
}
.search_option_butn2 {
  width: 86px;
  height: 32px;
  line-height: 32px;
  padding-top: 0px;
  padding-bottom: 0px;
  background-color: #f9fafc;
  border-color: #188aff;
  margin-left: 11px;
  color: #188aff;
  font-size: 14px;
}
.search_option_butn2 img {
  margin-top: -3px;
}
.search_option_textr {
  text-align: right;
}
.fd-btns-center.search_option_textr {
  text-align: center;
}
.table_butn {
  margin: 0 4px;
  cursor: pointer;
}
.es_table_input {
  width: 35px;
  height: 23px;
  border: 1px solid #c3ccd4;
  border-radius: 3px;
}
.drw_notice {
  margin-top: 10px;
}
.drw_notice i {
  font-size: 14px;
  color: #fc552e;
}
.drw_notice span {
  color: #fc552e;
  font-size: 12px;
  margin-right: 10px;
}
.drw_save_butn {
  text-align: center;
  margin-top: 10px;
}
.fd-day-record{
  height: auto;
}
  .p_main_box{
    width: 99.9%;
    padding: 20px;
  }
</style>

