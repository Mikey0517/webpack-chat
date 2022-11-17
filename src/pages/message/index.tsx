/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-13 03:23:40
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:36:21
 * @FilePath     : /chat-webpack/src/pages/message/index.tsx
 */
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import { NavBar, List, Badge } from 'antd-mobile'
import { ChatAvatar } from '@/components'
import NavBarLeft from './nav-bar-left'
import { cloneDeep } from "lodash";
import { User } from "@/index";
import './index.less'

export default function Message () {
  const friends = useAppSelector(state => state.message)

  const navigate = useNavigate();

  const handleOpenChat = (user: User) => {
    navigate(`/chat-room/${user.userID}`)
  }

  return (
    <div className="message">
      <div className="header">
        <NavBar back={null} left={<NavBarLeft />}>
          <div>
            <div>消息</div>
          </div>
        </NavBar>
      </div>
      <div className='main'>
        <List>
          {
            friends.sort.map(userID => {
              const friend = friends.data[userID]
              return (
                <Badge key={friend.username} content={friend.notify?.num || null} style={{'--right': '10%', '--top': '50%'}} wrapperStyle={{width: '100%'}}>
                  <List.Item
                    prefix={
                      <ChatAvatar
                        size='4rem'
                        text={friend.username}
                      />
                    }
                    description={cloneDeep(friend.messages)?.pop()?.content}
                    arrow={false}
                    onClick={handleOpenChat.bind(null,friend)}
                  >
                    {friend.username}
                  </List.Item>
                </Badge>
              )
            })
          }
        </List>
      </div>
    </div>
  )
}