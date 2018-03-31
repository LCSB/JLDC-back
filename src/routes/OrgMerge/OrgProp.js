import React, { PureComponent } from 'react';
import { Form, Button, Modal, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;
@Form.create()
export default class Myplist extends PureComponent {
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
        params.org_name = fieldsValue.org_name;
        params.org_code = fieldsValue.org_code;
        params.parent_id = fieldsValue.parent_id;
        params.tel_phone = fieldsValue.tel_phone;
        params.address = fieldsValue.address;
        if (this.props.modalType === '添加') {
          this.props.dispatch({
            type: 'org/addlist',
            payload: params,
            callback: () => {
              dispatch({
                type: 'org/getOrgList',
              });
            },
          });
        }
        if (this.props.modalType === '修改') {
          const { id } = this.props.record;
          params.id = id;
          dispatch({
            type: 'org/resivelist',
            payload: params,
            callback: () => {
              dispatch({
                type: 'org/getOrgList',
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
    const { modalType, record, List } = this.props;
    return (
      <Modal
        visible={this.props.orgVisible}
        width={1000}
        footer={null}
        onCancel={this.cancelFormModal}
        title={`单位${modalType}`}
        maskClosable={false}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="单位名称"
          >
            {getFieldDecorator('org_name', {
              rules: [{ required: true, message: '请输入单位名称' }],
              initialValue: modalType === '添加' ? '' : record.org_name,
            })(
              <Input
                palceholder="单位名称"
                disabled={modalType === '详情'}
              />
            )}
          </FormItem>
          <FormItem
            label="编码"
          >
            {getFieldDecorator('org_code', {
              rules: [{ required: true, message: '请输入编码' }],
              initialValue: modalType === '添加' ? '' : record.org_code,
            })(
              <Input
                palceholder="编码"
                disabled={modalType === '详情'}
              />
            )}
          </FormItem>
          <FormItem
            label="上级单位ID"
          >
            {getFieldDecorator('parent_id', {
              rules: [{ required: true, message: '请选择上级单位ID' }],
              initialValue: modalType === '添加' ? '' : record.parent_id,
            })(
              <Select
                disabled={modalType === '详情'}
              >
                {
                  List.map((oly) => {
                    return (
                      <Option
                        key={oly.organization.prent_id}
                        value={oly.organization.parent_id}
                      >
                        {oly.organization.parent_id}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="电话"
          >
            {getFieldDecorator('tel_phone', {
              rules: [{ required: true, message: '请输入电话' }],
              initialValue: modalType === '添加' ? '' : record.tel_phone,
            })(
              <Input
                palceholder="电话"
                disabled={modalType === '详情'}
              />
            )}
          </FormItem>
          <FormItem
            label="地址"
          >
            {getFieldDecorator('address', {
              rules: [{ required: true, messageaddress: '请输入地址' }],
              initialValue: modalType === '添加' ? '' : record.address,
            })(
              <Input
                palceholder="地址"
                disabled={modalType === '详情'}
              />
            )}
          </FormItem>
          {
            modalType !== '详情' &&
            (
              <div className="btns">
                <Button type="primary" htmlType="submit">{modalType}</Button>
                <Button
                  type="primary"
                  onClick={this.cancelFormModal}
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
