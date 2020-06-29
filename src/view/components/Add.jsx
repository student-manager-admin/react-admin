import React, { useState } from 'react'
import { Form, Input, Modal ,Button} from 'antd'
export default (props) => {
    const [form] = Form.useForm()
    const handleOk = () => {
        props.addStudent(form.getFieldsValue())
        props.handleVisible(false)
    }
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
                    <Input type="text" />
                </Form.Item>
                <Form.Item
                    label='年龄'
                    name='age'

                >
                    <Input type="text" />
                </Form.Item>
            </Form>
        </Modal>
    )
}