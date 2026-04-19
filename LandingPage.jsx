import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaDiscord } from "react-icons/fa6";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import './index.css';

// --- Assets ---
const ROBUX_ICON = "https://customer-assets.emergentagent.com/job_void-rewards/artifacts/39o0x6jg_Robux_2019_Logo_gold.svg.png";
const NITRO_ICON = "https://customer-assets.emergentagent.com/job_void-rewards/artifacts/excyzgsh_images.png";

const REWARDS = {
  discord: [
    { id: "nitro-basic", title: "Nitro Basic", description: "Essentials: emojis, stickers, and 50MB upload", icon: NITRO_ICON },
    { id: "nitro-boost", title: "Nitro Boost", description: "Everything plus boosts and perks", icon: NITRO_ICON, bestValue: true },
  ],
  robux: [
    { id: "robux-1500", title: "1500 Robux", description: "Ideal for bundles and game passes", icon: ROBUX_ICON },
    { id: "robux-4500", title: "4500 Robux", description: "Max pack for big upgrades", icon: ROBUX_ICON, bestValue: true },
  ],
};

const springTransition = { type: "spring", stiffness: 400, damping: 30 };

const BackgroundOrbs = () => (
  <>
    <div className="nr-bg" aria-hidden="true" />
    <div className="nr-orb nr-orb-a" aria-hidden="true" />
    <div className="nr-orb nr-orb-b" aria-hidden="true" />
  </>
);

const PlatformPill = ({ active, onClick, icon, label, iconIsImg }) => (
  <motion.button
    type="button"
    onClick={onClick}
    whileTap={{ scale: 0.97 }}
    transition={springTransition}
    className={[
      "relative w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-300",
      active ? "bg-blue-600 border-[#4f7cff] border shadow-lg" : "bg-white/5 border-white/5 border opacity-60 hover:opacity-100"
    ].join(" ")}
  >
    {iconIsImg ? <img src={icon} alt="" className="h-5 w-5 object-contain" /> : icon}
    <span className="tracking-tight">{label}</span>
  </motion.button>
);

const RewardCard = ({ reward, selected, onSelect, index }) => (
  <motion.button
    type="button"
    onClick={() => onSelect(reward.id)}
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...springTransition, delay: 0.05 * index }}
    whileHover={{ y: -4 }}
    className={[
      "relative flex flex-col items-center text-center p-6 rounded-3xl bg-[#0f1421] border transition-all duration-300",
      selected ? "border-[#4f7cff] shadow-2xl" : "border-white/5 hover:border-white/10"
    ].join(" ")}
  >
    {reward.bestValue && <span className="absolute top-3 right-3 bg-blue-600 text-[10px] font-bold uppercase px-2 py-1 rounded-md">Best Value</span>}
    <div className="h-14 w-14 bg-[#191f2e] rounded-2xl flex items-center justify-center mb-4">
      <img src={reward.icon} alt="" className="h-8 w-8 object-contain" />
    </div>
    <h3 className="font-bold text-lg text-white">{reward.title}</h3>
    <p className="mt-2 text-xs text-white/50">{reward.description}</p>
  </motion.button>
);

