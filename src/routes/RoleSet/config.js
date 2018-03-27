import React, { PureComponent } from 'react';
import {
  Button, Input, Modal, Form, Radio,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@Form.create()
export default class Modalconfig extends PureComponent {
  handleSubmit = () => {
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        if (this.props.moadlType === '添加') {
          this.props.dispatch({
            type: 'role/addRole',
            payload: fieldsValue,
          });
        }
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { moadlType } = this.props;
    return (
      <Modal
        visible={this.props.roleVisible}
        width={1000}
        footer={null}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="角色名称"
          >
            {getFieldDecorator('role_name', {
              rules: [{ required: true, message: '请输入角色名称' }],
            })(
              <Input placeholder="Username" />
            )}
          </FormItem>
          <FormItem
            label="系统用户"
          >
            {getFieldDecorator('is_system', {
              rules: [{ required: true, message: '请输入角色名称' }],
            })(
              <RadioGroup>
                <Radio value="true">是</Radio>
                <Radio value="false">否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="角色状态"
          >
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请输入角色名称' }],
            })(
              <RadioGroup>
                <Radio value={0}>正常</Radio>
                <Radio value={1}>停用</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="角色属性"
          >
            {getFieldDecorator('role_type', {
              rules: [{ required: true, message: '请输入角色名称' }],
            })(
              <RadioGroup>
                <Radio value={1}>系统管理员</Radio>
                <Radio value={2}>调度员</Radio>
                <Radio value={3}>领导</Radio>
                <Radio value={4}>仓库管理员</Radio>
                <Radio value={5}>普通警员</Radio>
                <Radio value={6}>司机</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="角色描述"
          >
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '请输入角色名称' }],
            })(
              <TextArea />
            )}
          </FormItem>
          <div className="btns">
            <Button type="primary" htmlType="submit">{moadlType}</Button>
            <Button type="primary">取消</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}
