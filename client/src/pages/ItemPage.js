import React, {useEffect, useState} from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { Modal, Button, Table, Form, Input, Select, message } from "antd";
const ItemPage = () => { 
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false);

  const getAllItems = async () => {
    try{
        dispatch({
            type: 'SHOW_LOADING',
        });
        const { data } = await axios.get("/api/items/get-item");
        setItemsData(data);
        dispatch({
            type: "HIDE_LOADING",
        });
        console.log(data);
    } catch (error) {
        console.log(error);
    }
  };

  //useEffect
  useEffect(() => {
    
    getAllItems()
  }, []);

  //Table data
  const columns = [
    { title:'Name', dataIndex: 'name' },
    {
        title:'Image', 
        dataIndex: 'image', 
        render:(image, record) => ( 
            <img src={image} alt= {record.name} height="60" width="60" />
        ),
    },
    { title:'Price', dataIndex:'price' },
    
    {
        title: 'Actions', 
        dataIndex:"_id", 
        render: (id, record) => (
          <div> 
            <DeleteOutlined style = {{ cursor: 'pointer' }} />
            <EditOutlined style = {{ cursor: 'pointer' }} />
          </div>
        ),
    },
  ];

  //handle form Submit
  const handleSubmit = async (value) => {
    try{
      dispatch({
          type: 'SHOW_LOADING',
      });
      const res = await axios.post("/api/items/add-item", value);
      message.success('Item Added Succesfully');
      getAllItems();
      setPopupModal(false);
      dispatch({
          type: "HIDE_LOADING",
      });
      
    } catch (error) {
      message.error('Something went wrong')
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-between">
        <h1>Item List</h1>
        <Button type="primary" onClick={() => setPopupModal(true)}>
          Add Item
        </Button>
      </div>
      
      <Table columns={columns} dataSource={itemsData} bordered/>

      <Modal 
        title="Add New Item" 
        visible={popupModal} 
        onCancel={() => setPopupModal(false)}
        footer={false}
      >
        <Form layout = "vertical" onFinish={handleSubmit}>

          <Form.Item name="name" label="Name">
            <Input/>
          </Form.Item>

          <Form.Item name="price" label="Price">
            <Input/>
          </Form.Item>

          <Form.Item name="image" label="Image URL">
            <Input/>
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select>
              <Select.Option value = "drinks">Drinks</Select.Option>
              <Select.Option value = "rice">Rice</Select.Option>
              <Select.Option value = "noodles">Noodles</Select.Option>
            </Select>
          </Form.Item>
          
          <div className = "d-flex justify-content-end">
            <Button type = "primary" htmlType="submit">SAVE</Button>
          </div>

        </Form>
        
      </Modal>

    </DefaultLayout>
  );
};

export default ItemPage;
