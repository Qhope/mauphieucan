import { Modal, Button, Input, Form } from "antd";
import React, { useState } from "react";

const EditCustomer = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = (values) => {
    setIsModalVisible(false);
    console.log(values.customerName);
    const edit = props.handleEdit(props.record.id, values.customerName);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="link" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Edit your User"
        visible={isModalVisible}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            handleOk(values);
            //console.log(values);
          });
        }}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="edit_user">
          <Form.Item
            name="customerName"
            title="Enter new user name"
            rules={[
              {
                required: true,
                message: "Please enter user name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
export default EditCustomer;
