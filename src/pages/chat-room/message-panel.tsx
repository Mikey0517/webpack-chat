/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-16 22:13:06
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 21:28:40
 * @FilePath     : /chat-webpack/src/pages/chat-room/message-panel.tsx
 */
import { useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { Input, InputRef, Toast } from 'antd-mobile'
import { SmileOutline } from 'antd-mobile-icons'
import { ChatAvatar } from "@/components";
import { Message } from "@/index";
import { MESSAGE_PUSH } from '@/store/actions';
import socket from "@/socket";
import * as constants from '@/socket/constants'
import { User } from "@/index"
import './message-panel.less'

type Props = {
  otherUser: User
}

export default function MessagePanel (props: Props) {
  const dispatch = useAppDispatch()
  const inputRef = useRef<InputRef>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const currentUser = useAppSelector(state => state.user)
  const otherUser = props.otherUser || {}
  const messages = otherUser.messages || []

  useEffect(() => {
    handleScroll()
  }, [messages])

  const handleEnterPress = (data: React.KeyboardEvent<HTMLInputElement>) => {
    if ((data.target as any).value !== '') {
      const message: Message = {
        to: otherUser.userID,
        content: (data.target as any).value
      }
      socket.emit(constants.PRIVATE_MESSAGE, message);
      dispatch(MESSAGE_PUSH(message))
      inputRef.current && inputRef.current.clear()
      handleScroll()
    } else {
      Toast.show({
        content: '无法发送空消息'
      })
    }
  }

  const handleScroll = () => {
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
    }, 300)
  }

  return (
    <div className="message-panel">
      <div className="wrap">
        <div className="main">
          <div className="scroll-warp" ref={scrollRef}>
            {
              messages.map((message, index) => {
                let user = currentUser as User
                let className = 'self'
                if (message.to === currentUser.userID) {
                  user = otherUser
                  className = ''
                }
                return (
                  <div
                    className={`message-item ${className}`}
                    key={index}
                  >
                    <ChatAvatar
                      text={user.username}
                      size='4rem'
                    />
                    <div className="content">{message.content}</div>
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="footer" onClick={handleScroll}>
          <Input
            ref={inputRef}
            onEnterPress={handleEnterPress}
          />
          <SmileOutline fontSize={'2.5rem'} />
        </div>
      </div>
    </div>
  )
}