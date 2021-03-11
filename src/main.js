import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import {
  Button,
  Field,
  Form,
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  NavBar,
  Toast,
  List,
  Cell,
  CellGroup,
  Sticky,
  Tabbar,
  TabbarItem,
  Popup,
  Divider,
  Icon,
  Badge,
  Search,
  DropdownMenu,
  DropdownItem, NoticeBar, Tab, Tabs, Empty, Step, Steps
} from 'vant'
import 'vant/lib/index.css'
import './request/api'
import EpDivider from '@/components/EpDivider'
import '@/assets/css/common.css'
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
  .use(Empty)
  .use(Step)
  .use(Steps)
  .use(EpDivider)
app.config.devtools = process.env.NODE_ENV === 'development'
window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor
app.config.devtools = process.env.NODE_ENV === 'development'
app.mount('#app')
