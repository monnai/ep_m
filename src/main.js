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
  Popover,
  Divider,
  Icon,
  Badge,
  Search,
  DropdownMenu,
  DropdownItem,
  NoticeBar,
  Tab,
  Tabs,
  Tag,
  Empty,
  Step,
  Steps,
  PullRefresh,
  DatetimePicker,
  Checkbox,
  CheckboxGroup,
  IndexBar,
  IndexAnchor,
  ContactCard
} from 'vant'
import 'vant/lib/index.css'
import './request/api'
import EpDivider from '@/components/EpDivider'
import '@/assets/css/common.css'
import 'lib-flexible'
import '@vant/touch-emulator'
import '@/common/css/common.css'
import EpSvgIcon from '@/components/EpSvgIcon'
import '../public/static/config/serverConfig.json'
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
  .use(Popover)
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
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(IndexBar)
  .use(IndexAnchor)
  .use(ContactCard)
  .use(EpDivider)
  .use(EpSvgIcon)
// 让icons/svg下面的图片自动导入
const req = require.context('@/assets/img/icons', false, /\.svg$/)
req.keys().map(req)
app.mount('#app')
