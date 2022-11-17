/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 22:29:12
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-14 22:56:39
 * @FilePath     : /chat-webpack/src/components/chat-avatar/index.tsx
 */
import React from 'react'
import { Avatar, AvatarProps } from 'antd-mobile'
import './index.less'

export default function ChatAvatar ({ src = '', size = '3rem', text = '', background = ''}) {
  const avatarProps: AvatarProps = {
    src,
    style: { 
      '--size': size,
      '--border-radius': size
    }
  }

  if (text !== '') {
    const style: React.CSSProperties = {}
    if (background !== '') style.background = background
    avatarProps.fallback = (
      <div className='chat-avatar-text' style={style}>
        {text[0]}
      </div>
    )
  }

  return (
    <Avatar
      className='chat-avatar'
      {...avatarProps}
    />
  )
}