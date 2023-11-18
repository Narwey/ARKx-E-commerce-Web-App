import React, { useEffect , useState } from "react";
import axios from 'axios';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getCustomers } from "../features/customers/customerSlice";
import { base_url } from "../utils/baseUrl";


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Customers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  const customerstate = useSelector((state) => state.customer.customers);
  const data1 = [];
  console.log('data fetched ' , customerstate)
   const [form] = Form.useForm();
  const [data, setData] = useState([]);
  useEffect( ()=>{
    for (let i = 0; i < customerstate.length; i++) {
      if (customerstate[i].role !== "admin") {
         data1.push({
          id: customerstate[i]._id ,
          key: i + 1,
          name: customerstate[i].firstName + " " + customerstate[i].lastName,
          email: customerstate[i].email,
          status: customerstate[i].active ? 'true' : 'false',
        });
      }
    }
    setData(data1)
  },[customerstate])
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  console.log('data ',data)
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
    
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
  
      if (index > -1) {
        const editedItem = newData[index];
        const fullName = row.name; // Assuming the full name is in the 'fullName' field
        const [firstName, ...lastNameArr] = fullName.split(' ');
        const lastName = lastNameArr.join(' ');
        const updatedItem = {
          ...editedItem,
          ...row,
          firstName,
          lastName,
        };
        newData.splice(index, 1, updatedItem);
  
        setData(newData);
        setEditingKey('');
  
        // Access the id from the updatedItem and perform the axios.put request
        await axios.put(`${base_url}/customers/${updatedItem.id}`, updatedItem);
        dispatch(getCustomers());
      } else {
        // Handle if the index is not found
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
      width: '25%',
    },
    {
      title: "fullName",
      dataIndex: "name",
      width: '25%',
      editable: true,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: '25%',
      editable: true,
      
    },
    {
      title: "Status",
      dataIndex: "status",
      width: '25%',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
  
};
  // return (
  //   <div>
  //     <h3 className="mb-4 title">Customers</h3>
  //     <div>
  //       <Table columns={columns} dataSource={data1} />
  //     </div>
  //   </div>
  // );

export default Customers;
