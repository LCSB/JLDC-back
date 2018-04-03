import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Button, Input, Modal, Form, Radio, Table,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
@connect(({ car }) => ({
  carList: car.carList,
  carLoad: car.carListLoading,
}))
@Form.create()
export default class Modalconfig extends PureComponent {
  componentWillMount() {
    this.props.dispatch({
      type: 'car/getAllCarList',
    });
  }
  cancelFormModal = () => {
    this.props.form.resetFields();
    this.props.cancelModal();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        const { dispatch, selectCar } = this.props;
        const params = {};
        params.role_name = fieldsValue.role_name;
        params.enable = Boolean(fieldsValue.enable);
        params.description = fieldsValue.description;
        params.api_groups = [];
        params.vehicle_types = selectCar;
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
          // console.log(params.id);
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
    const {
      moadlType, record, carList, carLoad, selectCar,
    } = this.props;
    const pagination = {
      pageSize: 5,
      total: carList.length,
    };
    const rowSelection = {
      selectedRowKeys: selectCar,
      onChange: this.props.changeRowData,
    };
    const columns = [
      {
        title: '车牌号',
        dataIndex: 'vehicle.vehicle_number',
        width: 200,
        align: 'center',
      },
      {
        title: '车型',
        dataIndex: 'vehicle_model_name',
        width: 200,
        align: 'center',
      },
      {
        title: '车型用途',
        dataIndex: 'vehicle_type_name',
        width: 200,
        align: 'center',
      },
      {
        title: '座位数',
        dataIndex: 'vehicle.seat_number',
        width: 200,
        align: 'center',
      },
      {
        title: '部门',
        dataIndex: 'vehicle.depart_id',
        width: 200,
        align: 'center',
      },
      {
        title: '车辆状态',
        dataIndex: 'vehicle.vehicle_status',
        width: 200,
        align: 'center',
      },
    ];
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
              <Input placeholder="角色名称" disabled={moadlType === '详情'} />
            )}
          </FormItem>
          <FormItem
            label="角色状态"
          >
            {getFieldDecorator('enable', {
              rules: [{ required: true, message: '请选择角色状态' }],
              initialValue: moadlType === '添加' ? true : record.enable,
            })(
              <RadioGroup disabled={moadlType === '详情'} >
                <Radio value>正常</Radio>
                <Radio value={false}>停用</Radio>
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
          <Table
            dataSource={carList}
            columns={columns}
            rowKey={(recordMes => recordMes.vehicle.id)}
            loading={carLoad}
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