const UsernameModal = ({ open, onClose, platform, reward }) => {
  const [username, setUsername] = useState("");
  const [phase, setPhase] = useState("form");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (open) { setUsername(""); setPhase("form"); setProgress(0); }
  }, [open]);

  useEffect(() => {
    if (phase !== "loading") return;
    let raf;
    const start = performance.now();
    const DUR = 2500;
    const tick = (t) => {
      const p = Math.min(100, ((t - start) / DUR) * 100);
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
      else {
        if (typeof window.openOfferwall_69e4f4332e844eeefbe74186 === "function") {
          window.openOfferwall_69e4f4332e844eeefbe74186();
        } else {
          console.error("Locker function not found");
          // Fallback if script fails
          window.location.href = "https://rainawards.com/69e4f4332e844eeefbe74186";
        }
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4" onClick={() => phase !== "loading" && onClose()}>
          <motion.div onClick={(e) => e.stopPropagation()} initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 10 }} transition={springTransition} className="relative w-full max-w-sm bg-[#0c1220] border border-white/5 p-8 rounded-[28px] text-center shadow-2xl">
            {phase === "form" && (
                <>
                  <h3 className="text-xl font-bold text-white mb-2">Account Verification</h3>
                  <input autoFocus type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" className="w-full bg-[#070b15] border border-white/5 p-4 rounded-xl text-white text-base font-semibold outline-none focus:border-blue-600 transition-all mb-6" />
                  <button onClick={() => username.trim() && setPhase("loading")} className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold text-lg text-white transition-all">Continue</button>
                </>
            )}
            {phase === "loading" && (
              <div className="py-4">
                <div className="flex justify-center items-center gap-2 text-blue-400 mb-6 font-bold uppercase text-[10px] tracking-widest"><Loader2 className="animate-spin" size={18} /> Processing</div>
                <h2 className="text-xl font-bold text-white mb-6">Linking to <span className="text-blue-400">{username}</span></h2>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-3"><div className="h-full bg-blue-600 transition-all duration-300" style={{ width: `${progress}%` }} /></div>
                <div className="text-white/30 font-bold tracking-widest text-[10px] uppercase">{Math.round(progress)}% Complete</div>
              </div>
            )}
            {phase === "success" && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={springTransition} className="py-4">
                <div className="h-16 w-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6"><Check className="text-emerald-400" size={32} /></div>
                <h2 className="text-2xl font-bold text-white mb-2">Success</h2>
                <p className="text-white/50 mb-8 text-sm font-medium">{reward?.title} has been added to your account.</p>
                <button onClick={onClose} className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-xl font-bold text-lg text-white transition-all">Close</button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LandingPage = () => {
  const [platform, setPlatform] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const rewards = useMemo(() => (platform ? REWARDS[platform] : []), [platform]);
  const activeReward = rewards.find((r) => r.id === selectedReward) || null;

  return (
    <div className="relative min-h-screen w-full bg-[#070b15] font-sans selection:bg-blue-500/30">
      <BackgroundOrbs />
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={springTransition} className="relative w-full max-w-3xl bg-[#0b1020]/80 backdrop-blur-2xl border border-white/5 p-8 sm:p-12 rounded-[32px] shadow-2xl">
          <div className="absolute top-6 right-8 flex items-center gap-2 text-[9px] font-bold text-emerald-400/80 uppercase tracking-widest"><ShieldCheck size={12} /> <span>Secure Connection</span></div>
          <div className="flex flex-col items-center text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">Reward Hub</h1>
            <p className="text-white/40 font-medium text-sm">Select your platform and claim your item.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            <PlatformPill active={platform === "discord"} onClick={() => {setPlatform("discord"); setSelectedReward(null);}} icon={<FaDiscord size={20} />} label="Discord Nitro" />
            <PlatformPill active={platform === "robux"} onClick={() => {setPlatform("robux"); setSelectedReward(null);}} icon={ROBUX_ICON} iconIsImg label="Robux" />
          </div>
          <AnimatePresence mode="wait">
            {platform && (
              <motion.div key={platform} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity:0 }} transition={springTransition} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {rewards.map((r, i) => <RewardCard key={r.id} reward={r} index={i} selected={selectedReward === r.id} onSelect={setSelectedReward} />)}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex flex-col items-center">
            <button disabled={!selectedReward} onClick={() => setModalOpen(true)} className={["w-full sm:w-auto px-12 py-4 rounded-xl font-bold text-lg transition-all", selectedReward ? "bg-blue-600 text-white shadow-xl hover:bg-blue-500 scale-[1.02] active:scale-[0.98]" : "bg-white/5 text-white/20 cursor-not-allowed uppercase"].join(" ")}>GET YOUR REWARD</button>
          </div>
        </motion.section>
        <footer className="mt-8 text-[10px] font-bold text-white/10 tracking-[12px] uppercase">Corporate Rewards 2026</footer>
      </main>
      <UsernameModal open={modalOpen} onClose={() => setModalOpen(false)} platform={platform} reward={activeReward} />
    </div>
  );
};
export default LandingPage;

