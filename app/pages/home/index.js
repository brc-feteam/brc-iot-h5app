import React, { Component } from "react";
import { TabBar, Button } from 'antd-mobile';

// 以CSS Modules方式引入Home页样式
import style from "./index.css";
// 引入图片
import LOGO from "./LOGO.png";
import MyNavbar from "../../components/layouts/navbar"

// 导出Home页组件
export default class Home extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     selectedTab: 'homeTab',
        //     hidden: false,
        //     fullScreen: false,
        // };
        this.onButtonPress = this.onButtonPress.bind(this);
    }

    render() {
        return (
            <MyNavbar selectedTab="myTab">
                <div style={{ height: '200px', textAlign: 'center' }}>
                    ...
                </div>
                <Button onClick={this.onButtonPress}>智能窗帘</Button>
            </MyNavbar>
        );
    }

    onButtonPress() {
        console.log('onButtonPress');
        this.navigation.push('/device');
    }
}