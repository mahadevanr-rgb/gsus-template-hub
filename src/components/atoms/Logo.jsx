export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <img
        src="../src/assets/images/logo.png"
        width="34"
        height="34"
        alt="logo"
        className="rounded-lg flex-shrink-0"
      />
    </div>
  );
}
