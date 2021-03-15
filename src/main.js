import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import Tag, {
  Button, Field, Form, Swipe, SwipeItem, Grid, GridItem, NavBar,
  Toast, List, Cell, CellGroup, Sticky, Tabbar, TabbarItem,
  Popup, Divider, Icon, Badge, Search, DropdownMenu,
  DropdownItem, NoticeBar, Tab, Tabs, Empty, Step, Steps, PullRefresh, DatetimePicker
} from 'vant'
import 'vant/lib/index.css'
import './request/api'
import EpDivider from '@/components/EpDivider'
import '@/assets/css/common.css'
import 'lib-flexible'
const app = createApp(App)
  .use(Button)
  .use(Field)
  .use(Form)
  .use(Swipe)
  .use(SwipeItem)
  .use(Grid)
  .use(GridItem)
  .use(NavBar)
  .use(Toast)
  .use(Cell)
  .use(CellGroup)
  .use(Sticky)
  .use(router)
  .use(List)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Popup)
  .use(Divider)
  .use(Icon)
  .use(Badge)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(NoticeBar)
  .use(Tab)
  .use(Tabs)
  .use(Tag)
  .use(Empty)
  .use(Step)
  .use(Steps)
  .use(PullRefresh)
  .use(DatetimePicker)
  .use(EpDivider)
// app.config.devtools = process.env.NODE_ENV === 'development'
// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
// app.config.devtools = process.env.NODE_ENV === 'development'
app.mount('#app')
// window.onresize = setHtmlFontSize
// function setHtmlFontSize () {
//   const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
//   const htmlDom = document.getElementsByTagName('html')[0]
//   htmlDom.style.fontSize = htmlWidth / 10 + 'px'
// }
// setHtmlFontSize()
