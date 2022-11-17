/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-14 23:23:42
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-17 20:47:35
 * @FilePath     : /chat-webpack/src/pages/chat-room/index.tsx
 */
import { useEffect } from "react";
import { cloneDeep } from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@/store";
import { MESSAGE_ADD_USER, MESSAGE_UPDATE_USER } from '@/store/actions';
import { NavBar } from 'antd-mobile'
import MessagePanel from "./message-panel";
import api from "@/api";
import './index.less'


export default function ChatRoom () {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const params = useParams()
  const otherUser = useAppSelector(state => state.message.data[params.userID as string])

  useEffect(() => {
    // 加载历史聊天记录
    if (otherUser === void 0) {
      api.getUser(params.userID as string)
      .then(({statusCode, data}) => {
        if (statusCode === 200) {
          if (data) {
            dispatch(MESSAGE_ADD_USER(data))
          } else {
            navigate('/all-people')
          }
        }
      })
    }
  }, [])

  useEffect(() => {
    if (otherUser && otherUser.notify?.num) {
      const cloneOtherUser = cloneDeep(otherUser)
      cloneOtherUser.notify = {
        num: 0
      }

      dispatch(MESSAGE_UPDATE_USER(cloneOtherUser))
    }
  }, [otherUser])

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="chat-room">
      <div className="header">
        <NavBar onBack={handleBack}>
          <div>
            <div>{otherUser?.username}</div>
          </div>
        </NavBar>
      </div>
      <div className="main">
        <MessagePanel
          otherUser={otherUser}
        />
      </div>
    </div>
  )
}