export function surface(theme, strong = false) {
  if (theme === "dark") {
    return strong ? "border-white/10 bg-[#10102a]" : "border-white/10 bg-white/[0.06]";
  }
  return strong ? "border-slate-200 bg-white" : "border-slate-200 bg-white/75";
}

export function mutedText(theme) {
  return theme === "dark" ? "text-white/60" : "text-slate-600";
}

export function getThemeClass(theme) {
  return theme === "dark"
    ? "bg-[#060617] text-white selection:bg-fuchsia-400 selection:text-black"
    : "bg-[#f7f3ff] text-slate-950 selection:bg-fuchsia-400 selection:text-white";
}