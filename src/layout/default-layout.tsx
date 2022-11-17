/*
 * @Author       : 徐洋皓月
 * @Date         : 2022-11-12 21:13:04
 * @LastEditors  : 徐洋皓月
 * @LastEditTime : 2022-11-15 01:52:42
 * @FilePath     : /chat-webpack/src/layout/default-layout.tsx
 */
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { TabBar, Toast } from 'antd-mobile'
import { MessageOutline, MessageFill, UserOutline, TeamOutline } from 'antd-mobile-icons'
import '@/assets/default-layout.less'

export default function DefaultLayout () {
  const tabs = [
    {
      key: '/message',
      title: '消息',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
    },
    {
      key: '/all-people',
      title: '所有人',
      icon: <TeamOutline />,
    },
    {
      key: '/personal-center',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const navigate = useNavigate();
  const location = useLocation()

  const handleChange = (key: string) => {
    if (key === '/personal-center') {
      Toast.show({
        content: '开发中',
      })
      return
    }
    navigate(key)
  }

  return (
    <div className='default-layout'>
      <div className='main'>
        <Outlet />
      </div>
      <div className='footer'>
        <TabBar activeKey={location.pathname} onChange={handleChange}>
          {
            tabs.map(item => (
              <TabBar.Item
                key={item.key}
                icon={item.icon}
                title={item.title}
              />
            ))
          }
        </TabBar>
      </div>
    </div>
  )
}