<template>
  <div class="ep-detail-panel-wrapper">
    <van-tab title="标签 1">
      <ul>
        <template v-for="item in data" :key="item.name">
          <li>
            <div>
            <span>
            <img src="xx"/>
            </span>
              <span>
                <div>
                  张三
                </div>
              <div>教师</div>
              </span>
            </div>
          </li>
        </template>
      </ul>
    </van-tab>
  </div>
</template>

<script>
export default {
  setup () {
    const data = [
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      },
      {
        name: '张三',
        code: '001',
        job: '教师',
        level: '负责人',
        type: '电影学'
      }

    ]
    return { data }
  }
}
</script>

<style>

</style>
