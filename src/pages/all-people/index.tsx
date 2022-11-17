/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-15 00:30:08
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 18:41:18
 * @FilePath     : /chat-webpack/src/pages/all-people/index.tsx
 */
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/store";
import { NavBar, List, PullToRefresh } from 'antd-mobile'
import { ChatAvatar } from '@/components'
import socket from "@/socket";
import * as constants from '@/socket/constants'
import { User } from '@/index';
import './index.less'


export default function AllPeople () {
  const navigate = useNavigate();
  const allPeople = useAppSelector(state => state.allPeople)
  const currentUser = useAppSelector(state => state.user)

  const handleOpenChat = (user: User) => {
    navigate(`/chat-room/${user.userID}`)
  }

  const handleRefresh = async () => {
    socket.emit(constants.REFRESH, constants.ALL_PEOPLE)
  }

  return (
    <div className="all-people">
      <div className="header">
        <NavBar back={null}>
          <div>
            <div>所有人</div>
          </div>
        </NavBar>
      </div>
      <div className='main'>
        <PullToRefresh onRefresh={handleRefresh}>
          <List>
            {
              allPeople.sort.map(userID => {
                const user = allPeople.data[userID]
                return (
                  <List.Item
                    key={userID}
                    prefix={
                      <ChatAvatar
                        size='4rem'
                        text={user.username}
                      />
                    }
                    arrow={false}
                    onClick={handleOpenChat.bind(null,user)}
                  >
                    {user.username}
                    {user.userID === currentUser.userID ? '(自己)' : ''}
                  </List.Item>
                )
              })
            }
          </List>
        </PullToRefresh>
      </div>
    </div>
  )
}