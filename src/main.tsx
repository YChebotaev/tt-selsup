import React from "react";
import ReactDOM from "react-dom/client";

type Color = string;

interface Param {
  id: number;
  name: string;
  type: "string";
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}

interface Props {
  params: Param[];
  model: Model;
}

interface State {}

class ParamEditor extends React.Component<Props, State> {
  state = {
    model: this.props.model,
  };

  public getModel(): Model {
    return this.props.model;
  }

  getModelParamValueByParamId(paramId: number) {
    for (const { paramId: modelParamId, value } of this.state.model
      .paramValues) {
      if (modelParamId === paramId) {
        return value;
      }
    }
  }

  setModelParamValueByParamId(paramdId: number, paramValue: string) {
    this.setState({
      model: {
        ...this.state.model,
        paramValues: this.state.model.paramValues.map((param) => {
          if (param.paramId) {
            return {
              ...param,
              value: paramValue,
            };
          } else {
            return param;
          }
        }),
      },
    });
  }

  render(): React.ReactNode {
    return (
      <div>{this.props.params.map((param) => this.renderParam(param))}</div>
    );
  }

  renderParam(param: Param) {
    return (
      <div key={param.id}>
        <label>{param.name}</label>
        <input
          type="string"
          defaultValue={this.getModelParamValueByParamId(param.id)}
          onChange={(e) => {
            const value = e.target.value;

            this.setModelParamValueByParamId(param.id, value);
          }}
        />
      </div>
    );
  }
}

const model: Model = {
  paramValues: [
    {
      paramId: 1,
      value: "повседневное",
    },
    {
      paramId: 2,
      value: "макси",
    },
  ],
  colors: ["#ffffff", "#000000"],
};

const params: Param[] = [
  {
    id: 1,
    name: "Назначение",
    type: "string",
  },
  {
    id: 2,
    name: "Длина",
    type: "string",
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ParamEditor model={model} params={params} />
  </React.StrictMode>,
);
