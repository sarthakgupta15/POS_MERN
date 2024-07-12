import React, {useEffect, useState} from "react";
import DefaultLayout from "../components/DefaultLayout";
import { useDispatch } from "react-redux";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from "axios";
import { Modal, Button, Table } from "antd";

const ItemPage = () => {
  const dispatch = useDispatch();
  const [itemsData, setItemsData] = useState([]);
  const [popupModal, setPopupModal] = useState(false)
  //useEffect
  useEffect(() => {
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
    getAllItems()
  }, [dispatch]);

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
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </DefaultLayout>
  );
};

export default ItemPage;
