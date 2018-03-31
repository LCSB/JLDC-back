import React, { PureComponent } from 'react';
import {
  Button, Input, Modal, Form, Radio,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;

@Form.create()
export default class Modalconfig extends PureComponent {
  cancelFormModal = () => {
    this.props.form.resetFields();
    this.props.cancelModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { dispatch } = this.props;
        const params = {};
        params.role_name = fieldsValue.role_name;
        params.is_system = Boolean(fieldsValue.is_system);
        params.enable = Boolean(fieldsValue.enable);
        params.role_type = fieldsValue.role_type;
        params.description = fieldsValue.description;
        console.log(params);
        if (this.props.moadlType === '添加') {
          this.props.dispatch({
            type: 'role/addRole',
            payload: params,
            callback: () => {
              dispatch({
                type: 'role/getList',
              });
            },
          });
        }
        if (this.props.moadlType === '修改') {
          const { id } = this.props.record;
          params.id = id;
          console.log(params.id);
          this.props.dispatch({
            type: 'role/resiveRole',
            payload: params,
            callback: () => {
              this.props.dispatch({
                type: 'role/getList',
              });
            },
          });
        }
        this.props.form.resetFields();
        this.props.cancelModal();
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { moadlType, record } = this.props;
    return (
      <Modal
        visible={this.props.roleVisible}
        width={1000}
        footer={null}
        title={`角色${moadlType}`}
        onCancel={this.cancelFormModal}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="角色名称"
          >
            {getFieldDecorator('role_name', {
              rules: [{ required: true, message: '请输入角色名称' }],
              initialValue: moadlType === '添加' ? '' : record.role_name,
            })(
              <Input placeholder="Username" disabled={moadlType === '详情'} />
            )}
          </FormItem>
          <FormItem
            label="系统用户"
          >
            {getFieldDecorator('is_system', {
              rules: [{ required: true, message: '请选择是否为系统用户' }],
              initialValue: moadlType === '添加' ? '' : record.is_system,
            })(
              <RadioGroup disabled={moadlType === '详情'} >
                <Radio value={1}>是</Radio>
                <Radio value={0}>否</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="角色状态"
          >
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请选择角色状态' }],
              initialValue: moadlType === '添加' ? '' : record.enable,
            })(
              <RadioGroup disabled={moadlType === '详情'} >
                <Radio value={1}>正常</Radio>
                <Radio value={0}>停用</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="角色属性"
          >
            {getFieldDecorator('role_type', {
              rules: [{ required: true, message: '请选择角色属性' }],
              initialValue: moadlType === '添加' ? '' : record.role_type,
            })(
              <RadioGroup disabled={moadlType === '详情'} >
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
              rules: [{ required: true, message: '请输入角色描述' }],
              initialValue: moadlType === '添加' ? '' : record.description,
            })(
              <TextArea />
            )}
          </FormItem>
          {
            moadlType !== '详情' &&
            (
              <div className="btns">
                <Button type="primary" htmlType="submit">{moadlType}</Button>
                <Button
                  type="primary"
                  onClick={this.cancelModalForm}
                >
                  取消
                </Button>
              </div>
            )
          }
        </Form>
      </Modal>
    );
  }
}
