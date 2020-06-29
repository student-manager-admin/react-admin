import React, { useState, useEffect } from 'react'
import { useAntdTable } from 'ahooks';
import { Table, Form, Input, Button } from 'antd'
import Add from './components/Add'
export default () => {
  const [form] = Form.useForm()
  const [visible, setVisible] = useState(false)
  const handleVisible = (boolean) => {
    setVisible(boolean)
  }
  const { search, tableProps,refresh } = useAntdTable(getList, {
    form
  })
  const tailLayout = {
    wrapperCol: { span: 2 },
  };
  const { submit } = search;
  //查
  function getList(page, values) {
    console.log(page, values)
    if (!localStorage.list) {
      localStorage.list = JSON.stringify([{ id: 1, name: 'lwp', age: 24 }])
    }
    return new Promise(async (resolve) => {
      let res = JSON.parse(localStorage.list)
      if (values.name) {
        res = res.filter(item => item.name === values.name)
      }
      await sleep(500)
      resolve({ list: res })
    })
  }
  //增
  const addStudent =async (obj) => {
    const arr = JSON.parse(localStorage.list)
    let id=0
    arr.forEach(item=>{
      if(item.id>id) id=item.id
    })
    arr.push({...obj,id:id+1})
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
      title:'操作',
      render:(row)=>
        <div>
          <a>编辑</a>
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
        style={{ float: 'right' }}
      >
        <Input style={{ width: 200 }} />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={submit} >
          查询
    </Button>
      </Form.Item>
    </Form>
  )
  return (<div>
    <Add visible={visible} handleVisible={handleVisible}
     addStudent={addStudent}
     add={add}
      />
    {searchForm}
    <Button type='primary' style={{ marginBottom: 20 }}
      onClick={add}
    >新增</Button>
    <Table columns={columns} 
    
    rowKey='id'
     {...tableProps}
      />
  </div>)
}

