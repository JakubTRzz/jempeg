import React, { useEffect, useMemo, useState } from "react";

/**
 * Telefon (Araç İçi) — v2
 * CarPlay / Android Auto ergonomisi: büyük hedefler, minimum metin,
 * alt başparmak bölgesi, yüksek kontrast, tek bakışta anlaşılır hiyerarşi.
 *
 * Temel Tasarım İlkeleri:
 * - 64–88px dokunmatik hedefler (min-height 64px)
 * - Alt Navigasyon (Başparmak bölgesi): Favoriler · Tuş Takımı · Rehber
 * - Üstte yalın durum çubuğu: BT cihaz adı, sinyal, pil (mock)
 * - Çağrı ekranı tam odak: büyük isim/numara, dev Kabul/Reddet
 * - DTMF ve Bitir butonları da büyük ve tabanda
 * - Koyu tema, yüksek kontrast, az metin
 */

// -------------------------------------------------------------
// Türler
// -------------------------------------------------------------

type CallState = "idle" | "dialing" | "incoming" | "active" | "ended";

type Contact = { id: string; name: string; phone: string; favorite?: boolean };

type CallLogItem = { id: string; name?: string; phone: string; when: string; type: "outgoing" | "incoming" | "missed"; durationSec?: number };

type BluetoothInfo = { connected: boolean; deviceName?: string; signalBars?: 0|1|2|3|4|5; batteryPct?: number };

// -------------------------------------------------------------
// Mock veriler
// -------------------------------------------------------------

const MOCK_CONTACTS: Contact[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `c${i + 1}`,
  name: i % 6 === 0 ? `Acil ${i}` : i % 5 === 0 ? `Servis ${i}` : i % 4 === 0 ? `Aile ${i}` : `Kişi ${i}`,
  phone: `05${i % 10}${i % 10} ${String(100 + i).slice(-3)} ${String(1000 + i * 17).slice(-4)}`,
  favorite: i % 4 === 0,
}));

const MOCK_CALLS: CallLogItem[] = [
  { id: "l1", name: "Aile 4", phone: "0505 123 4567", when: new Date(Date.now() - 2*3600e3).toISOString(), type: "incoming", durationSec: 182 },
  { id: "l2", name: "Servis 5", phone: "0533 987 1122", when: new Date(Date.now() - 12*3600e3).toISOString(), type: "missed" },
  { id: "l3", name: "Kişi 9",  phone: "0542 777 8899", when: new Date(Date.now() - 24*3600e3).toISOString(), type: "outgoing", durationSec: 64 },
];

const MOCK_BT: BluetoothInfo = { connected: true, deviceName: "Erkam’ın iPhone’u", signalBars: 4, batteryPct: 82 };

// -------------------------------------------------------------
// Yardımcılar & ikonlar
// -------------------------------------------------------------

const onlyDigits = (s: string) => s.replace(/[^0-9+]/g, "");

