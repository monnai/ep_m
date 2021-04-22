import { createWebHashHistory, createRouter } from 'vue-router'

const history = createWebHashHistory()

const router = createRouter({
  history,
  routes: [
    {
      path: '/',
      component: () => import('page/login/Login')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('page/login/Login')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('page/login/LoginTest')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('page/index/Index')
    },
    // 纵向
    {
      path: '/zxProject',
      name: 'zxProject',
      component: () => import('page/zXProject/ZxProject')
    },
    {
      path: '/zxDetail',
      name: 'zxDetail',
      component: () => import('page/zXProject/ZxProjectDetail')
    },
    // 横向
    {
      path: '/yfContract',
      name: 'yfContract',
      component: () => import('page/yfContract/YfContract')
    },
    {
      path: '/yfDetail',
      name: 'yfDetail',
      component: () => import('page/yfContract/YfContractDetail')
    },
    // 校级
    {
      path: '/xjProject',
      name: 'xjProject',
      component: () => import('page/xJProject/XjProject')
    },
    {
      path: '/xjDetail',
      name: 'xjDetail',
      component: () => import('page/xJProject/XjProjectDetail')
    },
    // 论文
    {
      path: '/paper',
      name: 'paper',
      component: () => import('page/paper/Paper.vue')
    },
    {
      path: '/paperDetail',
      name: 'paperDetail',
      component: () => import('page/paper/PaperDetail')
    },
    // 专利
    {
      path: '/patent',
      name: 'patent',
      component: () => import('page/patent/Patent')
    },
    {
      path: '/patentDetail',
      name: 'patentDetail',
      component: () => import('page/patent/PatentDetail')
    },
    // 获奖
    {
      path: '/honor',
      name: 'honor',
      component: () => import('page/honor/Honor')
    },
    {
      path: '/honorDetail',
      name: 'honorDetail',
      component: () => import('page/honor/HonorDetail')
    },
    // 著作
    {
      path: '/book',
      name: 'book',
      component: () => import('page/book/Book')
    },
    {
      path: '/bookDetail',
      name: 'bookDetail',
      component: () => import('page/book/BookDetail')
    },
    // 著作权
    {
      path: '/copyRight',
      name: 'copyRight',
      component: () => import('page/copyRight/CopyRight')
    },
    {
      path: '/copyRightDetail',
      name: 'copyRightDetail',
      component: () => import('page/copyRight/CopyRightDetail')
    },
    // 研究报告
    {
      path: '/researchReport',
      name: 'researchReport',
      component: () => import('page/researchReport/ResearchReport')
    },
    {
      path: '/researchReportDetail',
      name: 'researchReportDetail',
      component: () => import('page/researchReport/ResearchReportDetail')
    },
    // 鉴定成果
    {
      path: '/jdProduct',
      name: 'jdProduct',
      component: () => import('page/jdProduct/JdProduct')
    },
    {
      path: '/jdProductDetail',
      name: 'jdProductDetail',
      component: () => import('page/jdProduct/JdProductDetail')
    },
    // 艺术作品
    {
      path: '/artProduct',
      name: 'artProduct',
      component: () => import('page/artProduct/ArtProduct')
    },
    {
      path: '/artProductDetail',
      name: 'artProductDetail',
      component: () => import('page/artProduct/ArtProductDetail')
    },
    // 标准
    {
      path: '/standard',
      name: 'standard',
      component: () => import('page/standard/Standard')
    },
    {
      path: '/standardDetail',
      name: 'standardDetail',
      component: () => import('page/standard/StandardDetail')
    },
    // 药证
    {
      path: '/medicine',
      name: 'medicine',
      component: () => import('page/medicine/Medicine')
    },
    {
      path: '/medicineDetail',
      name: 'medicineDetail',
      component: () => import('page/medicine/MedicineDetail')
    },
    // 新品种
    {
      path: '/breed',
      name: 'breed',
      component: () => import('page/breed/Breed')
    },
    {
      path: '/breedDetail',
      name: 'breedDetail',
      component: () => import('page/breed/BreedDetail')
    },
    // 主办会议
    {
      path: '/meeting',
      name: 'meeting',
      component: () => import('page/meeting/Meeting')
    },
    {
      path: '/meetingDetail',
      name: 'meetingDetail',
      component: () => import('page/meeting/MeetingDetail')
    },
    // 学术讲座
    {
      path: '/lecture',
      name: 'lecture',
      component: () => import('page/lecture/Lecture')
    },
    {
      path: '/lectureDetail',
      name: 'lectureDetail',
      component: () => import('page/lecture/LectureDetail')
    },
    // 参加会议
    {
      path: '/joinMeeting',
      name: 'joinMeeting',
      component: () => import('page/joinMeeting/JoinMeeting')
    },
    {
      path: '/joinMeetingDetail',
      name: 'joinMeetingDetail',
      component: () => import('page/joinMeeting/JoinMeetingDetail')
    },
    // 用章申请
    {
      path: '/chapter',
      name: 'chapter',
      component: () => import('page/chapter/Chapter')
    },
    {
      path: '/chapterDetail',
      name: 'chapterDetail',
      component: () => import('page/chapter/ChapterDetail')
    },
    // 论文投稿
    {
      path: '/paperSubmission',
      name: 'paperSubmission',
      component: () => import('page/paperSubmission/PaperSubmission')
    },
    {
      path: '/paperSubmissionDetail',
      name: 'paperSubmissionDetail',
      component: () => import('page/paperSubmission/PaperSubmissionDetail')
    },
    // 经费认领
    {
      path: '/cWIncomeClaim',
      name: 'cWIncomeClaim',
      component: () => import('page/cWIncomeClaim/CWIncomeClaim')
    },
    // 项目入账
    {
      path: '/projectIncome',
      name: 'projectIncome',
      component: () => import('page/projectIncome/ProjectIncome')
    },
    {
      path: '/projectIncomeDetail',
      name: 'projectIncomeDetail',
      component: () => import('page/projectIncome/ProjectIncomeDetail')
    },
    {
      path: '/mine',
      name: 'mine',
      component: () => import('page/mine/Mine')
    }
  ]
})

// router跳转之前做登录拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // if (sessionStorage.username) {
    //   next()
    // } else {
    //   next({ path: '/login' })
    // }
    next()
  }
})

export default router
