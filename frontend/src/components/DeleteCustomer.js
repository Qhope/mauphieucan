import { render } from "@testing-library/react";
import React, { useEffect } from "react";
import { Popconfirm, message, Button } from "antd";
const DeleteCustomer = (props) => {
  const confirm = (e) => {
    e.preventDefault();
    const error = props.handleDelete(props.record);
    message.success("Done!");
  };
  const cancel = () => {};
  return (
    <Popconfirm
      title="Are you sure to delete this user?"
      onConfirm={confirm}
      oncancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <Button type="link">Delete</Button>
    </Popconfirm>
  );
};
export default DeleteCustomer;
