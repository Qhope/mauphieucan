import React, { useState, useLayoutEffect, useEffect } from "react";
import { Select } from "antd";
import { render } from "@testing-library/react";

const { Option } = Select;

const SelectCustomer = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(props.data);
    console.log("hook");
  }, [props.data]);

  const handleChange = (event) => {
    //console.log(event);
    const id = props.handleCustomer(event);
  };
  return (
    <Select
      className="selectCustomer"
      showSearch
      value={data.id}
      placeholder="Select Customer"
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onChange={handleChange}
      notFoundContent={null}
    >
      {data.map((d) => (
        <Option key={d.id}>{d.CustomerName}</Option>
      ))}
    </Select>
  );
};

export default SelectCustomer;
