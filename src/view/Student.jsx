import React, { useState, useEffect } from 'react'
import { useAntdTable } from 'ahooks';
import { Table, Form, Input, Button,Select } from 'antd'
import Add from './components/Add'
const {Option}=Select

export default () => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const [student,setStudent]=useState({})
  const handleVisible = (boolean) => {
    setVisible(boolean)
  }
  const getStudentById = (id) => {
    const arr = JSON.parse(localStorage.list)
    const data = arr.filter(item => item.id === id)[0]
    return data
  }
  const handleEdit = (id) => {
    const data = getStudentById(id)
    setStudent(data)
    setVisible(true)
  }
  //查
  const getList = (page, value) => {
    console.log(page, value)
    if (!localStorage.list) {
      localStorage.list = JSON.stringify([{ id: 1, name: 'lwp', age: 24,gender:0 }])
    }
    return new Promise(async (resolve) => {
      let res = JSON.parse(localStorage.list)
      if (value.name) {
        res = res.filter(item => item.name === value.name)
      }
      if(value.gender!==undefined){
        res = res.filter(item =>{
          return item.gender === value.gender})
      }
      await sleep(500)
      resolve({ list: res })
    })
  }
  const { search, tableProps,refresh } = useAntdTable(getList, {
    form
  })
  const tailLayout = {
    wrapperCol: { span: 2 },
  };
  const { submit } = search;
  
  //增
  const addStudent = (obj) => {
    const arr = JSON.parse(localStorage.list)
    let id=0
    arr.forEach(item=>{
      if(item.id>id) id=item.id
    })
    arr.push({...obj,id:id+1})
    localStorage.list = JSON.stringify(arr)
    refresh()
  }
  //改
  const editStudent = value => {
    let arr = JSON.parse(localStorage.list)
    arr=arr.map(item=>{
      if(item.id===value.id){
        item=value
      }
      return item
    })
    localStorage.list = JSON.stringify(arr)
    refresh()
  }
  //删
  const handleDelete = (id) => {
    console.log(id)
    let arr = JSON.parse(localStorage.list)
    arr=arr.filter(item=>item.id!=id)
    localStorage.list = JSON.stringify(arr)
    refresh()
  }
  const add = () => {
    setStudent(null)
    setVisible(true)
  }
  const sleep = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    })
  }
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      render:(text)=><div>{text===0?'男':'女'}</div>
    },
    {
      title:'操作',
      render:(row)=>
        <div>
          <a onClick={()=>handleEdit(row.id)}>编辑</a>
          <span style={{margin:'0 10px'}}>|</span>
          <a onClick={()=>handleDelete(row.id)}>删除</a>
        </div>
    }
  ];

  const searchForm = (
    <Form
      form={form}
      layout="inline"
      style={{ marginBottom: 20 }}
    >
      <Form.Item
        {...tailLayout}
        label="名字"
        name="name"
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item
        {...tailLayout}
        label="性别"
        name="gender"
      >
        <Select style={{width:100}} placeholder='全部' allowClear>
                       <Option value={0}>男</Option>
                       <Option value={1}>女</Option>
                   </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={submit} >
          查询
    </Button>
      </Form.Item>
    </Form>
  )
  return (<div>
    <Add
      visible={visible} 
      handleVisible={handleVisible}
      student={student}
     addStudent={addStudent}
     editStudent={editStudent}
     add={add}
      />
    {searchForm}
    <Button type='primary' style={{ marginBottom: 20 }}
      onClick={add}
    >新增</Button>
    <Table columns={columns} 
    bordered
    rowKey='id'
     {...tableProps}
      />
  </div>)
}
