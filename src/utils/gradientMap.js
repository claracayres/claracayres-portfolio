export const gradientMap = {
  sunset: "from-orange-400 via-pink-500 to-purple-600",
  spotify: "from-green-400 via-emerald-500 to-cyan-400",
  calyx: "from-blue-500 via-cyan-400 to-emerald-400",
  fisioella: "from-rose-400 via-pink-400 to-fuchsia-500",
  default: "from-fuchsia-500 via-cyan-400 to-violet-500",
};

export function getProjectGradient(project) {
  return gradientMap[project?.gradient] || gradientMap.default;
}