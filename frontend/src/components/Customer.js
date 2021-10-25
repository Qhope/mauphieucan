import "../css/Customer.css";
import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api/CustomerAPI";
import { Table, Button, Form, Input } from "antd";
import WeidghtBill from "./Form";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
const { Column } = Table;

// stateless component
const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [effect, setEffect] = useState(true);

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
  }, [effect]);

  const onFinish = (e) => {
    console.log(e.addCustomer);
    const payload = { customerName: e.addCustomer };
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .create(payload)
      .catch((error) => {
        console.log("Error when insert Data", error);
      });

    setEffect((preEffect) => {
      return !preEffect;
    });
  };
  const handleDelete = (record) => {
    //e.preventDefault();
    console.log("record", record);
    const payload = record.id;
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .delete(payload)
      .catch((error) => {
        console.log("Error when delete Data", error);
      });
    setEffect((preEffect) => {
      return !preEffect;
    });
  };

  const handleEdit = (id, value) => {
    console.log("value", value);
    console.log("id", id);
    const payload = {
      customerId: id,
      customerName: value,
    };
    createAPIEndpoint(ENDPOINTS.CUSTOMER)
      .edit(id, payload)
      .catch((error) => {
        console.log("Error when edit Data", error);
      });
    setEffect((preEffect) => {
      return !preEffect;
    });
  };
  return (
    <div>
      <Form onFinish={onFinish} className="addCustomer">
        <Form.Item name="addCustomer" label="Add Customer">
          <Input />
        </Form.Item>
        <Button type="add" htmlType="submit">
          Add
        </Button>
      </Form>
      <Table
        dataSource={customers}
        pagination={{ pageSize: 50 }}
        scroll={{ y: 250 }}
      >
        <Column title="id" dataIndex="id" key="id" />
        <Column
          title="Customer Name"
          dataIndex="CustomerName"
          key="CustomerName"
        />
        <Column
          title="Action"
          dataIndex=""
          key="x"
          render={(text, record) => (
            <div className="action">
              {/* <a onClick={(e) => handleDelete(record, e)}>Delete</a> */}
              <DeleteCustomer record={record} handleDelete={handleDelete} />
              <EditCustomer record={record} handleEdit={handleEdit} />
            </div>
          )}
        />
      </Table>
    </div>
  );
};

export default Customer;
