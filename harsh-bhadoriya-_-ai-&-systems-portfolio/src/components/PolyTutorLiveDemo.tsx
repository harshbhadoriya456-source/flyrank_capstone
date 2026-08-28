import React, { useState } from 'react';
import {
  Sparkles,
  Bot,
  Brain,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Volume2,
  Send,
  RotateCcw,
  Languages,
} from 'lucide-react';

interface DialogueTurn {
  id: string;
  sender: 'learner' | 'agent-orchestrator';
  text: string;
  grammarNotes?: string;
  pronunciationNotes?: string;
  tutorFeedback?: string;
  memoryUpdate?: string;
}

export const PolyTutorLiveDemo: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<'French' | 'Spanish' | 'German'>('French');
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [turns, setTurns] = useState<DialogueTurn[]>([
    {
      id: 'turn-1',
      sender: 'learner',
      text: 'Bonjour! Je voudrais commander un café et croissants, s\'il vous plaît.',
    },
    {
      id: 'turn-2',
      sender: 'agent-orchestrator',
      text: 'Bonjour! Avec grand plaisir. Combien de croissants désirez-vous?',
      grammarNotes: 'Correction: Use "des croissants" (plural indefinite article) instead of just "croissants".',
      pronunciationNotes: 'Phonetic target: /kʁwasɑ̃/. Soft uvular /ʁ/ articulation is key.',
      tutorFeedback: 'Polite greeting formulation is spot on! Keep practicing noun plural markers.',
      memoryUpdate: 'ChromaDB: Tagged "French Plural Articles" under targeted reinforcement list.',
    },
  ]);

  const presetQueries = {
    French: [
      'Je voudrais réserver une table pour deux personnes à huit heures.',
      'Est-ce que vous avez des options végétariennes dans le menu?',
    ],
    Spanish: [
      'Hola, quisiera pedir una paella tradicional y agua con gas, por favor.',
      '¿A qué hora sale el próximo tren hacia Madrid?',
    ],
    German: [
      'Guten Tag, ich möchte bitte ein Zimmer mit Aussicht reservieren.',
      'Könnten Sie mir bitte den Weg zum Hauptbahnhof beschreiben?',
    ],
  };

  const handleSendPrompt = (promptText?: string) => {
    const textToSend = promptText || inputText;
    if (!textToSend.trim()) return;

    const userTurn: DialogueTurn = {
      id: `turn-${Date.now()}`,
      sender: 'learner',
      text: textToSend,
    };

    setTurns((prev) => [...prev, userTurn]);
    setInputText('');
    setIsProcessing(true);

    // Multi-Agent Pipeline Response Simulation
    setTimeout(() => {
      let responseText = '';
      let grammar = '';
      let pronunciation = '';
      let tutor = '';
      let memory = '';

      if (selectedLanguage === 'French') {
        responseText = 'Très bien! Je note cela immédiatement. Avez-vous une préférence pour l\'emplacement?';
        grammar = 'Grammar Agent: Sentence structure conforms 100% to standard French subjunctive/conditional conventions.';
        pronunciation = 'Pronunciation Coach: Checked phonetic rhythm: Smooth cadence, clear liaison.';
        tutor = 'Tutor Agent: Great fluency! Advanced CEFR B1 vocabulary demonstrated.';
        memory = 'ChromaDB: Recorded high proficiency score in Conversational Inquiries.';
      } else if (selectedLanguage === 'Spanish') {
        responseText = '¡Por supuesto! La mesa estará lista en breve. ¿Desean alguna bebida de entrada?';
        grammar = 'Grammar Agent: Correct use of polite conditional form "quisiera".';
        pronunciation = 'Pronunciation Coach: Clear rolled "rr" and vowel clarity.';
        tutor = 'Tutor Agent: Natural conversational flow maintained.';
        memory = 'ChromaDB: Updated Spanish conversational memory ledger.';
      } else {
        responseText = 'Sehr gerne! Das Zimmer ist für Sie vorbereitet. Haben Sie noch weitere Wünsche?';
        grammar = 'Grammar Agent: Correct modal verb positioning and dative case.';
        pronunciation = 'Pronunciation Coach: Accurate umlaut articulation for /ø/ and /y/.';
        tutor = 'Tutor Agent: Excellent German formal address ("Sie").';
        memory = 'ChromaDB: Logged high structural accuracy in Hospitality domain.';
      }

      const agentTurn: DialogueTurn = {
        id: `turn-${Date.now() + 1}`,
        sender: 'agent-orchestrator',
        text: responseText,
        grammarNotes: grammar,
        pronunciationNotes: pronunciation,
        tutorFeedback: tutor,
        memoryUpdate: memory,
      };

      setTurns((prev) => [...prev, agentTurn]);
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="rounded-2xl bg-[#090d16] border border-cyan-500/30 p-5 sm:p-6 text-slate-200 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                POLYTUTOR LIVE MULTI-AGENT COCKPIT
              </span>
            </div>
            <h4 className="text-lg font-bold text-white font-mono">
              LANGGRAPH REASONING & MEMORY LOOP
            </h4>
          </div>
        </div>

        {/* Target Language Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          {(['French', 'Spanish', 'German'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-lg transition-all ${
                selectedLanguage === lang
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Preset Prompts */}
      <div className="my-3 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-slate-400">Try Sample Prompt:</span>
        {presetQueries[selectedLanguage].map((preset, idx) => (
          <button
            key={idx}
            onClick={() => handleSendPrompt(preset)}
            className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all truncate max-w-xs"
          >
            "{preset}"
          </button>
        ))}
      </div>

      {/* Dialogue Turns Stream */}
      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1 my-4">
        {turns.map((turn) => (
          <div
            key={turn.id}
            className={`p-4 rounded-xl border transition-all ${
              turn.sender === 'learner'
                ? 'bg-slate-900/90 border-slate-700 ml-6 text-right'
                : 'bg-slate-950/90 border-cyan-500/30 mr-6 text-left'
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1.5">
              <span>{turn.sender === 'learner' ? 'LEARNER INPUT' : 'MULTI-AGENT SYNTHESIS (GEMINI + LANGGRAPH)'}</span>
              {turn.sender === 'agent-orchestrator' && (
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>4 Agents Harmonized</span>
                </span>
              )}
            </div>

            <p className="text-sm font-medium text-white mb-2">{turn.text}</p>

            {/* Agent Feedback Sub-Blocks */}
            {turn.sender === 'agent-orchestrator' && (
              <div className="space-y-2 mt-3 pt-3 border-t border-slate-800 font-mono text-xs text-left">
                {turn.grammarNotes && (
                  <div className="p-2 rounded-lg bg-violet-950/30 border border-violet-500/20 text-violet-200">
                    <span className="text-[10px] text-violet-400 font-bold block mb-0.5">GRAMMAR AGENT:</span>
                    {turn.grammarNotes}
                  </div>
                )}

                {turn.pronunciationNotes && (
                  <div className="p-2 rounded-lg bg-sky-950/30 border border-sky-500/20 text-sky-200 flex items-start gap-2">
                    <Volume2 className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-sky-400 font-bold block mb-0.5">PRONUNCIATION COACH:</span>
                      {turn.pronunciationNotes}
                    </div>
                  </div>
                )}

                {turn.memoryUpdate && (
                  <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-200 flex items-start gap-2">
                    <Brain className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] text-emerald-400 font-bold block mb-0.5">CHROMADB MEMORY UPDATE:</span>
                      {turn.memoryUpdate}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {isProcessing && (
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 flex items-center gap-3 font-mono text-xs text-cyan-300 animate-pulse">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>AI Orchestrator executing parallel agent graph...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendPrompt()}
          placeholder={`Type a practice sentence in ${selectedLanguage}...`}
          className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
        />
        <button
          onClick={() => handleSendPrompt()}
          disabled={!inputText.trim() || isProcessing}
          className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 transition-all"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Send</span>
        </button>
      </div>
    </div>
  );
};
