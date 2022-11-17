/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-13 19:26:27
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:49:36
 * @FilePath     : /chat-webpack/src/pages/message/nav-bar-left.tsx
 */
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'
import { Dialog, Input, Toast } from 'antd-mobile'
import { ChatAvatar } from '@/components'
import socket from '@/socket'
import * as constants from '@/socket/constants'
import api from '@/api'
import { USER_SET } from '@/store/actions'
import './nav-bar-left.less'

export default function NavBarLeft () {
  const user = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const [visible, setVisible] = useState(false)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(user.username || '')
  }, [user.username])

  const handleAction = async (action: any) => {
    if (action.key === 'ok') {
      const { statusCode, data } = await api.postUpdateUser({...user, username})
      if (statusCode === 200) {
        Toast.show({
          icon: 'success',
          content: '保存成功',
        })
        dispatch(USER_SET(data))
        setVisible(false)
        socket.emit(constants.REFRESH, constants.ALL_PEOPLE)
      } else {
        Toast.show({
          icon: 'fail',
          content: '保存失败',
        })
      }
      return
    }
    setVisible(false)
    setUsername(user.username || '')
  }

  return (
    <div className='nav-bar-left'>
      <ChatAvatar
        text={user.username}
      />
      <span onClick={() => setVisible(true)}>{user.username}</span>
      <Dialog
        bodyClassName='nav-bar-left-dialog'
        visible={visible}
        content={<Input value={username} onChange={value => setUsername(value)}/>}
        actions={[
          [
            {
              key: 'cancel',
              text: '取消',
              danger: true
            },
            {
              key: 'ok',
              text: '确定',
            }
          ]
        ]}
        onAction={handleAction}
      />
    </div>
  )
}
