
// import React, { useState, useEffect } from 'react';
// import { Table, Button, Modal, Form, Input, message, Popconfirm , Space} from 'antd';
// import axios from 'axios';
// import { EditOutlined, DeleteOutlined ,PlusOutlined} from '@ant-design/icons'; // Import Ant Design icons
// import moment from 'moment';

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [form] = Form.useForm();
//   const [editedBlog, setEditedBlog] = useState(null); // To store the currently edited blog

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/getallblogs');
//         setBlogs(response.data);
//       } catch (error) {
//         console.error('Error fetching blogs:', error);
//       }
//     };

//     fetchData();
//   }, []); // Empty dependency array to run once when the component mounts

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const showEditModal = (blog) => {
//     setIsEditModalVisible(true);
//     setEditedBlog(blog);
//     form.setFieldsValue(blog); // Populate the form fields with blog data
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//     setIsEditModalVisible(false);
//     setEditedBlog(null);
//     form.resetFields();
//   };

//   const handleAdd = async (values) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/createblog', values);
//       const newBlog = response.data;
//       message.success('Blog added successfully!');
//       form.resetFields();
//       setIsModalVisible(false);
//       setBlogs([...blogs, newBlog]); // Update state with new blog entry
//     } catch (error) {
//       console.error('Error adding blog:', error);
//       message.error('Failed to add blog. Please try again later.');
//     }
//   };

//   const handleEdit = async (values) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/updatebyid/${editedBlog._id}`, values);
//       const updatedBlog = response.data;
//       message.success('Blog updated successfully!');
//       const updatedBlogs = blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog));
//       setBlogs(updatedBlogs);
//       setIsEditModalVisible(false);
//       form.resetFields();
//     } catch (error) {
//       console.error('Error editing blog:', error);
//       message.error('Failed to edit blog. Please try again later.');
//     }
//   };

//   const deleteUser = async (blogId) => {
//     try {
//       const response = await axios.delete(`http://localhost:5000/api/deletebyid/${blogId}`);
//       console.log(response);
//       // Update state to remove deleted blog
//       setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
//       message.success('Blog deleted successfully!');
//     } catch (error) {
//       console.error('Error deleting blog:', error);
//       message.error('Failed to delete blog. Please try again later.');
//     }
//   };
  
//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const columns = [
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//     },
//     {
//       title: 'Content',
//       dataIndex: 'content',
//       key: 'content',
//     },
//     {
//       title: 'Author',
//       dataIndex: 'author',
//       key: 'author',
//     },
//     {
//       title: 'Created At',
//       dataIndex: 'createdAt',
//       key: 'createdAt',
//       sorter: (a, b) => moment(a.startTime).unix() - moment(b.startTime).unix(),
//   render: (startTime) => moment(startTime).format('DD-MM-YYYY HH:mm'),
//   sortDirections: ['ascend', 'descend'],

//     },
    
//     {
//       title: 'Published',
//       dataIndex: 'published',
//       key: 'published',
//       render: (published) => <span>{published ? 'Yes' : 'No'}</span>,
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (text, record) => (
//         <span>
//           <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}><i className='fa-solid fa-pen-to-square'></i></Button>
//           <Popconfirm
//             title="Are you sure to delete this blog?"
//             onConfirm={() => deleteUser(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="link" danger icon={<DeleteOutlined />}><i className='fa-solid fa-trash'></i></Button>
//           </Popconfirm>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <div>
//      <Space style={{ marginBottom: '16px' }}>
//       <div style={{  }}>
//   <Input.Search
//     placeholder="Search Blogs"
//     style={{ width: 200, marginRight: 16 , width:"23rem" }}
//     enterButton
//   />
//   {/* <Button type="primary" icon={<SearchOutlined />} /> */}
// </div>

//         <Button type="primary" onClick={showModal} icon={<PlusOutlined />} style={{ marginLeft: '45rem' }}>
//           Add
//         </Button>
        
//       </Space>
//       <Table
//         dataSource={blogs}
//         columns={columns}
//         pagination={{ pageSize: 10 }}
//         rowKey={(record) => record._id} // Use record._id as the row key
//       />

//       <Modal title="Add Blog" visible={isModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="addBlogForm"
//           onFinish={handleAdd}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Title"
//             name="title"
//             rules={[{ required: true, message: 'Please input the title!' }]}
//           >
//             <Input placeholder='Enter Your Title'/>
//           </Form.Item>

//           <Form.Item
//             label="Content"
//             name="content"
//             rules={[{ required: true, message: 'Please input the content!' }]}
//           >
//             <Input.TextArea placeholder='Enter Your Content'/>
//           </Form.Item>

//           <Form.Item
//             label="Author"
//             name="author"
//             rules={[{ required: true, message: 'Please input the author!' }]}
//           >                                         
//             <Input placeholder='Enter Author Name'/>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Add Blog
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>

//       <Modal title="Edit Blog" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
//         <Form
//           form={form}
//           name="editBlogForm"
//           onFinish={handleEdit}
//           onFinishFailed={onFinishFailed}
//         >
//           <Form.Item
//             label="Title"
//             name="title"
//             rules={[{ required: true, message: 'Please input the title!' }]}
//           >
//             <Input placeholder='Enter Your Title'/>
//           </Form.Item>

//           <Form.Item
//             label="Content"
//             name="content"
//             rules={[{ required: true, message: 'Please input the content!' }]}
//           >
//             <Input.TextArea placeholder='Enter Your Content'/>
//           </Form.Item>

//           <Form.Item
//             label="Author"
//             name="author"
//             rules={[{ required: true, message: 'Please input the author!' }]}
//           >                                         
//             <Input placeholder='Enter Author Name'/>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit">
//               Update Blog
//             </Button>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BlogList;

import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space } from 'antd';
import axios from 'axios';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editedBlog, setEditedBlog] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallblogs');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchData();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const showEditModal = (blog) => {
    setIsEditModalVisible(true);
    setEditedBlog(blog);
    form.setFieldsValue(blog);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setEditedBlog(null);
    form.resetFields();
  };

  const handleAdd = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/createblog', values);
      const newBlog = response.data;
      message.success('Blog added successfully!');
      form.resetFields();
      setIsModalVisible(false);
      setBlogs([...blogs, newBlog]);
    } catch (error) {
      console.error('Error adding blog:', error);
      message.error('Failed to add blog. Please try again later.');
    }
  };

  const handleEdit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/updatebyid/${editedBlog._id}`, values);
      const updatedBlog = response.data;
      message.success('Blog updated successfully!');
      const updatedBlogs = blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog));
      setBlogs(updatedBlogs);
      setIsEditModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Error editing blog:', error);
      message.error('Failed to edit blog. Please try again later.');
    }
  };

  const deleteUser = async (blogId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/deletebyid/${blogId}`);
      console.log(response);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
      message.success('Blog deleted successfully!');
    } catch (error) {
      console.error('Error deleting blog:', error);
      message.error('Failed to delete blog. Please try again later.');
    }
  };

  const toggleActive = async (blogId, active) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/toggleactive/${blogId}`);
      const updatedBlog = response.data;
      const updatedBlogs = blogs.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog));
      setBlogs(updatedBlogs);
      message.success(`Blog ${updatedBlog.active ? 'activated' : 'deactivated'} successfully!`);
    } catch (error) {
      console.error('Error toggling blog active state:', error);
      message.error('Failed to toggle blog active state. Please try again later.');
    }
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => moment(a.startTime).unix() - moment(b.startTime).unix(),
      render: (startTime) => moment(startTime).format('DD-MM-YYYY HH:mm'),
      sortDirections: ['ascend', 'descend'],
    },
    {
      title: 'Published',
      dataIndex: 'published',
      key: 'published',
      render: (published) => <span>{published ? 'Yes' : 'No'}</span>,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active, record) => (
        <Button type="link" onClick={() => toggleActive(record._id, active)}>
          {active ? 'Active' : 'Inactive'}
        </Button>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <span>
          <Button type="link" onClick={() => showEditModal(record)} icon={<EditOutlined />}>
            Edit
          </Button>
          <Popconfirm
            title={`Are you sure to delete this blog?`}
            onConfirm={() => deleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: '16px' }}>
        <div>
          <Input.Search
            placeholder="Search Blogs"
            style={{ width: 200, marginRight: 16, width: "23rem" }}
            enterButton
          />
        </div>
        <Button type="primary" onClick={showModal} icon={<PlusOutlined />} >
          Add
        </Button>
      </Space>
      <Table
        dataSource={blogs}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey={(record) => record._id}
      />

      <Modal title="Add Blog" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="addBlogForm"
          onFinish={handleAdd}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder='Enter Your Title' />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Input.TextArea placeholder='Enter Your Content' />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Please input the author!' }]}
          >
            <Input placeholder='Enter Author Name' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Blog
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Blog" visible={isEditModalVisible} onCancel={handleCancel} footer={null}>
        <Form
          form={form}
          name="editBlogForm"
          onFinish={handleEdit}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder='Enter Your Title' />
          </Form.Item>

          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please input the content!' }]}
          >
            <Input.TextArea placeholder='Enter Your Content' />
          </Form.Item>

          <Form.Item
            label="Author"
            name="author"
            rules={[{ required: true, message: 'Please input the author!' }]}
          >
            <Input placeholder='Enter Author Name' />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Blog
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BlogList;
