import Icon from "./Icons";

function ResumeButton({ t, theme }) {
  const file = t("about.cv");

  const fileName = file.includes("pt-br")
    ? "Curriculo-Maria-Clara-Cayres-de-Almeida.pdf"
    : "Resume-Maria-Clara-Cayres-de-Almeida.pdf";

  return (
    <a
      href={file}
      download={fileName}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-full px-5 py-4 text-sm font-black transition hover:scale-105 ${
        theme === "dark" ? "bg-white text-black" : "bg-slate-950 text-white"
      }`}
    >
      <Icon name="download" size={17} />
      {t("about.download")}
    </a>
  );
}

export default ResumeButton;