// Trợ lý AI nổi ở góc phải dưới: gợi ý phim + hướng dẫn đặt vé.
// Luồng:
//   Bấm nút tròn -> mở khung chat. Chưa đăng nhập -> mời đăng nhập (BE bắt buộc login).
//   Gửi câu hỏi -> POST /chat { messages: lịch sử } -> BE ghép danh sách phim vào prompt, gọi Gemini
//   -> nhận { reply, movies } -> hiện câu trả lời + thẻ phim bấm được (sang /movies/:id).
// Lịch sử chat nằm trong state; ChatBox đặt ngoài <Routes> nên đổi trang không bị mất.
import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import chatApi from '../api/chatApi'
import { getErrorMessage } from '../api/axiosClient'
import { useAuth } from '../auth/AuthContext'
import { Icon } from '../ds'
import { AGE_RATING, formatDuration } from '../utils/format'

const QUICK_QUESTIONS = [
  'Gợi ý phim hành động đang chiếu',
  'Phim nào hợp đi cùng trẻ nhỏ?',
  'Tối nay xem phim gì hay?',
  'Cách đặt vé thế nào?',
]
const MAX_LENGTH = 1000

// hidden: ẩn giao diện (luồng đặt vé, khu admin) nhưng vẫn giữ component để không mất đoạn chat
export default function ChatBox({ hidden = false }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([]) // [{ role, content, movies? }] - không gồm lời chào
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)

  // Đổi tài khoản / đăng xuất -> xóa đoạn chat cũ
  useEffect(() => {
    setMessages([])
    setError('')
  }, [user?.userId])

  // Có tin mới -> cuộn xuống cuối
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading, open])

  async function send(text) {
    const content = text.trim()
    if (!content || loading) return
    const next = [...messages, { role: 'user', content }]
    setMessages(next)
    setInput('')
    setError('')
    setLoading(true)
    try {
      // Chỉ gửi role + content (bỏ movies) cho BE
      const res = await chatApi.send(next.map(({ role, content }) => ({ role, content })))
      setMessages([...next, { role: 'assistant', content: res.reply, movies: res.movies }])
    } catch (err) {
      setError(getErrorMessage(err))
      // Bỏ câu hỏi vừa lỗi khỏi lịch sử để lần sau gửi lại không bị lặp; trả chữ về ô nhập
      setMessages(messages)
      setInput(content)
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    send(input)
  }

  function openMovie(id) {
    navigate(`/movies/${id}`)
    if (window.innerWidth < 720) setOpen(false) // màn hình nhỏ: đóng khung để thấy trang phim
  }

  if (hidden) return null

  return (
    <>
      {open && (
        <section className="chat-panel" role="dialog" aria-label="Trợ lý MovieGo">
          <header className="chat-head">
            <span className="chat-avatar"><Icon name="sparkles" size={18} /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="chat-title">MovieGo Bot</div>
              <div className="chat-sub">Gợi ý phim · hướng dẫn đặt vé</div>
            </div>
            {messages.length > 0 && (
              <button type="button" className="chat-icon-btn" title="Cuộc trò chuyện mới" aria-label="Cuộc trò chuyện mới"
                onClick={() => { setMessages([]); setError('') }}>
                <Icon name="rotate-ccw" size={16} />
              </button>
            )}
            <button type="button" className="chat-icon-btn" aria-label="Đóng" onClick={() => setOpen(false)}>
              <Icon name="x" size={18} />
            </button>
          </header>

          {!user ? (
            <div className="chat-login">
              <Icon name="lock" size={22} />
              <p>Đăng nhập để trò chuyện với trợ lý MovieGo.</p>
              <button type="button" className="chat-primary"
                onClick={() => { setOpen(false); navigate('/login', { state: { from: pathname } }) }}>
                Đăng nhập
              </button>
            </div>
          ) : (
            <>
              <div className="chat-list" ref={listRef}>
                <div className="chat-msg bot">
                  Chào <b>{user.username}</b>! Mình là MovieGo Bot. Bạn thích thể loại gì, đi xem với ai?
                  Mình sẽ gợi ý phim hợp gu, hoặc chỉ bạn cách đặt vé.
                </div>
                {messages.length === 0 && (
                  <div className="chat-quick">
                    {QUICK_QUESTIONS.map((q) => (
                      <button key={q} type="button" onClick={() => send(q)}>{q}</button>
                    ))}
                  </div>
                )}

                {messages.map((m, i) => (
                  <div key={i} className={'chat-row ' + (m.role === 'user' ? 'me' : 'bot')}>
                    <div className={'chat-msg ' + (m.role === 'user' ? 'me' : 'bot')}>{m.content}</div>
                    {m.movies?.length > 0 && (
                      <div className="chat-movies">
                        {m.movies.map((mv) => (
                          <button key={mv.id} type="button" className="chat-movie" onClick={() => openMovie(mv.id)}>
                            {mv.posterUrl
                              ? <img src={mv.posterUrl} alt="" loading="lazy" />
                              : <span className="chat-movie-noimg"><Icon name="film" size={18} /></span>}
                            <span className="chat-movie-info">
                              <b>{mv.title}</b>
                              <span>{[mv.genre?.split(',')[0], formatDuration(mv.durationMinutes), AGE_RATING[mv.ageRating]].filter(Boolean).join(' · ')}</span>
                              <span className="chat-movie-meta">
                                {mv.rating != null && <><Icon name="star" size={12} color="var(--rating)" />{mv.rating.toFixed(1)}</>}
                                {mv.status === 'COMING_SOON' && <em>Sắp chiếu</em>}
                              </span>
                            </span>
                            <Icon name="chevron-right" size={16} />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {loading && <div className="chat-msg bot chat-typing"><span /><span /><span /></div>}
                {error && <div className="chat-error">{error}</div>}
              </div>

              <form className="chat-input" onSubmit={handleSubmit}>
                <textarea
                  rows={1}
                  value={input}
                  maxLength={MAX_LENGTH}
                  placeholder="Hỏi về phim, suất chiếu, cách đặt vé..."
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    // Enter = gửi, Shift+Enter = xuống dòng
                    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input) }
                  }}
                />
                <button type="submit" className="chat-send" disabled={loading || !input.trim()} aria-label="Gửi">
                  <Icon name="send" size={18} />
                </button>
              </form>
            </>
          )}
        </section>
      )}

      <button type="button" className={'chat-fab' + (open ? ' on' : '')} aria-label={open ? 'Đóng trợ lý' : 'Mở trợ lý AI'}
        onClick={() => setOpen(!open)}>
        <Icon name={open ? 'x' : 'message-circle'} size={24} />
      </button>
    </>
  )
}
