/* 按钮-混入 */
import {
  NWbaseMinxin,
} from './NWbaseMinxin.js'
import {
  NWvantMixin,
} from './NWvantMixin.js'
import {
  NWmyJsSdkMixin,
} from './NWmyJsSdkMixin.js'
import {
  NWaUiMinxin,
} from './NWaUiMinxin.js'
import {
  NWbpmsMinxin,
} from './NWbpmsMinxin.js'
import {
  NW_templateMixin,
} from './NW_templateMixin.js'
export const NWtabMinxin = {
  mixins: [NWbaseMinxin, NWvantMixin, NWmyJsSdkMixin, NWaUiMinxin, NWbpmsMinxin, NW_templateMixin], //混入公共类
  data() {
    return {
      tabPageData: '',
      tabScreenWidth: document.body.clientWidth, // 屏幕宽
      tabScreeHeight: document.body.clientHeight, //屏幕高度
      tabZzcStatu: false, //遮罩层状态-同时-是否允许底层滑动
    }
  },
  mounted() {
    this.tabPageData = this.$tabPageData(); //接受页面参数
  },
  methods: {
    /* 自定义网络请求*/
    $myAjax: function(obj) {
      let {
        apiName = '',
          data = '',
          url = '',
          method = '',
          headers = {},
      } = obj;
      var $apiConfItme = apiName ? this.$apiConfigMsg[apiName] : '';
      if (!method) {
        if (!$apiConfItme) {
          this.$textCatch('apiName 不存在');
          return new Promise((reslove, reject) => {
            reject({
              msg: 'apiName 不存在',
              code: 403,
            });
          })
        };
      };
      return new Promise((reslove, reject) => {
        this.$api[method || $apiConfItme.method](url || $apiConfItme.url, data || $apiConfItme.data, headers).then(
          (ret) => {
            reslove(ret)
          }).catch((err) => {
          reject(err)
        });
      });
    },

    /*************************************页面内***********************************/
    //直接返回当前页的上一页，数据全部消息，是个新页面
    $nwBack(nub, dhType) {
      /* 判断当前使用的是生产与移动的工程模板-页面跳转-就做特殊处理*/
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$tabBack(nub, dhType);
      } else {
        this.$router.go(nub);
      }
    },
    $tabBack: function(nub, dhType) {
      var keepNameArr = this.$store.getters.pageUrlObj.keepNameArr;
      var keepLeg = this.$store.getters.pageUrlObj.keepNameArr.length;
      this.$store.commit('setPageDataObj', {
        pageSlide: dhType || 'slide-right', //默认后退
      });
      var val = this.$baseIsTypeof(nub); //判断类型number、string、boolean、undefined、null、arr，obj、function
      var pageNub = -1;
      if (val == 'number') {
        //返回上 nub 页
        pageNub = nub;
        var jdzIndex = Math.abs(nub);
        if (keepLeg - jdzIndex - 1 < 0) {
          this.$nwBackHome('');
          return
        } else {
          var winName = keepNameArr[keepLeg - jdzIndex - 1].name;
        }

      } else if (val == 'string') {
        /* keepNameArr */
        var winName = nub;
        var retObj = this.$baseArrExchange(keepNameArr, 'name', winName);
        pageNub = -(keepLeg - 1 - Number(retObj.index));
      } else {
        this.$nwBackHome('');
        return
      }
      this.$store.commit('setPageUrlObj', {
        funType: 'keepBack', //删除缓存页面
        pageNub: pageNub,
      });
      var obj = {
        name: winName,
        params: '$tabBack'
      };
      this.$router.push(obj);
      // this.$router.go(pageNub);
    },
    $nwBackHome: function(winName, dhType) {
      var homeName = window.NW_HOME_NAME; //项目入口的名称
      if (!homeName) {
        var routes = this.$router.options.routes;
        var retObj = this.$baseArrExchange(routes || [], 'path', '/');
        if (retObj.itme) { //目标页面是否存在
          if (retObj.itme.redirect) {
            // @str 目标字符串 @key 用什么去分割字符串
            var retArr = this.$baseStrSplit(retObj.itme.redirect, '/');
            homeName = retArr[1];
          }
        };
      }
      /* 判断当前使用的是生产与移动的工程模板-页面跳转-就做特殊处理*/
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$tabBackHome(homeName || 'root_tab', dhType);
      } else {
        var obj = {
          name: homeName || 'nw_demoPage', //项目入口的名称
          params: '$nwBackHome'
        };
        this.$router.push(obj);
      }
    },
    $tabBackHome: function(winName, dhType) {
      this.$store.commit('setPageUrlObj', {
        funType: 'keepBackArr', //删除缓存页面
        pageNub: 0,
        winName: winName || 'root_tab',
      });
      this.$store.commit('setPageDataObj', {
        pageSlide: 'slide-bottom', //默认前进
      });
      var obj = {
        name: winName || 'root_tab',
        params: '$tabBackHome'
      };
      this.$router.push(obj);
    },
    /* 路由跳转
    to:要去页面的name 或者path
    pageData:要传递的参数
    */
    $nwOpenWin: function(obj, pageData = {}) {
      if (window.NW_MODULE_TYPE == 'scyyd_templateUI') {
        this.$tabOpenWin(obj, pageData);
      } else {
        var retStr = this.$baseIsTypeof(obj);
        if (retStr == 'obj') {
          var {
            winName = '',
              pageData = {},
          } = obj;
        } else if (retStr == 'string') {
          var winName = obj;
        }
        var val = this.$baseIsTypeof(pageData); //判断类型number、string、boolean、undefined、null、arr，obj、function
        if (val == 'number' || val == 'boolean' || val == 'string' || val == 'arr') {
          pageData = {
            $default_dataVal: pageData, //默认值
            $default_dataMsg: '传的参数不是对象，方法自定义一个默认对象',
            $default_dataKeyStatus: true, //表示存在不带key 的参数
          };
        } else if (val == 'null' || val == 'function') {
          pageData = {}; //不传参数
        }
        var status = this.$baseIsIndexOf(winName, '/');
        if (status) {
          var routerObj = {
            path: winName,
            query: pageData
          };
        } else {
          var routerObj = {
            name: winName,
            params: pageData
          };
        }
        this.$router.push(routerObj);
      }
    },
    $tabOpenWin(obj, pageData = {}) {
      var retStr = this.$baseIsTypeof(obj);
      if (retStr == 'obj') {
        var {
          winName = '',
        } = obj;
      } else if (retStr == 'string') {
        var winName = obj;
      };
      /* 记录 */


      this.jcOpenWin(obj, pageData);
    },
    $tabSetkeepName: function(winName, moduleName) {
      this.$store.commit('setPageUrlObj', {
        moduleName: moduleName || this.$route.meta.moduleName,
        winName: winName || this.$route.name,
        type: 'push',
      });
    },
    /* 基础openWin*/
    jcOpenWin: function(obj, pageData = {}) {
      var retStr = this.$baseIsTypeof(obj);
      if (retStr == 'obj') {
        var {
          winName = '',
            pageData = {},
            dhType = pageData.dhType || 'slide-left',
        } = obj;
      } else if (retStr == 'string') {
        var winName = obj;
        var dhType = pageData.dhType || 'slide-left';
      }
      this.$store.commit('setPageDataObj', {
        pageSlide: dhType, //默认前进
      });
      this.$store.commit('setPageUrlObj', {
        funType: 'keepPush', //新增缓存页面
        winName: winName,
      });
      var val = this.$baseIsTypeof(pageData); //判断类型number、string、boolean、undefined、null、arr，obj、function
      if (val == 'number' || val == 'boolean' || val == 'string' || val == 'arr') {
        pageData = {
          $default_dataVal: pageData, //默认值
          $default_dataMsg: '传的参数不是对象，方法自定义一个默认对象',
          $default_dataKeyStatus: true, //表示存在不带key 的参数
        };
      } else if (val == 'null' || val == 'function') {
        pageData = {}; //不传参数
      }
      var status = this.$baseIsIndexOf(winName, '/');
      if (status) {
        var obj = {
          path: winName,
          query: pageData
        };
      } else {
        var obj = {
          name: winName,
          params: pageData
        };
      }
      this.$router.push(obj);
    },
    /*
    接受页面传递过来的参数
    */
    $tabPageData: function(obj) {
      var query = this.$route.query;
      var queryStatus = this.$baseIsEmptyObject(query); //判断是否是空对象

      var params = this.$route.params;
      var paramsStatus = this.$baseIsEmptyObject(params); //判断是否是空对象

      if (!paramsStatus) {
        return params;
      } else if (!queryStatus) {
        return query;
      } else {
        return obj || '';
      }
    },
    $tabClickInit: function() {
      $('body').on('touchstart', '[m="click"]', function(e) {
        var e = e || window.event;
        $(this).addClass('click-active');
      });
      $('body').on('touchmove', '[m="click"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('click-active')
      });
      $('body').on('touchend', '[m="click"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('click-active')
      });

      $('body').on('touchstart', '[m="btn"]', function(e) {
        var e = e || window.event;
        $(this).addClass('btn-active');
      });
      $('body').on('touchmove', '[m="btn"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('btn-active')
      });
      $('body').on('touchend', '[m="btn"]', function(e) {
        var e = e || window.event;
        $(this).removeClass('btn-active')
      });
    },
  },
  computed: {

  },
  //过滤
  filters: {
    //保留两位小数
    $tabSetNub2: function(value) {
      if (value) {
        var key = Math.pow(10, 2); //10的若干次方
        if (value < 0) {
          var newVal = Math.abs(value); //取绝对值
          return -Math.floor(newVal * key) / key;
        } else if (value == 0) {
          return 0
        } else if (value > 0) {
          return Math.floor(value * key) / key;
        }
      } else {
        return 0;
      };
    },
  },
  watch: {
    tabZzcStatu: function(va1, va2) {
      if (va1) {
        /* 禁止底层滑动*/
        document.getElementsByTagName('body')[0].style.height = '100%';
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        /* 允许底层滑动*/
        document.getElementsByTagName('body')[0].style.height = '';
        document.getElementsByTagName('body')[0].style.overflow = '';
      }
    }
  },
}
