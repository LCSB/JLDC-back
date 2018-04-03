import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Button, Input, Modal, Form, Radio, Select, Table,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
// const { TextArea } = Input;
@connect(({ role }) => ({
  roleList: role.roleList,
  ListLoading: role.ListLoading,
}))
@Form.create()
export default class Modalconfig extends PureComponent {
  state = {
    selectRole: [],
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'role/getList',
    });
  }

  cancelModalForm = () => {
    this.props.form.resetFields();
    this.props.cancelModal();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { dispatch, record } = this.props;
        const params = {};
        params.name = fieldsValue.name;
        params.police_number = fieldsValue.police_number;
        params.enable = fieldsValue.enable;
        params.Phone = fieldsValue.Phone;
        params.depart_id = fieldsValue.depart_id;
        if (this.props.moadlType === '添加') {
          params.password = '123456';
          params.income = '12';
          params.vehicle_depart_id = 1;
          dispatch({
            type: 'person/addPerson',
            payload: params,
            callback: () => {
              dispatch({
                type: 'person/getAllList',
              });
            },
          });
        }
        if (this.props.moadlType === '修改') {
          params.id = record.id;
          params.password = '123456';
          params.income = record.income;
          params.vehicle_depart_id = record.vehicle_depart_id;
          dispatch({
            type: 'person/revisePerson',
            payload: params,
            callback: () => {
              dispatch({
                type: 'person/getAllList',
              });
            },
          });
        }
        this.props.form.resetFields();
        this.props.cancelModal();
      }
    });
  }

  changeRowData = (selectedRowKeys) => {
    this.setState({
      selectRole: selectedRowKeys,
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      moadlType, record, orgList, roleList,
      ListLoading,
    } = this.props;
    const rowSelection = {
      selectedRowKeys: this.state.selectRole,
      type: 'radio',
      onChange: this.changeRowData,
    };
    const pagination = {
      pageSize: 5,
      total: roleList.length,
    };
    const columns = [{
      title: '角色名称',
      dataIndex: 'role_name',
      width: 200,
      align: 'center',
    }, {
      title: '系统用户',
      dataIndex: 'is_system',
      width: 200,
      align: 'center',
      render: (val) => {
        return (
          <div>
            {
              val &&
              <span>是</span>
            }
            {
              !val &&
              <span>否</span>
            }
          </div>
        );
      },
    },
    {
      title: '角色描述',
      dataIndex: 'description',
      width: 200,
      align: 'center',
    }, {
      title: '角色状态',
      dataIndex: 'enable',
      width: 150,
      align: 'center',
      render: (val) => {
        return (
          <div> { val &&
          <span >可用</span>
                }
            {!val &&
            <span>不可用</span>
                }
          </div>
        );
      },
    }];
    return (
      <Modal
        visible={this.props.userVisible}
        width={1000}
        footer={null}
        title={`用户${moadlType}`}
        maskClosable={false}
        onCancel={this.cancelModalForm}
        style={{ top: 10 }}
      >
        <Form
          onSubmit={this.handleSubmit}
        >
          <FormItem
            label="用户名称"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入用户名称' }],
              initialValue: moadlType === '添加' ? '' : record.name,
            })(
              <Input
                disabled={moadlType === '详情'}
                placeholder="用户名称"
              />
            )}
          </FormItem>
          <FormItem
            label="警号"
          >
            {getFieldDecorator('police_number', {
              rules: [{ required: true, message: '请输入警号' }],
              initialValue: moadlType === '添加' ? '' : record.police_number,
            })(
              <Input
                disabled={moadlType === '详情'}
                placeholder="警号"
              />
            )}
          </FormItem>
          <FormItem
            label="用户状态"
          >
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请选择用户状态' }],
              initialValue: moadlType === '添加' ? '' : record.enable,
            })(
              <RadioGroup
                disabled={moadlType === '详情'}
              >
                <Radio value>正常</Radio>
                <Radio value={false}>停用</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            label="用户电话"
          >
            {getFieldDecorator('Phone', {
              rules: [{ required: true, message: '请输入用户电话' }],
              initialValue: moadlType === '添加' ? '' : record.phone,
            })(
              <Input
                disabled={moadlType !== '添加'}
                placeholder="用户电话"
              />
            )}
          </FormItem>
          <FormItem
            label="所属部门"
          >
            {getFieldDecorator('depart_id', {
              rules: [{ required: true, message: '请选择所属部门' }],
              initialValue: moadlType === '添加' ? '' : record.depart_id,
            })(
              <Select
                disabled={moadlType === '详情'}
              >
                {
                  orgList.map((val) => {
                    return (
                      <Option
                        key={val.organization.id}
                        value={val.organization.id}
                      >
                        {val.organization.org_name}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            label="用车部门"
          >
            {getFieldDecorator('vehicle_depart_id', {
              rules: [{ required: true, message: '请选择所属部门' }],
              initialValue: moadlType === '添加' ? '' : record.vehicle_depart_id,
            })(
              <Select
                disabled={moadlType === '详情'}
              >
                {
                  orgList.map((val) => {
                    return (
                      <Option
                        key={val.organization.id}
                        value={val.organization.id}
                      >
                        {val.organization.org_name}
                      </Option>
                    );
                  })
                }
              </Select>
            )}
          </FormItem>
          {
            moadlType === '详情' &&
            (
              <FormItem
                label="系统用户"
              >
                {getFieldDecorator('is_system', {
                  initialValue: record.is_system,
                })(
                  <RadioGroup
                    disabled
                  >
                    <Radio value>是</Radio>
                    <Radio value={false}>否</Radio>
                  </RadioGroup>
                )}
              </FormItem>
            )
          }
          <Table
            dataSource={roleList}
            columns={columns}
            rowKey={(recordMes => recordMes.id)}
            loading={ListLoading}
            pagination={pagination}
            rowSelection={rowSelection}
          />
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
