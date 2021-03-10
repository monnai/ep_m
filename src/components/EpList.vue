<template>
  <div class="ep-list-wrapper">
    <ul>
      <template v-for="(item,index) in data" :key="item.id">
        <van-list>
          <div>
            <van-cell-group>
              <van-cell is-link to="/zxDetail">
                <template #title>
                  <div class="ep-list-wrapper">
                    <div>南开大学</div>
                    <div>Acat Biochimica et Biophysica</div>
                    <div>张三</div>
                    <div>电影学,2020/08/17,学校通过</div>
                  </div>
                </template>
                <template #icon>
                  <div>{{index}}</div>
                </template>
                <template #right-icon>
                  <div>待审核 ></div>
                </template>
              </van-cell>
            </van-cell-group>
          </div>
        </van-list>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  setup () {
    const data = [{
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 1,
      name: 'a'
    }, {
      id: 2,
      name: 'b'
    }]
    return {
      data
    }
  }
}
</script>

<style>
.ep-list-wrapper {
  text-align: left;
}
</style>
