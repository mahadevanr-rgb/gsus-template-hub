export default function Logo() {
  return (
    <div className="flex items-center gap-2">
      <img
        src="../src/assets/images/logo.png"
        width="75px"
        height="75px"
        alt="logo"
      />
      <span className="font-semibold text-lg text-gray-900">TemplateHub</span>
    </div>
  );
}
