import "../css/Form.css";
import React, { useState, useEffect } from "react";
import {
  Form,
  InputNumber,
  Input,
  Select,
  Descriptions,
  Button,
  AutoComplete,
} from "antd";
import SelectCustomer from "./SelectCustomer";
import { DatePicker, TimePicker, message } from "antd";
import { createAPIEndpoint, ENDPOINTS } from "../api/CustomerAPI";

const WeidghtBill = () => {
  const [bill, setBill] = useState({});
  const [customerID, setCustomerID] = useState(0);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [customers, setCustomers] = useState([]);
  const [carWeight, setCarWeight] = useState(0);
  const [goodsWeight, setGoodsWeight] = useState(0);
  const [price, setPrice] = useState(0);
  const [autoPhone, setAutoPhone] = useState([]);

  useEffect(() => {
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .fetchAll()
      .then((res) => {
        let customers = res.data.map((item) => ({
          id: item.customerId,
          CustomerName: item.customerName,
          PhoneNumber: item.phoneNumber,
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
    console.log(value);
    let newBill = {
      customerID: customerID,
      phoneTake: value.phoneTake,
      phoneBuy: value.phoneBuy,
      driver: value.driver,
      carNumber: value.carNumber,
      goodsWeight: value.goodsWeight,
      carWeight: value.carWeight,
      totalWeight: value.goodsWeight + value.carWeight,
      price: value.price,
      amount: (value.goodsWeight + value.carWeight) * value.price,
      status: value.status === "export" ? true : false,
      productName: value.productName,
      dateTime: `${date}T${time}`,
    };
    setBill((state) => ({ ...state, ...newBill }));
  };
  const handleCustomer = (id) => {
    const { PhoneNumber } = customers.find(
      (cus) => Number(cus.id) === Number(id)
    );
    //console.log("Phone Number", PhoneNumber);
    setAutoPhone(() => [{ value: PhoneNumber }]);
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
      <div className="section1">
        <Form.Item label="Khách hàng">
          <div className="customerName">
            <SelectCustomer data={customers} handleCustomer={handleCustomer} />
          </div>
        </Form.Item>
        <Form.Item
          label="SDT Lấy Tiền"
          name="phoneTake"
          rules={[{ required: false, message: "Vui lòng nhập số điện thoại!" }]}
        >
          {/* <Input className="phoneTake" defaultValue={autoPhone} /> */}

          <AutoComplete options={autoPhone} className="phoneTake" />
        </Form.Item>
      </div>

      <Form.Item
        name="phoneBuy"
        label="SDT Mua Hàng"
        rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
      >
        <Input className="phoneBuy" />
      </Form.Item>

      <div className="section2">
        <Form.Item name="driver" label="Tài xế">
          <Input className="driver" />
        </Form.Item>
        <Form.Item
          name="carNumber"
          label="Số Xe"
          rules={[{ required: true, message: "Vui lòng nhập số xe" }]}
          className="carNumber"
        >
          <div>
            <Input />
          </div>
        </Form.Item>
      </div>

      <div className="section3">
        <Form.Item
          label="Tên hàng"
          name="productName"
          rules={[{ required: true, message: "Vui lòng nhập tên hàng" }]}
        >
          <Input className="productName" />
        </Form.Item>
        <Form.Item label="Xuất/Nhập" name="status" className="statusName">
          <div className="status">
            <Select>
              <Select.Option value="export">Xuất</Select.Option>
              <Select.Option value="import">Nhập</Select.Option>
            </Select>
          </div>
        </Form.Item>

        <Form.Item label="Chọn ngày giờ">
          <div>
            <DatePicker onChange={onChangeDate} />
            <TimePicker onChange={onChangeTime} />
          </div>
        </Form.Item>
      </div>
      <div className="section4">
        <Form.Item name="goodsWeight" label="Khối lượng hàng">
          <InputNumber min={0} onChange={(value) => setGoodsWeight(value)} />
        </Form.Item>
        <Form.Item
          name="carWeight"
          label="Khối lượng xe"
          className="carWeightLabel"
        >
          <InputNumber min={0} onChange={(value) => setCarWeight(value)} />
        </Form.Item>
        <span>Khối lượng {goodsWeight + carWeight}</span>
      </div>
      <Form.Item name="price" label="Đơn giá">
        <InputNumber
          min={0}
          onChange={(value) => {
            setPrice(value);
          }}
        />
      </Form.Item>

      <Descriptions title="Thành tiền: " className="section5">
        <Descriptions.Item>
          {(carWeight + goodsWeight) * price} KG
        </Descriptions.Item>
      </Descriptions>

      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default WeidghtBill;
