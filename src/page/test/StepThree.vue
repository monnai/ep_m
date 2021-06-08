<template>
  <!--经费卡列表-->
  <div class="fund-card-wrap">
    <div class="fund-card" v-for="card in state.cardsData" :key="card.personName">
      <div class="fund-card-title">
            <span>
              <van-image round
                         width="30"
                         height="30"
                         :src="require('../../../public/static/image/claim/icon_avatar.png')"/>
            </span>
        <span>
              {{card.personName}}
            </span>
        <span>
              {{card.orgName}}
            </span>
        <span>卡号： 通过后自动生成</span>
      </div>
      <div class="fund-card-content">
<!--        <van-row>-->
<!--          <van-col span="6"-->
<!--                   v-for="fee in card.fees" :key="fee.name">-->
<!--                  <span>-->
<!--                    <div class="fee"><span>{{fee.money}}</span> <span>万元</span></div>-->
<!--                    <div class="fee-type">{{fee.name}}</div>-->
<!--                  </span>-->
<!--          </van-col>-->
<!--        </van-row>-->
      </div>
    </div>
  </div>
  <van-popup
    v-model:show="state.addPanelShow"
    closeable
    position="bottom"
    :style="{ height: '70%' }"
  >
    <van-form @submit="onSubmit">
      <van-field
        v-model="state.addData.personName"
        name="经费卡负责人"
        label="经费卡负责人"
        placeholder="请选择"
      />
      <van-field
        v-model="state.addData.orgName"
        name="所属单位"
        label="所属单位"
        placeholder=""
      />
      <van-field
        name="经费卡号"
        label="经费卡号"
        placeholder=""
      />
      <van-field
        v-model="state.password"
        name="留校金额"
        label="留校金额"
        placeholder=""
      />
      <van-field
        v-model="state.password"
        name="留校直接金额"
        label="留校直接金额"
        placeholder=""
      />
      <van-field
        v-model="state.password"
        name="留校间接金额"
        label="留校间接金额"
        placeholder=""
      />
      <van-field
        v-model="state.password"
        name="外拨金额"
        label="外拨金额"
        placeholder=""
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </van-popup>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup () {
    // step1选混合时，多出留校直接和留校间接
    const state = reactive({
      cardsData: [{
        personName: '李晓明',
        orgName: '经济与管理学院',
        fees: {
          // 留校金额
          splitFeeChargerLiuxiao: { name: '留校金额', money: '12' },
          // 留校直接
          splitFeeChargerDirectFee: { name: '留校直接', money: '2' },
          // 留校间接
          splitFeeChargerIndirectFee: { name: '留校间接', money: '5' },
          // 外拨
          splitFeeChargerWaibo: { name: '外拨', money: '15' }
        }
      }, {
        personName: '王芳',
        orgName: '教育学院',
        fees: {
          // 留校金额
          splitFeeChargerLiuxiao: { name: '留校金额', money: '12' },
          // 留校直接
          splitFeeChargerDirectFee: { name: '留校直接', money: '2' },
          // 留校间接
          splitFeeChargerIndirectFee: { name: '留校间接', money: '5' },
          // 外拨
          splitFeeChargerWaibo: { name: '外拨', money: '15' }
        }
      }],
      addData: {
        personName: '',
        orgName: '',
        fees: {
          // 留校金额
          splitFeeChargerLiuxiao: { name: '留校金额', money: '' },
          // 留校直接
          splitFeeChargerDirectFee: { name: '留校直接', money: '' },
          // 留校间接
          splitFeeChargerIndirectFee: { name: '留校间接', money: '' },
          // 外拨
          splitFeeChargerWaibo: { name: '外拨', money: '' }
        }
      },
      addPanelShow: false
    })
    const getValue = () => {
      return state
    }
    return {
      state,
      getValue
    }
  }
}
</script>

<style scoped>
.fund-card-wrap{
  /*margin: 6px 10px 6px 10px;*/
}
.van-row > div:not(:last-child) {
  border-right: unset;
}
.fund-card{
  margin: 6px 10px 6px 10px;
  background: #FFFFFF;
}
.fund-card- {
  border-bottom: 1px solid #d1d1d1;
  padding: 8px 0 8px 0;
  text-align: left;
  text-indent: 7px;
}
.fund-card-title {
  text-align: left;
  text-indent: 2px;
}
.fund-card-title > span {
  vertical-align: middle;
  margin-right: 12px;
}
.fund-card-title > span:nth-child(2) {
  color: #333333;
  font-size: 16px;
  font-weight: bold;
}
.fund-card-title > span:nth-child(3) {
  color: #333333;
  font-size: 12px;
  font-weight: bold;
}
.fund-card-title > span:nth-child(4) {
  color: #A6A6A6;
  font-size: 12px;
  font-weight: lighter;
}
.add-card-button{
  width: 100%;
  position: fixed;
  bottom: 45px;
  left: 0;
}
.add-card-button > button {
  display: block;
  width: 100%;
  color: #319AF2;
  font-weight: bold;
  font-size: 15px;
}

::v-deep(.van-row) {
  color: #767676;
  font-weight: bold;
  line-height: 31px;
  background: white;
  border-bottom: 1px solid #e7e7e7;
}

.fee {
}

.fee > span:nth-child(1) {
  color: #319AF2;
  font-size: 24px;
  font-weight: bold;
}

.fee > span:nth-child(2) {
  color: #A9A9A9;
  font-size: 12px;
  font-weight: lighter;
}
.fee-type {
  color: #A9A9A9;
  font-size: 12px;
  font-weight: lighter;
}
</style>
