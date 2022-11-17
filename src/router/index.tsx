/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-10 23:15:02
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-16 19:27:57
 * @FilePath     : /chat-webpack/src/router/index.tsx
 */
import { Routes, Route } from "react-router-dom";
import Redirect from "@/router/redirect";
import { DefaultLayout } from '@/layout'
import Message from '@/pages/message'
import ChatRoom from "@/pages/chat-room";
import AllPeople from "@/pages/all-people";

export default function () {
  return (
    <Routes>
      <Route path="/chat-room/:userID" element={<ChatRoom />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Redirect to="/message"/>} />
        <Route path="/message" element={<Message />} />
        <Route path="/all-people" element={<AllPeople />} />
      </Route>
    </Routes>
  )
}