"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"

export default function BackgroundRemoverPreview() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [isDragOver, setIsDragOver] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [flashMessages, setFlashMessages] = useState<Array<{ id: number; message: string; type: string }>>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Handle mouse movement for particle effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const showFlashMessage = (message: string, type = "info") => {
    const id = Date.now()
    setFlashMessages((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setFlashMessages((prev) => prev.filter((msg) => msg.id !== id))
    }, 5000)
  }

  const handleFileSelect = (file: File) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"]
    if (!allowedTypes.includes(file.type)) {
      showFlashMessage("Please select a valid image file (PNG, JPG, JPEG)", "danger")
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      showFlashMessage("File size must be less than 10MB", "danger")
      return
    }

    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) {
      showFlashMessage("Please select an image file", "danger")
      return
    }

    setIsLoading(true)
    // Simulate processing
    setTimeout(() => {
      setIsLoading(false)
      showFlashMessage("Background removed successfully! Download started.", "success")
    }, 3000)
  }

  const clearPreview = () => {
    setSelectedFile(null)
    setPreviewUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="stars absolute inset-0"></div>
        <div className="stars2 absolute inset-0"></div>
        <div className="stars3 absolute inset-0"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="particle absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${10 + i * 20}%`,
              animation: `floatParticle ${12 + i * 2}s infinite linear`,
              animationDelay: `${i * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <header className="text-center py-20">
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-green-400 bg-clip-text text-transparent animate-pulse">
              AI Background
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">Remover</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your images with the power of artificial intelligence. Remove backgrounds instantly with precision
            and magic.
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              { icon: "⚡", text: "Lightning Fast" },
              { icon: "🎯", text: "Pixel Perfect" },
              { icon: "🚀", text: "AI Powered" },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-cyan-400 font-semibold">
                <span className="text-2xl animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                  {feature.icon}
                </span>
                {feature.text}
              </div>
            ))}
          </div>
        </header>

        {/* Flash Messages */}
        {flashMessages.length > 0 && (
          <div className="mb-8 space-y-3">
            {flashMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border animate-slide-down ${
                  msg.type === "danger"
                    ? "bg-red-500/10 border-red-500/30 text-red-300"
                    : msg.type === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-300"
                      : "bg-blue-500/10 border-blue-500/30 text-blue-300"
                }`}
              >
                <span className="text-xl">{msg.type === "danger" ? "⚠️" : msg.type === "success" ? "✅" : "ℹ️"}</span>
                {msg.message}
                <button
                  onClick={() => setFlashMessages((prev) => prev.filter((m) => m.id !== msg.id))}
                  className="ml-auto text-2xl opacity-70 hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Upload Section */}
        <section className="mb-20">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-cyan-400 mb-4 font-mono">Upload Your Image</h2>
              <p className="text-gray-300 text-lg">Drag & drop or click to select your image</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {!selectedFile ? (
                <div
                  className={`border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-300 ${
                    isDragOver
                      ? "border-cyan-400 bg-cyan-400/10 scale-105"
                      : "border-cyan-400/30 hover:border-cyan-400/60 hover:bg-cyan-400/5"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-6">
                    <div className="w-20 h-20 mx-auto text-cyan-400 animate-float">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-full h-full"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7,10 12,15 17,10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-white">Drop your image here</h3>
                    <p className="text-gray-300">
                      or <span className="text-cyan-400 underline">browse files</span>
                    </p>
                    <div className="flex justify-center gap-4">
                      {["PNG", "JPG", "JPEG"].map((type) => (
                        <span
                          key={type}
                          className="bg-cyan-400/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="text-center p-8 bg-white/5 rounded-xl">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="max-w-xs max-h-64 mx-auto rounded-lg shadow-lg mb-4"
                  />
                  <p className="text-white mb-4 font-medium">{selectedFile.name}</p>
                  <button
                    type="button"
                    onClick={clearPreview}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Change File
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={!selectedFile || isLoading}
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-6 px-8 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <span>Remove Background</span>
                    <span className="text-2xl">🚀</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        {/* Features Section */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold text-cyan-400 mb-16 font-mono">Why Choose Our AI Background Remover?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🤖",
                title: "Advanced AI Technology",
                desc: "Powered by cutting-edge machine learning algorithms for precise background detection and removal.",
              },
              {
                icon: "⚡",
                title: "Lightning Fast Processing",
                desc: "Get your processed images in seconds, not minutes. Our optimized pipeline ensures rapid results.",
              },
              {
                icon: "🎨",
                title: "Professional Quality",
                desc: "Achieve studio-quality results with clean edges and perfect transparency for all your projects.",
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                desc: "Your images are processed securely and never stored. Complete privacy guaranteed.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="text-5xl mb-6 group-hover:animate-bounce">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .stars {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="0.5" fill="white" opacity="0.8"/><circle cx="80" cy="40" r="0.3" fill="white" opacity="0.6"/><circle cx="40" cy="80" r="0.4" fill="white" opacity="0.7"/><circle cx="90" cy="10" r="0.2" fill="white" opacity="0.5"/><circle cx="10" cy="90" r="0.3" fill="white" opacity="0.6"/></svg>') repeat;
          animation: moveStars 50s linear infinite;
        }
        
        .stars2 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="30" cy="30" r="0.3" fill="cyan" opacity="0.4"/><circle cx="70" cy="70" r="0.2" fill="cyan" opacity="0.3"/><circle cx="50" cy="10" r="0.4" fill="cyan" opacity="0.5"/></svg>') repeat;
          animation: moveStars 100s linear infinite;
        }
        
        .stars3 {
          background: transparent url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="60" cy="60" r="0.2" fill="purple" opacity="0.3"/><circle cx="20" cy="80" r="0.3" fill="purple" opacity="0.4"/></svg>') repeat;
          animation: moveStars 75s linear infinite;
        }
        
        @keyframes moveStars {
          from { transform: translateY(0px); }
          to { transform: translateY(-100vh); }
        }
        
        @keyframes floatParticle {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        
        @keyframes animate-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: animate-float 3s ease-in-out infinite;
        }
        
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
      `}</style>
    </div>
  )
}
