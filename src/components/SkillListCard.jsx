import { surface } from "../utils/theme";
import Icon from "./Icons";

function SkillListCard({ title, items, theme, icon }) {
  return (
    <div className={`rounded-[2rem] border p-6 ${surface(theme)}`}>
      <Icon name={icon} className="mb-6 text-lime-400" />
      <h3 className="text-2xl font-black">{title}</h3>
      <div className="mt-5 grid gap-2">
        {items.map((item) => (
          <span key={item} className={`rounded-2xl border px-4 py-3 text-sm font-bold ${surface(theme)}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

export default SkillListCard;