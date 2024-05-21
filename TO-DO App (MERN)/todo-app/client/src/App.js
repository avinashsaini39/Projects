import React from "react";
import {
  Layout,
  Typography,
  Form,
  Input,
  Button,
  List,
  Card,
  Checkbox,
} from "antd";
import Tasks from "./Tasks";
import "./App.css";

const { Header, Content } = Layout;
const { Title } = Typography;

class App extends Tasks {
  state = { tasks: [], currentTask: "" };

  render() {
    const { tasks, currentTask } = this.state;
    return (
      <Layout className="App">
        <Header>
          <Title style={{ color: "white" }}>TO-DO</Title>
        </Header>
        <Content style={{ padding: "20px", maxWidth: "600px", width: "100%" }}>
          <Form
            layout="inline"
            onFinish={(values) => this.handleSubmit(values)}
            style={{ marginBottom: "20px" }}
          >
            <Form.Item
              style={{ flex: 1 }}
              name="task"
              rules={[{ required: true, message: "Please input your task!" }]}
            >
              <Input
                type="text"
                value={currentTask}
                onChange={this.handleChange}
                placeholder="Add New TO-DO"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Task
              </Button>
            </Form.Item>
          </Form>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={tasks}
            renderItem={(task) => (
              <List.Item>
                <Card>
                  <div className="task_container">
                    <Checkbox
                      checked={task.completed}
                      onChange={() => this.handleUpdate(task._id)}
                    />
                    <span
                      className={task.completed ? "task line_through" : "task"}
                    >
                      {task.task}
                    </span>
                    <Button
                      type="primary"
                      danger
                      onClick={() => this.handleDelete(task._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    );
  }
}

export default App;
