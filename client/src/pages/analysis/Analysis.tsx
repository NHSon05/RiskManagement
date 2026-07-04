import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useGetProjectsByUserId } from '@/hooks/useProject';
import { useGenerateObjectives, useGenerateAssessments, useGenerateSolutions } from '@/hooks/useAI';
import { usePestel } from '@/hooks/usePestel';
import { useSwot } from '@/hooks/useSwot';
import { 
  Sparkles, Send, Loader2, Bot, User, Folder, Search, ArrowRight,
  Shield, CheckCircle2
} from 'lucide-react';
import { PageTransition } from '@/components/animated';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function Analysis() {
  const { profile } = useAuth();
  const user = profile.data?.data;
  const { data: projects = [], isPending: isProjectsPending } = useGetProjectsByUserId(Number(user?.id || 0));

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Xin chào! Tôi là AI trợ lý phân tích rủi ro.\n\nHãy chọn một dự án ở danh sách bên trái để tôi bắt đầu phân tích dữ liệu PESTEL, SWOT và đưa ra các đề xuất tối ưu cho bạn.' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Queries for project PESTEL/SWOT
  const { pestelQuery } = usePestel(Number(selectedProjectId || 0));
  const { swotQuery } = useSwot(Number(selectedProjectId || 0));

  // AI Mutations
  const generateObjectives = useGenerateObjectives();
  const generateAssessments = useGenerateAssessments();
  const generateSolutions = useGenerateSolutions();

  const isPending = generateObjectives.isPending || generateAssessments.isPending || generateSolutions.isPending;

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isPending]);

  // Filter projects by search query
  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPestelString = (): string => {
    if (!pestelQuery.data?.data) return "Chưa thiết lập";
    const data = pestelQuery.data.data;
    return Object.entries(data)
      .filter(([key]) => key !== 'id')
      .map(([key, val]) => {
        try {
          const arr = typeof val === 'string' ? JSON.parse(val) : val;
          return `${key}: ${Array.isArray(arr) ? arr.join(', ') : val}`;
        } catch {
          return `${key}: ${val}`;
        }
      })
      .join('\n');
  };

  const getSwotString = (): string => {
    if (!swotQuery.data?.data) return "Chưa thiết lập";
    const data = swotQuery.data.data;
    return Object.entries(data)
      .filter(([key]) => key !== 'id')
      .map(([key, val]) => {
        try {
          const arr = typeof val === 'string' ? JSON.parse(val) : val;
          return `${key}: ${Array.isArray(arr) ? arr.join(', ') : val}`;
        } catch {
          return `${key}: ${val}`;
        }
      })
      .join('\n');
  };

  const handleSelectProject = (project: any) => {
    setSelectedProjectId(project.id);
    setSelectedProject(project);
    setMessages([
      {
        role: 'ai',
        content: `Tôi đã liên kết thành công với dự án **${project.name}**.\n\n` +
                 `**Thông tin dự án:**\n` +
                 `- Địa điểm: ${project.location || "Chưa xác định"}\n` +
                 `- Vốn đầu tư: ${project.capital || "Chưa xác định"}\n` +
                 `- Vai trò: ${project.role || "Thành viên"}\n` +
                 `- Cấp dự án: ${project.prjLevel || "Không rõ"}\n\n` +
                 `Bấm vào các nút gợi ý nhanh ở dưới để tôi nhận diện rủi ro, phân tích khả năng xảy ra, hoặc đưa ra các giải pháp kiểm soát theo chuẩn ISO 31000.`
      }
    ]);
  };

  const handleSuccess = (res: any) => {
    const data = res.data;
    let text = "";
    try {
      let rawText = typeof data === 'string' ? data : JSON.stringify(data);
      rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      const parsed = JSON.parse(rawText);
      text = JSON.stringify(parsed, null, 2);
    } catch {
      text = typeof data === 'string' 
        ? data.replace(/\\n/g, '\n').replace(/\\"/g, '"') 
        : JSON.stringify(data, null, 2);
    }
    setMessages(prev => [...prev, { role: 'ai', content: text }]);
  };

  const handleError = () => {
    setMessages(prev => [...prev, { role: 'ai', content: "Có lỗi xảy ra khi kết nối với AI. Bạn vui lòng kiểm tra lại cấu hình hoặc thử lại sau!" }]);
  };

  const handleQuickAction = (actionType: 'objectives' | 'assessments' | 'solutions') => {
    if (!selectedProject || isPending) return;

    let userPrompt = "";
    if (actionType === 'objectives') {
      userPrompt = "⚡ Phân tích bối cảnh dự án để nhận diện mục tiêu và rủi ro.";
      setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
      generateObjectives.mutate({
        prjName: selectedProject.name,
        prjLevel: selectedProject.prjLevel || "Trung bình",
        location: selectedProject.location || "Việt Nam",
        capital: selectedProject.capital || "Không rõ",
        pestelData: getPestelString(),
        swotData: getSwotString()
      }, { onSuccess: handleSuccess, onError: handleError });
    } else if (actionType === 'assessments') {
      userPrompt = "📊 Đánh giá khả năng xảy ra và tác động của rủi ro.";
      setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
      generateAssessments.mutate({
        objectiveName: "Đánh giá các rủi ro của dự án " + selectedProject.name
      }, { onSuccess: handleSuccess, onError: handleError });
    } else if (actionType === 'solutions') {
      userPrompt = "🛡️ Đề xuất giải pháp và kế hoạch giảm thiểu rủi ro.";
      setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
      generateSolutions.mutate({
        objectiveName: "Đề xuất giải pháp cho các rủi ro của dự án " + selectedProject.name
      }, { onSuccess: handleSuccess, onError: handleError });
    }
  };

  const handleSendMessage = () => {
    if (!input.trim() || isPending || !selectedProject) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');

    // Default to assessment mutation or generic AI flow based on keyword
    if (userMsg.toLowerCase().includes("giải pháp") || userMsg.toLowerCase().includes("khắc phục")) {
      generateSolutions.mutate({ objectiveName: userMsg }, { onSuccess: handleSuccess, onError: handleError });
    } else {
      generateAssessments.mutate({ objectiveName: userMsg }, { onSuccess: handleSuccess, onError: handleError });
    }
  };

  const formatMessageText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="font-bold text-neutral-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part.split('\n').map((line, lineIdx, arr) => (
        <span key={`${index}-${lineIdx}`} className="block">
          {line}
          {lineIdx < arr.length - 1 && <span className="block h-1" />}
        </span>
      ));
    });
  };

  return (
    <PageTransition>
      <div className="w-full h-[calc(100vh-140px)] flex rounded-3xl border border-neutral-200/50 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 shadow-lg overflow-hidden backdrop-blur-sm">
        {/* Left Side: Project Selector list */}
        <div className="w-72 md:w-80 shrink-0 border-r border-neutral-100 dark:border-neutral-800 flex flex-col bg-neutral-50/50 dark:bg-neutral-950/20">
          <div className="p-4 border-b border-neutral-100 dark:border-neutral-850 space-y-3">
            <h3 className="text-sm font-bold text-neutral-700 dark:text-neutral-300 text-start uppercase tracking-wider">Dự án của tôi</h3>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Tìm kiếm dự án..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-neutral-900/60 border border-neutral-200/60 dark:border-neutral-850 rounded-xl pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {isProjectsPending ? (
              <div className="flex items-center justify-center p-8 gap-2 text-xs text-neutral-400">
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" /> Đang tải danh sách...
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="text-center p-8 text-xs text-neutral-400">Không tìm thấy dự án nào</div>
            ) : (
              filteredProjects.map((p) => {
                const isActive = selectedProjectId === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProject(p)}
                    className={`w-full text-start p-3 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                      isActive 
                        ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400' 
                        : 'hover:bg-neutral-100/50 dark:hover:bg-neutral-800/40 text-neutral-700 dark:text-neutral-300'
                    }`}
                  >
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isActive ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500'
                    }`}>
                      <Folder className="h-4.5 w-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate group-hover:text-blue-500 transition-colors">{p.name}</p>
                      <p className="text-[10px] text-neutral-400 truncate mt-0.5">{p.location || 'Chưa định vị'}</p>
                    </div>
                    <ArrowRight className={`h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-all ${isActive ? 'translate-x-0.5 opacity-100 text-blue-500' : ''}`} />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Chat panel */}
        <div className="flex-1 flex flex-col bg-white dark:bg-neutral-900">
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="text-start">
                <h2 className="text-sm font-bold text-neutral-850 dark:text-white">AI Phân tích rủi ro</h2>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  {selectedProject ? `Dự án: ${selectedProject.name}` : 'Chọn dự án để bắt đầu'}
                </p>
              </div>
            </div>
            
            {selectedProject && (
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] text-emerald-500 font-semibold uppercase tracking-wider">Đã kết nối</span>
              </div>
            )}
          </div>

          {/* Message History area */}
          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-neutral-50/20 dark:bg-neutral-950/5">
            {messages.map((msg, idx) => {
              const isAI = msg.role === 'ai';
              return (
                <div key={idx} className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}>
                  {isAI && (
                    <div className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                      <Bot className="h-4.5 w-4.5" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                    isAI 
                      ? 'bg-neutral-50 dark:bg-neutral-800/80 border border-neutral-100 dark:border-neutral-850 text-neutral-800 dark:text-neutral-250 shadow-sm text-start'
                      : 'bg-blue-500 text-white text-start shadow-md shadow-blue-500/10'
                  }`}>
                    {formatMessageText(msg.content)}
                  </div>
                  {!isAI && (
                    <div className="h-9 w-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 flex items-center justify-center shrink-0">
                      <User className="h-4.5 w-4.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {isPending && (
              <div className="flex gap-3 justify-start">
                <div className="h-9 w-9 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <Bot className="h-4.5 w-4.5" />
                </div>
                <div className="bg-neutral-50 dark:bg-neutral-850 border border-neutral-100 dark:border-neutral-800 p-4 rounded-2xl shadow-sm text-xs italic text-neutral-400 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  AI đang xử lý dữ liệu và suy nghĩ...
                </div>
              </div>
            )}
          </div>

          {/* Quick Actions overlay */}
          {selectedProject && !isPending && (
            <div className="px-6 py-2 bg-neutral-50/30 dark:bg-neutral-950/10 flex flex-wrap gap-2 justify-start border-t border-neutral-100 dark:border-neutral-800/50">
              <button
                onClick={() => handleQuickAction('objectives')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" /> Nhận diện rủi ro
              </button>
              <button
                onClick={() => handleQuickAction('assessments')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
              >
                <CheckCircle2 className="h-3.5 w-3.5" /> Đánh giá mức độ
              </button>
              <button
                onClick={() => handleQuickAction('solutions')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-amber-100 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors cursor-pointer"
              >
                <Shield className="h-3.5 w-3.5" /> Đề xuất giải pháp
              </button>
            </div>
          )}

          {/* Message input panel */}
          <div className="p-4 bg-white dark:bg-neutral-900 border-t border-neutral-100 dark:border-neutral-800 flex gap-3 items-center">
            <div className="flex-1 relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={selectedProject ? "Nhập câu hỏi để bắt đầu trò chuyện với AI..." : "Hãy chọn một dự án ở cột bên trái..."}
                disabled={!selectedProject || isPending}
                className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/60 dark:border-neutral-800 rounded-2xl px-5 py-3.5 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!selectedProject || isPending || !input.trim()}
                className="absolute right-2 top-2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition duration-300 disabled:opacity-40 disabled:hover:bg-blue-500 cursor-pointer"
              >
                <Send className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

