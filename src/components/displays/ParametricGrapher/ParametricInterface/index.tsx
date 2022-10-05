import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';

import 'antd/dist/antd.variable.css';
import './ParametricInterface.css';

import { AppState, AppDispatch } from 'src/Root';
import {
  Button, Dropdown, Input, InputNumber, Menu, Select, Spin, Typography,
} from 'antd';
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';
import { ItemType } from 'antd/lib/menu/hooks/useItems';

import equations, { Equation, EquationLabel } from 'components/displays/ParametricGrapher/ParametricEquations';

const { Option } = Select;

type Props = {
  width: number,
  height: number,
  margin: number,
  playAnimation: () => void,
  setEquations: (x: (t:number) => number, y: (t:number) => number) => void,
};

type State = {
  program: string,
  coefA: number,
  coefB: number,
  tStart: number,
  tEnd: number
};

class ParametricInterface extends React.Component<Props, State> {
  constructor(props : Props) {
    super(props);

    const { setEquations } = props;

    this.state = {
      program: EquationLabel[Number(0)],
      coefA: 0,
      coefB: 0,
      tStart: 0,
      tEnd: 1,
    };

    equations[0].useEquation(setEquations, 0, 0, 0, 1);
  }

  getEquation = (prog: string):(Equation | undefined) => equations.find((item: Equation) => item.label === (EquationLabel[prog as keyof typeof EquationLabel]));

  handleSelectEquationChange = (value: string) => {
    this.handleEquationChange(value);
  };

  handleEquationChange = (value: string, a?: number, b?: number, t0?: number, tf?: number) => {
    const { setEquations } = this.props;
    const {
      coefA, coefB, tStart, tEnd,
    } = this.state;

    this.setState({
      program: value,
      coefA: a || coefA,
      coefB: b || coefB,
      tStart: t0 || tStart,
      tEnd: tf || tEnd,
    });

    const equation:(Equation | undefined) = this.getEquation(value);
    // console.log(equation, equation?.useEquation, a, b);
    equation?.useEquation(setEquations, a || coefA, b || coefB, t0 || tStart, tf || tEnd);
  };

  render(): React.ReactNode {
    const {
      width, height, margin, playAnimation,
    } = this.props;
    const {
      program,
      coefA,
      coefB,
      tStart,
      tEnd,
    } = this.state;

    // { key: string, label: JSX.Element }
    const options:JSX.Element[] = [];
    Object.keys(EquationLabel).forEach((index) => {
      if (typeof EquationLabel[0] === 'string') {
        options.push(
          <Option value={EquationLabel[Number(index)]}>
            {EquationLabel[Number(index)]}
          </Option>,
        );
      }
    });

    return (
      <div
        className="ParametricInterface"
        style={{
          width,
          height,
          margin,
          marginLeft: 0,
        }}
      >
        <div className="ParametricInterfaceEnd">
          <Select
            className="ParametricInterfaceEndContents"
            value={program}
            onChange={this.handleSelectEquationChange}
          >
            { options }
          </Select>
        </div>

        <div className="ParametricInterfaceMiddle">
          <div
            className="ParametricInterfaceLatex"
            style={{
              width,
            }}
          >
            { this.getEquation(program)?.pic(width) }
          </div>

          <div className="ParametricInterfaceMiddleRow">
            <div className="ParametricInterfaceInput">
              <InputNumber
                addonBefore="a:"
                style={{ width: width / 2.5 }}
                value={coefA}
                onChange={(val: number) => {
                  this.handleEquationChange(program, val);
                }}
              />
            </div>

            <div className="ParametricInterfaceInput">
              <InputNumber
                addonBefore="b:"
                style={{ width: width / 2.5 }}
                value={coefB}
                onChange={(val: number) => {
                  this.handleEquationChange(program, undefined, val);
                }}
              />
            </div>
          </div>

          <div className="ParametricInterfaceMiddleRow">
            <div className="ParametricInterfaceInput">
              <InputNumber
                addonBefore="t0:"
                style={{ width: width / 2.5 }}
                value={tStart}
                onChange={(val: number) => {
                  this.handleEquationChange(program, undefined,
                    undefined, val);
                }}
              />
            </div>

            <div className="ParametricInterfaceInput">
              <InputNumber
                addonBefore="tf:"
                style={{ width: width / 2.5 }}
                value={tEnd}
                onChange={(val: number) => {
                  this.handleEquationChange(program, undefined, undefined,
                    undefined, val);
                }}
              />
            </div>
          </div>

        </div>

        <div className="ParametricInterfaceEnd">
          <Button
            className="ParametricInterfaceEndContents"
            onClick={playAnimation}
          >
            Run
          </Button>
        </div>

      </div>

    );
  }
}

export default ParametricInterface;