const Icon = {
  Star: (p:any)=>(<svg viewBox="0 0 24 24" width={p.size||20} height={p.size||20} className={p.className}><path fill="currentColor" d="M12 17.3 6.2 21l1.6-6.9L2 9.3l7-.6L12 2l3 6.7 7 .6-5.8 4.8L17.8 21z"/></svg>),
  Clock:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||20} height={p.size||20} className={p.className}><path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11h5v-2h-4V6h-2v7z"/></svg>),
  User:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||20} height={p.size||20} className={p.className}><path fill="currentColor" d="M12 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 12c-5 0-9 2.5-9 6v2h18v-2c0-3.5-4-6-9-6z"/></svg>),
  Grid:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||20} height={p.size||20} className={p.className}><path fill="currentColor" d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z"/></svg>),
  Phone:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||24} height={p.size||24} className={p.className}><path fill="currentColor" d="M6.6 10.8c1.7 3 3.6 4.9 6.6 6.6l2.2-2.2c.3-.3.8-.4 1.2-.3 1 .3 2 .5 3 .5.7 0 1.2.5 1.2 1.2v3.6c0 .7-.5 1.2-1.2 1.2C9.9 21.4 2.6 14.1 2.6 4.6 2.6 3.9 3.1 3.4 3.8 3.4h3.6c.7 0 1.2.5 1.2 1.2 0 1 .2 2 .5 3 .1.4 0 .9-.3 1.2l-2.2 2z"/></svg>),
  PhoneOff:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||24} height={p.size||24} className={p.className}><path fill="currentColor" d="M21.8 16.4c-1.4-1.4-3.8-2.4-6.8-2.4-3 0-5.4 1-6.8 2.4-.3.3-.3.7 0 1l1.9 1.9c.3.3.7.3 1 0 .8-.7 2.1-1.2 3.9-1.2s3.1.5 3.9 1.2c.3.3.7.3 1 0l1.9-1.9c.2-.3.2-.7 0-1zM3.3 2.6 2.6 3.3l18.1 18.1.7-.7L3.3 2.6z"/></svg>),
  Mic:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||24} height={p.size||24} className={p.className}><path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 14 0h-2zM11 19h2v3h-2z"/></svg>),
  MicOff:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||24} height={p.size||24} className={p.className}><path fill="currentColor" d="M15 11V6a3 3 0 0 0-5.8-1.1l8.9 8.9A3 3 0 0 0 15 11zm2 0a5 5 0 0 1-.4 2.1l1.6 1.6A7 7 0 0 0 19 11h-2zM5 11H3a7 7 0 0 0 11.3 5.4l-1.5-1.5A5 5 0 0 1 5 11zm13.7 8.3-14-14-.7.7 3.3 3.3V11a3 3 0 0 0 5 2.2l1.5 1.5A5 5 0 0 1 7 16.9V18h5v4h2v-4h2v-1.1l3.3 3.3.7-.7z"/></svg>),
  Volume:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||24} height={p.size||24} className={p.className}><path fill="currentColor" d="M3 10v4h4l5 4V6L7 10H3zm10.5 2a4.5 4.5 0 0 0-1.5-3.4v6.8A4.5 4.5 0 0 0 13.5 12zm2.5 0a7 7 0 0 0-2.3-5.2v10.4A7 7 0 0 0 16 12z"/></svg>),
  Bluetooth:(p:any)=>(<svg viewBox="0 0 24 24" width={p.size||20} height={p.size||20} className={p.className}><path fill="currentColor" d="M12 2l6 6-4.3 4.3L18 17l-6 5V2zm2.8 6L13 6.2v3.6L14.8 8zm0 8L13 14.2v3.6L14.8 16zM5 12h6v1.5H5z"/></svg>),
};

// -------------------------------------------------------------
// Küçük UI yardımcıları
// -------------------------------------------------------------

function TabBtn({ active, onClick, children }: { active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`h-14 min-w-[96px] px-5 rounded-2xl text-base font-bold ${active?"bg-white text-black":"bg-white/10 text-white"}`}>
      {children}
    </button>
  );
}

function BigBtn({ danger, onClick, children }: { danger?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`h-16 rounded-2xl px-6 text-lg font-extrabold flex items-center justify-center gap-3 ${danger?"bg-red-500 text-white":"bg-white/10 text-white"}`}>
      {children}
    </button>
  );
}

function Row({ title, subtitle, onClick }: { title: string; subtitle?: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="h-[72px] w-full grid grid-cols-[1fr_auto] items-center px-5 rounded-2xl bg-white/5 hover:bg-white/10 text-left">
      <div>
        <div className="text-lg font-extrabold truncate">{title}</div>
        {subtitle && <div className="text-sm text-white/70 truncate">{subtitle}</div>}
      </div>
      <div className="opacity-80 text-sm">Ara</div>
    </button>
  );
}

// -------------------------------------------------------------
// Ana Bileşen
// -------------------------------------------------------------

