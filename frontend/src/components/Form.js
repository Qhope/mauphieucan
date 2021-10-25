import "../css/Form.css";
import React, { useState, useEffect } from "react";
import { Form, InputNumber, Input, Select, Descriptions, Button } from "antd";
import SelectCustomer from "./SelectCustomer";
import { DatePicker, TimePicker, message } from "antd";
import { createAPIEndpoint, ENDPOINTS } from "../api/CustomerAPI";

const WeidghtBill = () => {
  const [bill, setBill] = useState({});
  const [customerID, setCustomerID] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [customers, setCustomers] = useState([]);
  const [carWeight, setCarWeight] = useState(Math.floor(Math.random() * 10000));
  const [goodsWeight, setGoodsWeight] = useState(
    Math.floor(Math.random() * 10000)
  );
  const [price, setPrice] = useState(0);
  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        let customers = res.data.map((item) => ({
          id: item.customerId,
          CustomerName: item.customerName,
        }));
        //console.log(customers);
        setCustomers(customers);
      });
  }, []);
  useEffect(() => {
    if (Object.keys(bill).length !== 0) {
      console.log("bill", Object.keys(bill).length);
      createAPIEndpoint(ENDPOINTS.BILLS)
        .create(bill)
        .then((res) => {
          message.success("Done!");
        })
        .catch((e) => {
          message.error("Error!");
        });
    }

    console.log(bill);
  }, [bill]);
  const onFinish = (value) => {
    let newBill = {
      customerID: customerID,
      phoneTake: value.phoneTake,
      phoneBuy: value.phoneBuy,
      carNumber: value.carNumber,
      price: value.price,
      status: value.status === "export" ? true : false,
      productName: value.productName,
      dateTime: `${date}T${time}`,
    };
    setBill((state) => ({ ...state, ...newBill }));
  };
  const handleCustomer = (id) => {
    setCustomerID(id);
  };
  const onChangeDate = (value, dateString) => {
    //console.log("Formatted: ", dateString);
    setDate(dateString);
  };
  const onChangeTime = (value, dateString) => {
    //console.log("Formatted: ", dateString);
    setTime(dateString);
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="SDT Lấy Tiền"
        name="phoneTake"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
        className="label"
      >
        <Input className="phoneTake" />
      </Form.Item>
      <Form.Item
        name="phoneBuy"
        label="SDT Mua Hàng"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input className="phoneBuy" />
      </Form.Item>
      <Form.Item
        name="carNumber"
        label="Số Xe"
        rules={[{ required: true, message: "Vui lòng nhập số xe" }]}
      >
        <Input className="carNumber" />
      </Form.Item>
      <Form.Item>
        <SelectCustomer data={customers} handleCustomer={handleCustomer} />
      </Form.Item>
      <Descriptions title="Trọng lượng">
        <Descriptions.Item label="Khối lượng tổng">
          {carWeight + goodsWeight} KG
        </Descriptions.Item>
        <Descriptions.Item label="Khối lượng xe">
          {carWeight} KG
        </Descriptions.Item>
        <Descriptions.Item label="Khối lượng hàng">
          {goodsWeight} KG
        </Descriptions.Item>
      </Descriptions>
      <Form.Item name="price" label="Đơn giá">
        <InputNumber
          min={0}
          onChange={(value) => {
            setPrice(value);
          }}
        />
      </Form.Item>

      <Form.Item label="Xuất/Nhập" name="status">
        <Select className="status">
          <Select.Option value="export">Xuất</Select.Option>
          <Select.Option value="import">Nhập</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Tên hàng"
        name="productName"
        rules={[{ required: true, message: "Vui lòng nhập tên hàng" }]}
      >
        <Input className="productName" />
      </Form.Item>
      <div>
        <p>Chọn ngày giờ</p>
        <DatePicker onChange={onChangeDate} />
        <TimePicker onChange={onChangeTime} />
      </div>
      <Descriptions title="Thành tiền">
        <Descriptions.Item label="Thành Tiền">
          {(carWeight + goodsWeight) * price}
        </Descriptions.Item>
      </Descriptions>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default WeidghtBill;
