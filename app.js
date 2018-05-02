import { createApp } from "@bone/web";
// 引入各个页面组件
import Home from "./app/pages/home";
import NotFound from "./app/pages/not-found";
import Device from './app/pages/device';
import 'antd-mobile/dist/antd-mobile.css';

import MyLayout from './app/layouts/base'

// 创建App实例
export default createApp({
    // 设置应用ID
    appName: "a120Z3dlEzIW8YwC",
    // layout: MyLayout,
    // 配置路由信息
    router: {
        routes: [{
            path: "/",
            page: Home
        }, {
            path: '/device',
            page: Device
        }],
        // routes中路由无法匹配时显示的404页面
        notFound: NotFound
    }
})