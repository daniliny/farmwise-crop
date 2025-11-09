'use client'

import { useState, useEffect, useCallback } from 'react'
import { Send, Volume2, Loader2, Sparkles, MessageSquare, User } from 'lucide-react'

interface Post {
  id: string
  author: string
  content: string
  summary?: string
  timestamp: Date
  type: 'update' | 'advice' | 'soil' | 'crop' | 'question'
}

export default function CommunityFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [newPost, setNewPost] = useState('')
  const [postType, setPostType] = useState<Post['type']>('update')
  const [loading, setLoading] = useState(false)
  const [summarizing, setSummarizing] = useState<string | null>(null)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  // Example: Call Gemini API to summarize text
  const summarizeWithGemini = useCallback(async (text: string): Promise<string> => {
    try {
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to summarize')
      }

      const data = await response.json()
      return data.summary || 'Unable to generate summary'
    } catch (error) {
      console.error('Gemini API error:', error)
      // Fallback: return a simple summary
      return text.length > 100 ? text.substring(0, 100) + '...' : text
    }
  }, [])

  // Example: Call Dedalus API for AI-powered advice
  const getAIAdvice = useCallback(async (input: string): Promise<string> => {
    try {
      const response = await fetch('/api/dedalus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: input,
          model: 'openai/gpt-5-mini',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI advice')
      }

      const data = await response.json()
      return data.final_output || data.text || 'Unable to generate advice'
    } catch (error) {
      console.error('Dedalus API error:', error)
      return 'AI advice temporarily unavailable'
    }
  }, [])

  // Example: Call ElevenLabs API for text-to-speech
  const speakWithElevenLabs = useCallback(async (text: string, postId: string) => {
    setPlayingAudio(postId)
    try {
      const response = await fetch('/api/elevenlabs-tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice_id: '21m00Tcm4TlvDq8ikWAM', // Rachel voice
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        // Fallback to Web Speech API
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(text)
          window.speechSynthesis.speak(utterance)
          utterance.onend = () => setPlayingAudio(null)
        }
        return
      }

      // Get audio blob
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      const audio = new Audio(audioUrl)

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl)
        setPlayingAudio(null)
      }

      audio.onerror = () => {
        setPlayingAudio(null)
      }

      await audio.play()
    } catch (error) {
      console.error('ElevenLabs API error:', error)
      // Fallback to Web Speech API
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(utterance)
        utterance.onend = () => setPlayingAudio(null)
      } else {
        setPlayingAudio(null)
      }
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPost.trim()) return

    setLoading(true)
    const postId = Date.now().toString()

    // Create post immediately
    const post: Post = {
      id: postId,
      author: 'You',
      content: newPost,
      timestamp: new Date(),
      type: postType,
    }

    setPosts(prev => [post, ...prev])
    setNewPost('')
    setLoading(false)

    // Generate summary with Gemini in background
    setSummarizing(postId)
    try {
      const summary = await summarizeWithGemini(newPost)
      setPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, summary } : p))
      )
    } catch (error) {
      console.error('Failed to generate summary:', error)
    } finally {
      setSummarizing(null)
    }

    // If it's a question, also get AI advice from Dedalus
    if (postType === 'question') {
      try {
        const advice = await getAIAdvice(newPost)
        setPosts(prev =>
          prev.map(p =>
            p.id === postId ? { ...p, summary: advice } : p
          )
        )
      } catch (error) {
        console.error('Failed to get AI advice:', error)
      }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="h-6 w-6 text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Community Feed</h2>
      </div>

      {/* Post Form */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Post Type
          </label>
          <select
            value={postType}
            onChange={(e) => setPostType(e.target.value as Post['type'])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="update">Update</option>
            <option value="advice">Advice</option>
            <option value="soil">Soil Info</option>
            <option value="crop">Crop Info</option>
            <option value="question">Question</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Post
          </label>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share an update, ask a question, or provide advice..."
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 resize-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || !newPost.trim()}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Posting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Post
            </>
          )}
        </button>
      </form>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No posts yet. Be the first to share!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="font-semibold text-gray-800">{post.author}</span>
                  <span className="text-xs text-gray-500">
                    {post.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {post.type}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 mb-3 whitespace-pre-wrap">{post.content}</p>

              {/* AI Summary (from Gemini) */}
              {summarizing === post.id ? (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating summary...</span>
                </div>
              ) : post.summary ? (
                <div className="bg-green-50 border-l-4 border-green-500 p-3 mb-2 rounded">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">
                      AI Summary
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{post.summary}</p>
                </div>
              ) : null}

              {/* Audio Playback Button */}
              <button
                onClick={() => {
                  const textToSpeak = post.summary || post.content
                  speakWithElevenLabs(textToSpeak, post.id)
                }}
                disabled={playingAudio === post.id}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 disabled:opacity-50"
              >
                {playingAudio === post.id ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Playing...
                  </>
                ) : (
                  <>
                    <Volume2 className="h-4 w-4" />
                    Listen
                  </>
                )}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

