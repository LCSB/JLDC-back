import React, { PureComponent } from 'react';
import {
  Modal, Form, Input,
} from 'antd';

@Form.create()
export default class AddModal extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={this.props.title}
        maskClosable={false}
        visible={this.props.addVisible}
        footer={null}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <Form.Item>
            {
              getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input
                  placeholder="请输入姓名"
                />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
