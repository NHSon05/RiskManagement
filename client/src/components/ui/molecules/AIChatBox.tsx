import { useState, useRef, useEffect } from "react";
import { Sparkles, X, Send, Loader2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useGenerateObjectives, useGenerateAssessments, useGenerateSolutions } from "@/hooks/useAI";

interface Message {
  role: 'user' | 'ai';
  content: string;
}

export default function AIChatBox() {
  const location = useLocation();
  
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Chào bạn! Tôi là AI trợ lý rủi ro. Bạn cần tôi phân tích gì về dự án này?' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { mutate: generateAI, isPending: generateAIisPending } = useGenerateObjectives();
  const generateAssessments = useGenerateAssessments();
  const generateSolutions = useGenerateSolutions();

  const isPending = generateAIisPending || generateAssessments.isPending || generateSolutions.isPending;


 const handleGenerateClick = () => {
    setIsOpen(true);
    const requestBody = {
      prjName: "Sunrise Residence",
      prjLevel: "Cấp Quốc gia",
      location: "Đà Nẵng",
      capital: "350 tỷ VNĐ",
      pestelData: "Kinh tế: lạm phát, giá nguyên vật liệu tăng cao do ảnh hưởng chuỗi cung ứng toàn cầu...",
      swotData: "Điểm mạnh: uy tín của chủ đầu tư, kinh nghiệm thực hiện các dự án tương tự, có nguồn vốn ổn định...",
      objectivesData: "1. Xây xong trụ cầu. 2. Trải nhựa mặt đường." 
    };

    generateAI(requestBody, {
      onSuccess: (data) => {
      let formattedText = "";

      try {
        let rawText = typeof data === 'string' ? data : JSON.stringify(data);

        rawText = rawText.replace(/^```json\s*/, '').replace(/\s*```$/, '');

        const parsedObject = JSON.parse(rawText);

        formattedText = JSON.stringify(parsedObject, null, 2);
        
      } catch {
        formattedText = typeof data === 'string' 
          ? data.replace(/\\n/g, '\n').replace(/\\"/g, '"')
          : JSON.stringify(data, null, 2);
      }
        setMessages([{ role: 'ai', content: formattedText }])
      }
    });
  };
  const handleSuccess = (response: any) => {
    const data = response.data;
    const replyText = typeof data === 'string' 
      ? data 
      : JSON.stringify(data, null, 2);

    setMessages(prev => [...prev, { role: 'ai', content: replyText }]);
  };

  const handleError = (error: any) => {
    console.error(error);
    setMessages(prev => [...prev, { role: 'ai', content: "Xin lỗi, đã có lỗi kết nối đến AI. Vui lòng thử lại!" }]);
  };

  const handleSendMessage = () => {
    if (!input.trim() || isPending) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput("");
    
    const path = location.pathname;

    if (path.includes("/projects/evaluation")) {
      generateAssessments.mutate({ objectiveName: userMsg }, { onSuccess: handleSuccess, onError: handleError });
    } else if (path.includes("/projects/solution")) {
      generateSolutions.mutate({ objectiveName: userMsg }, { onSuccess: handleSuccess, onError: handleError });
    } 
    // else {
    //   generateObjectives.mutate({ 
    //     prjName: userMsg, 
    //     prjLevel: "Cao",       
    //     location: "", 
    //     capital: "", 
    //     pestelData: "", 
    //     swotData: "" 
    //   }, { onSuccess: handleSuccess, onError: handleError });
    // }
  };

  // Tự động cuộn xuống khi có tin nhắn mới
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* 2. Cửa sổ Chat */}
      {isOpen && (
        <div className="mb-4 w-80 md:w-96 h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-(--primary-btn) text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles size={20} />
              <span className="font-bold">AI Phân tích rủi ro</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 rounded-full p-1">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap ${
                  msg.role === 'user' ? 'bg-(--primary-btn) text-(--white)' : 'bg-(--white) border text-(--description) shadow-sm text-start'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isPending && (
              <div className="flex justify-start">
                <div className="bg-(--white) border p-3 rounded-2xl shadow-sm italic text-xs flex items-center gap-2 text-(--description) text-start">
                  <Loader2 size={14} className="animate-spin" />
                  AI đang suy nghĩ...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-(--white) border-t flex gap-2">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Hỏi AI về rủi ro dự án..."
              className="flex-1 bg-gray-100 border-none focus:ring-2 focus:ring-(--primary-btn) rounded-full px-4 py-2 text-sm"
            />
            <button 
              onClick={handleSendMessage}
              disabled={isPending}
              className="bg-(--primary-btn) text-(--white) p-2 rounded-full hover:scale-110 transition disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
      <button
        onClick={handleGenerateClick}
        className="w-14 h-14 bg-(--primary-btn) text-(--white) rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group"
      >
        {isOpen ? <X size={28} /> : <Sparkles size={28} className="group-hover:animate-pulse" />}
      </button>
    </div>
  );
}