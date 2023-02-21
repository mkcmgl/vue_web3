import Vue from 'vue'
import Router from "vue-router"
import Home from "../page/Home/index.vue"
Vue.use(Router)

const routes=[{
    path:'/detail',
    name:"detail",
    component:()=>import ("@/page/detail"),
     meta: { show: true },
},
    {
        path: "/home",
        component: Home,
        meta: { show: true },
    },
        {
        path: "*",
        redirect: "/home", //redirect  跳转到
    },
]
let router=new Router({
routes
})


export default router