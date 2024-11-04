import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MessageUser {
  id: number
  name: string
  avatar: string
}

export interface Message {
  id: number
  user: MessageUser
  lastMessage: string
  time: string
  unread: number
}

interface MessageState {
  messages: Message[]
  loading: boolean
  error: string | null
}

const initialState: MessageState = {
  messages: [
    {
      id: 1,
      user: {
        id: 1,
        name: "东京导游小王",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&q=80"
      },
      lastMessage: "好的，我已经帮您预约了明天下午3点的和服体验，记得准时到哦！",
      time: "12:30",
      unread: 2
    },
    {
      id: 2,
      user: {
        id: 2,
        name: "京都民宿房东",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&q=80"
      },
      lastMessage: "您好，我是京都和风民宿的房东，请问您什么时候到达呢？",
      time: "昨天",
      unread: 1
    }
  ],
  loading: false,
  error: null
}

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload
    },
    markAsRead: (state, action: PayloadAction<number>) => {
      const message = state.messages.find(msg => msg.id === action.payload)
      if (message) {
        message.unread = 0
      }
    }
  }
})

export const { setLoading, setError, setMessages, markAsRead } = messageSlice.actions
export default messageSlice.reducer