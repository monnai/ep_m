import { createApp } from 'vue'
import App from './App.vue'
import router from './route'
import {
  Button, Field, Form, Swipe, SwipeItem,
  Grid, GridItem, NavBar, Toast, List, Cell, CellGroup,
  Sticky, Tabbar, TabbarItem
} from 'vant'
import 'vant/lib/index.css'

createApp(App)
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
  .mount('#app')
