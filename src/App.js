import { Statistic, Progress, Row, Col } from "antd";
import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { CiCircleFilled } from "@ant-design/icons/";

export default class App extends React.Component {
  timer;

  constructor(props) {
    super(props);
    this.state = {
      seconds: new Date().getSeconds(),
      time: new Date(),
      percent: 0,
      showIcon: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      percent: Math.round((state.seconds / 60) * 100),
    };
  }

  render() {
    return (
      <div className="App">
        <Statistic title="Seconds" value={this.state.seconds} />
        <br />
        <Row>
          <Col span={6} offset={6}>
            <Progress
              type="circle"
              strokeColor="green"
              percent={this.state.percent}
            />
          </Col>
          <Col span={6}>
            <Progress
              type="circle"
              strokeColor="red"
              percent={100 - this.state.percent}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} offset={6}>{this.state.showIcon && <CiCircleFilled spin />}</Col>
        </Row>
      </div>
    );
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ seconds: new Date().getSeconds(), time: new Date() });
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.time.getMinutes() !== this.state.time.getMinutes()) {
      this.setState((state) => ({
        showIcon:
          prevState.time.getMinutes() !== this.state.time.getMinutes()
            ? !state.showIcon
            : state.showIcon,
      }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }
}
