import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import './UploadResource.scss'; // 引入样式文件

const { Option } = Select;

const UploadResource: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    // 检查是否有任意一项为空
    const { bookName, author, press, category, introduction } = values;
    if (!bookName || !author || !press || !category || !introduction) {
      message.error('请填写所有内容');
      return;
    }
    // 提交表单逻辑
    console.log('提交表单', values);
    message.success("上传成功~")
    form.resetFields()
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('出现错误！')
  };

  return (
    <div className='box'>
        <div className='resource'>上传我的资源</div>
      <Form
        form={form}
        name="uploadResourceForm"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="书名"
          name="bookName"
          rules={[{ required: true, message: '请输入书名' }]}
        >
          <Input placeholder="请输入书名"/>
        </Form.Item>

        <Form.Item
          label="作者"
          name="author"
          rules={[{ required: true, message: '请输入作者' }]}
        >
          <Input placeholder="请输入作者" />
        </Form.Item>

        <Form.Item
          label="出版社"
          name="press"
          rules={[{ required: true, message: '请输入出版社' }]}
        >
          <Input placeholder="请输入出版社"/>
        </Form.Item>

        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: '请选择分类' }]}
        >
          <Select placeholder="请选择分类">
            <Option value="fiction">小说</Option>
            <Option value="literature">文学</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="简介"
          name="introduction"
          rules={[{ required: true, message: '请输入简介' }]}
        >
         <Input.TextArea rows={4} placeholder="请输入简介"></Input.TextArea>
        </Form.Item>

        <Form.Item>
          <Button  style={{ backgroundColor: 'geekblue' }} type="primary" htmlType="submit">
            提交
          </Button>
          <Button  style={{ backgroundColor: 'bisque' }} htmlType="button" onClick={() => form.resetFields()}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UploadResource;