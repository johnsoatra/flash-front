export default function Dash() {
  return (
    <svg className="w-full h-px">
      <line
        x1="0"
        y1="1"
        x2="100%"
        y2="1"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="5,5"
      />
    </svg>
  );
}
