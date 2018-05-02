import React from 'react'
import { TabBar } from 'antd-mobile';

const tabbarProps = {
    unselectedTintColor: "#949494",
    tintColor: "#33A3F4",
    barTintColor: "white",
}

const warpProps = { position: 'fixed', height: '100%', width: '100%', top: 0 }

const navbar = ({ ...myProps }) => {

    const { children } = myProps;

    return (
        <div style={{ ...warpProps }}>
            <TabBar {...tabbarProps}>
                <TabBar.Item
                    title="首页"
                    key="hometab"
                    icon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(/assets/imgs/home.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                    }
                    selectedIcon={<div style={{
                        width: '22px',
                        height: '22px',
                        background: 'url(/assets/imgs/home-on.svg) center center /  21px 21px no-repeat'
                    }}
                    />
                    }
                    selected={myProps.selectedTab === 'homeTab'}
                    badge={1}
                    onPress={() => {
                        //redirect to another page
                    }}
                    data-seed="logId">
                    {
                        myProps.selectedTab === 'homeTab' ? children : ''
                    }
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(/assets/imgs/shop.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(/assets/imgs/shop-on.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                    }
                    title="商城"
                    key="shopTab"
                    badge={'new'}
                    selected={myProps.selectedTab === 'shopTab'}
                    onPress={() => {
                        //redirect to another page
                    }}
                    data-seed="logId1">
                    {
                        myProps.selectedTab === 'shopTab' ? children : ''
                    }
                </TabBar.Item>
                <TabBar.Item
                    icon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(/assets/imgs/friend.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                    }
                    selectedIcon={
                        <div style={{
                            width: '22px',
                            height: '22px',
                            background: 'url(/assets/imgs/friend-on.svg) center center /  21px 21px no-repeat'
                        }}
                        />
                    }
                    title="朋友圈"
                    key="friendTab"
                    dot
                    selected={myProps.selectedTab === 'friendTab'}
                    onPress={() => {
                        //redirect to another page
                    }}>
                    {
                        myProps.selectedTab === 'friendTab' ? children : ''
                    }
                </TabBar.Item>
                <TabBar.Item
                    icon={{ uri: '/assets/imgs/my.svg' }}
                    selectedIcon={{ uri: '/assets/imgs/my-on.svg' }}
                    title="我的"
                    key="myTab"
                    selected={myProps.selectedTab === 'myTab'}
                    onPress={() => {
                        //redirect to another page
                    }}>
                    {
                        myProps.selectedTab === 'myTab' ? children : ''
                    }
                </TabBar.Item>
            </TabBar>
        </div>
    )
};

export default navbar;