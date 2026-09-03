import React from "react";

const FACE = "#ffe8c9";
const INK = "#5b3a1e";

// A cute SVG monkey. The origin (0, 0) is where it sits on its branch.
function Monkey({ x, y, note, singing, bouncing, wobbling, dimmed, onClick }) {
  const { color, letter, name } = note;
  const classes = [
    "em-monkey",
    singing ? "em-monkey--singing" : "",
    bouncing ? "em-monkey--bounce" : "",
    wobbling ? "em-monkey--wobble" : "",
    dimmed ? "em-monkey--dimmed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <g
      className={classes}
      transform={`translate(${x} ${y})`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${name} the ${letter} monkey`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <g className="em-monkey__body">
        {/* tail */}
        <path
          d="M 18 -30 C 44 -36 56 -14 44 -2 C 38 5 28 2 31 -6"
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* legs */}
        <ellipse cx="-13" cy="-5" rx="10" ry="6" fill={color} />
        <ellipse cx="13" cy="-5" rx="10" ry="6" fill={color} />
        <ellipse cx="-16" cy="-3" rx="5" ry="3.5" fill={FACE} />
        <ellipse cx="16" cy="-3" rx="5" ry="3.5" fill={FACE} />
        {/* arms */}
        <path
          d="M -14 -40 L -28 -14"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          d="M 14 -40 L 28 -14"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="-29" cy="-12" r="5" fill={FACE} />
        <circle cx="29" cy="-12" r="5" fill={FACE} />
        {/* body + belly badge */}
        <ellipse cx="0" cy="-32" rx="21" ry="24" fill={color} />
        <ellipse cx="0" cy="-30" rx="13" ry="16" fill={FACE} />
        <text
          x="0"
          y="-24"
          textAnchor="middle"
          fontSize="17"
          fontWeight="700"
          fontFamily="Lato, Arial, sans-serif"
          fill={INK}
        >
          {letter}
        </text>
        {/* head */}
        <path
          d="M -4 -98 Q 0 -110 5 -100"
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="-25" cy="-76" r="9" fill={color} />
        <circle cx="25" cy="-76" r="9" fill={color} />
        <circle cx="-25" cy="-76" r="4.5" fill={FACE} />
        <circle cx="25" cy="-76" r="4.5" fill={FACE} />
        <circle cx="0" cy="-74" r="24" fill={color} />
        <circle cx="-8" cy="-79" r="8.5" fill={FACE} />
        <circle cx="8" cy="-79" r="8.5" fill={FACE} />
        <ellipse cx="0" cy="-68" rx="16" ry="13" fill={FACE} />
        {/* eyes */}
        <circle cx="-7" cy="-77" r="3.2" fill={INK} />
        <circle cx="7" cy="-77" r="3.2" fill={INK} />
        <circle cx="-5.8" cy="-78.3" r="1.1" fill="#fff" />
        <circle cx="8.2" cy="-78.3" r="1.1" fill="#fff" />
        {/* nose */}
        <circle cx="-2.5" cy="-67" r="1.4" fill={INK} />
        <circle cx="2.5" cy="-67" r="1.4" fill={INK} />
        {/* mouth: smile normally, round "hoo" while singing */}
        {singing ? (
          <ellipse cx="0" cy="-60" rx="4.5" ry="5.5" fill={INK} />
        ) : (
          <path
            d="M -6 -62 Q 0 -56 6 -62"
            fill="none"
            stroke={INK}
            strokeWidth="2"
            strokeLinecap="round"
          />
        )}
        {/* blush */}
        <circle cx="-14" cy="-66" r="3" fill="#ff9aa2" opacity="0.6" />
        <circle cx="14" cy="-66" r="3" fill="#ff9aa2" opacity="0.6" />
      </g>
      {singing && (
        <g className="em-monkey__hoo">
          <text
            x="34"
            y="-96"
            fontSize="15"
            fontWeight="700"
            fontFamily="Lato, Arial, sans-serif"
            fill={INK}
          >
            hoo!
          </text>
          <text
            x="40"
            y="-112"
            fontSize="12"
            fontFamily="Lato, Arial, sans-serif"
            fill={INK}
          >
            ♪
          </text>
        </g>
      )}
    </g>
  );
}

export default Monkey;
