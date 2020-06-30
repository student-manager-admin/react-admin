import React, { useState, useEffect } from 'react'
import { Form, Input, Modal ,Button,Select, Slider} from 'antd'
const {Option}=Select
export default (props) => {
    const [form] = Form.useForm()
    const handleOk = () => {
        const values=form.getFieldsValue()
        if(props.student){
            props.editStudent({...values,id:props.student.id})
        }else{
            props.addStudent(values)
        }
        form.resetFields()
        props.handleVisible(false)
    }
    const onGenderChange = value => {
        form.setFieldsValue({ gender: value })
    }
    useEffect(() => {
        if(props.student===null){
            form.resetFields()
        }else{
            form.setFieldsValue(props.student)
        }
    }, [props.student])
    return (
        <Modal
            visible={props.visible}
            handleVisible={props.handleVisible}
            onOk={handleOk}
            onCancel={() => props.handleVisible(false)}
        >
            <Form
                form={form}
            >
                <Form.Item
                
                    label='名字'
                    name='name'
                >
                    <Input type="text" placeholder='请输入姓名' />
                </Form.Item>
                <Form.Item
                    label='年龄'
                    name='age'
                >
                    <Input type="text" placeholder='请输入年龄'/>
                </Form.Item>
                <Form.Item
                    label='性别'
                    name='gender'
                    initialValue={0}
                >
                   <Select defaultValue={0} onChange={onGenderChange}>
                       <Option value={0}>男</Option>
                       <Option value={1}>女</Option>
                   </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
}