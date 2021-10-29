import "../css/Customer.css";
import React, { useState, useEffect } from "react";
import { createAPIEndpoint, ENDPOINTS } from "../api/CustomerAPI";
import { Table, Modal, Form, Input } from "antd";
import DeleteCustomer from "./DeleteCustomer";
import EditCustomer from "./EditCustomer";
const { Column } = Table;

// stateless component
const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [effect, setEffect] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsAddModalVisible(true);
  };
  const handleOk = (values) => {
    setIsAddModalVisible(false);
    console.log("value", values);
    sendCustomer(values);
  };
  const handleCancel = () => {
    setIsAddModalVisible(false);
  };
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
  }, [effect]);

  const sendCustomer = (e) => {
    console.log("e", e);
    const payload = {
      customerName: e.customerName,
      phoneNumber: e.phoneNumber,
    };
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
      <div>
        <div className="addCustomer">
          <span></span>
          <button className="addButton" onClick={showModal}>
            Add
          </button>
        </div>
        <Modal
          title="Add your User"
          visible={isAddModalVisible}
          onOk={() => {
            form.validateFields().then((values) => {
              form.resetFields();
              handleOk(values);
            });
          }}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" name="add_user">
            <Form.Item
              name="customerName"
              label="Enter your user name"
              rules={[{ required: true, message: "Please enter user name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Enter your user phone number"
              rules={[
                { required: true, message: "Please enter phone number!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
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
          title="Phone Number"
          dataIndex="PhoneNumber"
          key="PhoneNumber"
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