export default function Phone() {
  const [tab, setTab] = useState<"fav"|"keypad"|"contacts">("fav"); // sade 3 sekme
  const [callState, setCallState] = useState<CallState>("idle");
  const [muted, setMuted] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(true);
  const [dial, setDial] = useState("");
  const [peer, setPeer] = useState<{ name?: string; phone: string }|null>(null);

  const contacts = useMemo(()=>MOCK_CONTACTS,[]);
  const favorites = useMemo(()=>contacts.filter(c=>c.favorite),[contacts]);
  const bt = MOCK_BT;

  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{
      if(/^[0-9*#]$/.test(e.key)) setDial(d=> (d+e.key).slice(0,20));
      if(e.key==='Backspace') setDial(d=> d.slice(0,-1));
      if(e.key==='Enter') startCall(dial);
    };
    window.addEventListener('keydown', onKey);
    return ()=> window.removeEventListener('keydown', onKey);
  },[dial]);

  function startCall(num:string, name?:string){
    const phone = onlyDigits(num);
    if(!phone) return;
    setPeer({name, phone});
    setCallState('dialing');
    setTab('keypad');
    setTimeout(()=> setCallState('active'), 800);
  }
  function endCall(){ setCallState('ended'); setTimeout(()=>{ setCallState('idle'); setPeer(null); setDial(""); }, 400); }
  function simulateIncoming(){ setPeer({ name:'Kişi 9', phone:'0542 777 8899' }); setCallState('incoming'); }
  function acceptIncoming(){ setCallState('active'); setTab('keypad'); }
  function rejectIncoming(){ setCallState('ended'); setTimeout(()=>{ setCallState('idle'); setPeer(null); }, 400); }
  function sendDtmf(ch:string){ if(callState==='active'){/* bridge.sendDTMF */} setDial(d=> (d+ch).slice(0,20)); }

  const keypad = [["1",""],["2","ABC"],["3","DEF"],["4","GHI"],["5","JKL"],["6","MNO"],["7","PQRS"],["8","TUV"],["9","WXYZ"],["*",""],["0","+"],["#",""]];

  return (
    <div className="h-full w-full p-4 text-white bg-gradient-to-b from-slate-950 to-slate-900 rounded-3xl relative">
      {/* Üst durum bandı */}
      <div className="h-10 flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2 text-sm">
          <Icon.Bluetooth className="text-blue-400"/>
          <span className="font-bold">{bt.connected? bt.deviceName : 'Cihaz yok'}</span>
          {bt.connected && <span className="text-white/70">• {bt.signalBars}/5 • {bt.batteryPct}%</span>}
        </div>
        <button onClick={simulateIncoming} className="text-xs text-white/50 hover:text-white/80">Gelen çağrı simüle et</button>
      </div>

      {/* İçerik alanı */}
      <div className="absolute inset-x-4 top-14 bottom-24">
        {tab==='fav' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 h-full overflow-auto pr-1">
            {favorites.map(c=> (
              <button key={c.id} onClick={()=> startCall(c.phone, c.name)} className="h-[88px] rounded-2xl bg-white/5 hover:bg-white/10 px-5 text-left">
                <div className="text-xl font-extrabold leading-tight truncate">{c.name}</div>
                <div className="text-sm text-white/70 tracking-wide">{c.phone}</div>
              </button>
            ))}
          </div>
        )}

        {tab==='contacts' && (
          <div className="grid grid-rows-[auto_1fr] gap-3 h-full">
            <input placeholder="Rehberde ara" className="h-14 rounded-2xl bg-white/8 placeholder-white/50 px-5 text-white outline-none focus:ring-2 focus:ring-white/20" onChange={(e)=>{
              const q = e.target.value.toLowerCase();
              const list = document.getElementById('contacts');
              if(!list) return;
              const items = Array.from(list.querySelectorAll<HTMLButtonElement>('button'));
              const first = items.find(b=> (b.innerText||'').toLowerCase().includes(q));
              if(first) first.scrollIntoView({behavior:'smooth', block:'center'});
            }}/>
            <div id="contacts" className="overflow-auto pr-1 space-y-3">
              {contacts.map(c=> (
                <Row key={c.id} title={c.name} subtitle={c.phone} onClick={()=> startCall(c.phone, c.name)} />
              ))}
            </div>
          </div>
        )}

        {tab==='keypad' && (
          <div className="grid grid-rows-[auto_1fr_auto] gap-4 h-full">
            <div className="h-16 rounded-2xl bg-white/6 px-5 flex items-center justify-between">
              <div className="text-2xl font-extrabold tracking-wide truncate">{dial || (peer?.phone ?? 'Numara girin')}</div>
              <button onClick={()=> setDial(d=> d.slice(0,-1))} className="h-12 px-4 rounded-xl bg-white/10">Sil</button>
            </div>
            <div className="grid grid-cols-3 gap-4 content-center">
              {keypad.map(([d,sub])=> (
                <button key={d} onClick={()=> sendDtmf(d)} className="h-24 rounded-3xl bg-white/10 hover:bg-white/15 active:scale-[0.98] transition flex flex-col items-center justify-center">
                  <div className="text-4xl font-black">{d}</div>
                  {sub && <div className="text-[11px] tracking-widest opacity-70">{sub}</div>}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <BigBtn onClick={()=> setMuted(m=>!m)}>{muted? <Icon.MicOff/>:<Icon.Mic/>}{muted? ' Sesi Aç':' Sessize Al'}</BigBtn>
              {(callState==='active' || callState==='dialing') ? (
                <BigBtn danger onClick={endCall}><Icon.PhoneOff/> Bitir</BigBtn>
              ) : (
                <BigBtn onClick={()=> startCall(dial)}><Icon.Phone/> Ara</BigBtn>
              )}
              <BigBtn onClick={()=> setSpeakerOn(s=>!s)}><Icon.Volume/>{speakerOn? ' Hoparlör Açık':' Hoparlör Kapalı'}</BigBtn>
            </div>
          </div>
        )}
      </div>

      {/* Alt Başparmak Navigasyonu */}
      <div className="absolute left-4 right-4 bottom-4 h-20 rounded-3xl bg-white/8 backdrop-blur-md px-3 flex items-center justify-between gap-2">
        <TabBtn active={tab==='fav'} onClick={()=> setTab('fav')}><span className="inline-flex items-center gap-2"><Icon.Star/> Favoriler</span></TabBtn>
        <TabBtn active={tab==='keypad'} onClick={()=> setTab('keypad')}><span className="inline-flex items-center gap-2"><Icon.Grid/> Tuş Takımı</span></TabBtn>
        <TabBtn active={tab==='contacts'} onClick={()=> setTab('contacts')}><span className="inline-flex items-center gap-2"><Icon.User/> Rehber</span></TabBtn>
      </div>

      {/* Tam odak Çağrı ekranı */}
      {(callState==='incoming' || callState==='dialing' || callState==='active') && peer && (
        <div className="absolute inset-0 rounded-3xl bg-black/70 backdrop-blur-md p-6 flex flex-col">
          <div className="h-10 flex items-center justify-center text-white/80 text-sm">{callState==='incoming'?'Gelen çağrı': callState==='dialing'?'Aranıyor':'Görüşme aktif'}</div>
          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="text-4xl font-black text-center max-w-[90%] truncate">{peer.name ?? peer.phone}</div>
            {peer.name && <div className="text-white/70 text-lg">{peer.phone}</div>}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {callState==='incoming' ? (
              <>
                <BigBtn danger onClick={rejectIncoming}><Icon.PhoneOff/> Reddet</BigBtn>
                <div />
                <BigBtn onClick={acceptIncoming}><Icon.Phone/> Kabul Et</BigBtn>
              </>
            ) : (
              <>
                <BigBtn onClick={()=> setMuted(m=>!m)}>{muted? <Icon.MicOff/>:<Icon.Mic/>}{muted? ' Sesi Aç':' Sessize Al'}</BigBtn>
                <BigBtn danger onClick={endCall}><Icon.PhoneOff/> Bitir</BigBtn>
                <BigBtn onClick={()=> setSpeakerOn(s=>!s)}><Icon.Volume/>{speakerOn? ' Hoparlör Açık':' Hoparlör Kapalı'}</BigBtn>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
