import axios from 'axios';
import React, { Component } from "react";
import { Button, NavBar, Icon, Flex, WhiteSpace, Slider, WingBlank, SegmentedControl } from 'antd-mobile';
import moment from 'moment';
import style from "./index.css";

const CurtainMode = ['正常', '反转', '校准中']
//[0 - 正常；1 - 反转；2 - 校准中]
const CurtainOperation = ['关窗帘', '开窗帘', '暂停窗帘']
//[关窗帘=0,开窗帘=1,暂停窗帘=2]
const apigetway = 'http://192.168.24.141:7001/aliyunld/apigw.iot';

export default class Device extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hidden: false,
            CurtainMode: 0,
            CurtainPosition: 0,
            CurtainOperation: 0,
            tickTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        };
    }

    componentDidMount() {
        this.fetchDeviceInfo();
        this.interval = setInterval(this.tick.bind(this), 1000 * 5);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        this.fetchDeviceInfo();
    }

    log = (name) => {
        return (value) => {
            console.log(`${name}: ${value}`);
        };
    }

    handleCurtainPosition(d) {
        this.putDeviceState({
            CurtainPosition: d
        })
    }

    handleCurtainOperation(e) {

        this.setState({
            CurtainOperation: e.nativeEvent.selectedSegmentIndex
        });

        this.putDeviceState({
            CurtainOperation: e.nativeEvent.selectedSegmentIndex
        })
        console.log(e.nativeEvent.selectedSegmentIndex)
    }

    putDeviceState(opts) {

        const properties = {
            ...opts
        };

        this.setState({
            ...opts
        });

        axios.post(apigetway, {
            url: 'https://api.link.aliyun.com/thing/device/properties/set',
            apiVer: '1.1.0',
            params: {
                productKey: 'a1hQxz8Vcq3',
                deviceName: 'dychuanglianbrc1',
                properties
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    fetchDeviceByIdentifier(identifier) {
        return axios.post('http://192.168.24.141:7001/aliyunld/apigw.iot', {
            url: 'https://api.link.aliyun.com/thing/device/property/query',
            apiVer: '1.1.0',
            params: {
                productKey: 'a1hQxz8Vcq3',
                deviceName: 'dychuanglianbrc1',
                propertyIdentifier: identifier
            }
        })
    }

    fetchDeviceInfo() {
        const _this = this;
        axios.all([this.fetchDeviceByIdentifier('CurtainMode'), this.fetchDeviceByIdentifier('CurtainPosition'), this.fetchDeviceByIdentifier('CurtainOperation')])
            .then(axios.spread(function (mode, position, operation) {
                _this.setState({
                    CurtainMode: mode.data.data.value,
                    CurtainPosition: position.data.data.value,
                    CurtainOperation: operation.data.data.value,
                    tickTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                })
            }));
    }

    render() {
        const sliderMarks = {
            0: '0%',
            100: '100%',
        };

        const sliderMarks2 = {
            0: '关窗帘',
            1: '开窗帘',
            2: '暂停窗帘',
        };

        const ShowTime = ({ dt }) => {
            return (<span>{dt}</span>)
        }

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={
                        () => {
                            console.log('onLeftClick');
                            this.navigation.pop()
                        }
                    }
                    rightContent={[
                        <Icon key="1" type="ellipsis" />,
                    ]}
                >杜亚窗帘</NavBar>
                <div className="flex-container" style={{ overflow: 'hidden' }}>
                    <div style={{ backgroundColor: '#05c6b3', width: '100%', height: '175px', color: '#fff' }}>
                        <Flex justify="around" direction="column" align="center" style={{ height: '100%' }}>
                            <Flex.Item flex="1">
                                <p>窗帘工作模式</p>
                            </Flex.Item>
                            <Flex.Item flex="3">
                                <p>
                                    <strong style={{ fontSize: '28px' }}>
                                        {CurtainMode[this.state.CurtainMode]}
                                    </strong>
                                </p>
                            </Flex.Item>
                            <Flex.Item flex="1">
                                <ShowTime dt={this.state.tickTime}></ShowTime>
                            </Flex.Item>
                        </Flex>
                    </div>
                    <div style={{ width: '100%', height: 'auto', marginBottom: '30px' }}>
                        <WingBlank size="lg">
                            <div className="sub-title">
                                窗帘打开位置
                            </div>
                            <WhiteSpace size="lg" />
                            <WhiteSpace size="lg" />
                            <Slider
                                marks={sliderMarks}
                                style={{ marginLeft: 30, marginRight: 30 }}
                                defaultValue={this.state.CurtainPosition}
                                value={this.state.CurtainPosition}
                                min={0}
                                max={100}
                                step={10}
                                onChange={e => this.handleCurtainPosition(e)
                                }
                                onAfterChange={e => console.log('onAfterChange', e)
                                }
                            />
                        </WingBlank>
                    </div>
                    <WhiteSpace size="lg" />
                    <WingBlank size="lg">
                        <div>
                            <div className="sub-title">窗帘操作模式</div>
                            <SegmentedControl
                                onChange={e => {
                                    this.handleCurtainOperation(e)
                                }}
                                selectedIndex={this.state.CurtainOperation}
                                values={['关窗帘', '开窗帘', '暂停窗帘']} />
                        </div>
                    </WingBlank>
                </div>
                {/* <div style={{ wordWrap:"break-word"}}>
                data:{JSON.stringify(this.state)}
                </div> */}
            </div>
        );
    }
}