import React, { useEffect , useState } from "react";
import axios from 'axios';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/users/userSlice";
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

const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  },[]);
  const userState = useSelector((state) => state.user.users); 
  // console.log('userState :', userState);
  // const data2 = [];
  // console.log('data fetched ' , userState)
   const [form] = Form.useForm();
   const [data, setData] = useState([]);
   useEffect(() => {
     const formattedData = userState.map((user, index) => {
       const date = new Date(user.creationDate);
       const year = date.getFullYear();
       const month = String(date.getMonth() + 1).padStart(2, '0');
       const day = String(date.getDate()).padStart(2, '0');
       const formattedDate = `${year}-${month}-${day}`;
       const isActive = user.active === true; // Assuming user.active is 'Active' or 'Inactive'
   
       return {
         id: user._id,
         key: index + 1,
         name: `${user.firstName} ${user.lastName}`,
         email: user.email,
         creationDate: formattedDate,
         role: user.role,
         active: isActive ? 'active': 'inactive',
       };
     });
   
     setData(formattedData);
   }, [userState]);
    
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  // console.log('data ',data)
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
      console.log('row',row);
      const newData = [...data];
      console.log('newData', newData);
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const editedItem = newData[index];
        console.log('edited' ,editedItem);
        const fullName = row.name; // Assuming the full name is in the 'fullName' field
        const [firstName, ...lastNameArr] = fullName.split(' ');
        const lastName = lastNameArr.join(' ');
        const updatedItem = {
          ...editedItem,
          ...row,
          firstName,
          lastName,
          active : row.active === 'active' 
        };
        newData.splice(index, 1, updatedItem);
        console.log(newData)
        setData(newData);
        setEditingKey('');
        await axios.put(`${base_url}/users/${updatedItem.id}`, updatedItem);
        dispatch(getUsers()); 
      } else {
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
      title: "Full Name",
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
      title: "CreationDate",
      dataIndex: "creationDate",
      width: '25%',
      editable: true,
      
    },
    {
      title: "Role",
      dataIndex: "role",
      width: '25%',
    },
    {
    title: "Active",
      dataIndex: "active",
      width: '25%',
      editable: true,
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
  //     <h3 className="mb-4 title">Users</h3>
  //     <div>
  //       <Table columns={columns} dataSource={data2} />
  //     </div>
  //   </div>
  // );

export default Users;
