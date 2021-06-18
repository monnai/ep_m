window.g = {
  devServer: '/api',
  debugServer: 'localhost:8081',
  prodServer: 'http://epmobilet.ngrok2.xiaomiqiu.cn/RDSYSEDUV8-8.5.0',
  // prodServer: 'http://172.16.2.143:8085/RDSYSEDUV83010443-8.3.0.1/mobileTerminal',
  menu: [
    {
      name: 'zXProject',
      title: '纵向项目',
      icon: 'static/image/index/icon_zx_project.png',
      router: ['/zxProject', '/zxDetail'],
      apiPrefix: 'zxproject'
    },
    {
      name: 'yfContract',
      title: '横向项目',
      icon: 'static/image/index/icon_hx_project.png',
      router: ['/yfContract', '/yfDetail'],
      apiPrefix: 'yfcontract'
    },
    {
      name: 'xJProject',
      title: '校级项目',
      icon: 'static/image/index/icon_xj_project.png',
      router: ['/xjProject', '/xjDetail'],
      apiPrefix: 'xjproject'
    },
    {
      name: 'paper',
      title: '论文',
      icon: 'static/image/index/icon_paper.png',
      router: ['/paper', '/paperDetail'],
      apiPrefix: 'paper'
    },
    {
      name: 'patent',
      title: '专利',
      icon: 'static/image/index/icon_patent.png',
      router: ['/patent', '/patentDetail'],
      apiPrefix: 'patent'
    },
    {
      name: 'honor',
      title: '获奖',
      icon: 'static/image/index/icon_award.png',
      router: ['/honor', '/honorDetail'],
      apiPrefix: 'honor'
    },
    {
      name: 'book',
      title: '著作',
      icon: 'static/image/index/icon_book.png',
      router: ['/book', '/bookDetail'],
      apiPrefix: 'book'
    },
    {
      name: 'copyRight',
      title: '著作权',
      icon: 'static/image/index/icon_copyright.png',
      router: ['/copyRight', '/copyRightDetail'],
      apiPrefix: 'copyright'
    },
    {
      name: 'researchReport',
      title: '研究报告',
      icon: 'static/image/index/icon_research_report.png',
      router: ['/researchReport', '/researchReportDetail'],
      apiPrefix: 'researchreport'
    },
    {
      name: 'jdProduct',
      title: '鉴定成果',
      icon: 'static/image/index/icon_jd_product.png',
      router: ['/jdProduct', '/jdProductDetail'],
      apiPrefix: 'jdproduct'
    },
    {
      name: 'artProduct',
      title: '艺术作品',
      icon: 'static/image/index/icon_art_product.png',
      router: ['/artProduct', '/artProductDetail'],
      apiPrefix: 'artproduct'
    },
    {
      name: 'standard',
      title: '标准',
      icon: 'static/image/index/icon_standard.png',
      router: ['/standard', '/standardDetail'],
      apiPrefix: 'standard'
    },
    {
      name: 'medicine',
      title: '药证',
      icon: 'static/image/index/icon_medicine.png',
      router: ['/medicine', '/medicineDetail'],
      apiPrefix: 'medicine'
    },
    {
      name: 'breed',
      title: '新品种',
      icon: 'static/image/index/icon_breed.png',
      router: ['/breed', '/breedDetail'],
      apiPrefix: 'breed'
    },
    {
      name: 'meeting',
      title: '主办会议',
      icon: 'static/image/index/icon_meeting.png',
      router: ['/meeting', '/meetingDetail'],
      apiPrefix: 'meeting'
    },
    {
      name: 'lecture',
      title: '学术讲座',
      icon: 'static/image/index/icon_lecture.png',
      router: ['/lecture', '/lectureDetail'],
      apiPrefix: 'lecture'
    },
    {
      name: 'joinMeeting',
      title: '参加会议',
      icon: 'static/image/index/icon_join_meeting.png',
      router: ['/joinMeeting', '/joinMeetingDetail'],
      apiPrefix: 'join-meeting'
    },
    {
      name: 'chapter',
      title: '用章申请',
      icon: 'static/image/index/icon_chapter.png',
      router: ['/chapter', '/chapterDetail'],
      apiPrefix: 'in-chapter'
    }
    // {
    //   name: 'testClaim',
    //   title: '经费认领',
    //   icon: 'static/image/index/icon_fund_claim.png',
    //   router: ['/testClaim', '/testClaim']
    // }
  ]
}
