import React, { useState, useLayoutEffect, useEffect } from "react";
import { Select, AutoComplete } from "antd";
import { render } from "@testing-library/react";

const { Option } = Select;

const SelectCustomer = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
    console.log("hook", props.data);
  }, [props.data]);

  const handleChange = (event) => {
    //console.log("event", event);
    const id = props.handleCustomer(event);
  };
  return (
    <Select
      className="selectCustomer"
      showSearch
      value={data.id}
      placeholder="Select Customer"
      optionFilterProp="children"
      showArrow={false}
      filterOption={(inputValue, data) => {
        //console.log("input", inputValue);
        //console.log("data", data.children);
        return (
          data.children.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
        );
      }}
      onChange={handleChange}
      notFoundContent={null}
    >
      {data.map((d) => (
        <Option key={d.id} value={d.id}>
          {d.CustomerName}
        </Option>
      ))}
    </Select>
  );
};

export default SelectCustomer;
