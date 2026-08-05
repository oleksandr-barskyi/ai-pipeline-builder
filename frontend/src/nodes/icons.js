const iconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export const InputIcon = () => (
  <svg {...iconProps}>
    <path d="M3 12h11" />
    <path d="M10 8l4 4-4 4" />
    <path d="M17 4h3v16h-3" />
  </svg>
);

export const OutputIcon = () => (
  <svg {...iconProps}>
    <path d="M4 4h3v16H4" />
    <path d="M10 12h11" />
    <path d="M17 8l4 4-4 4" />
  </svg>
);

export const LlmIcon = () => (
  <svg {...iconProps}>
    <path d="M12 3l1.8 4.6L18.4 9l-4.6 1.8L12 15.4l-1.8-4.6L5.6 9l4.6-1.4L12 3z" />
    <path d="M18.5 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z" />
  </svg>
);

export const TextIcon = () => (
  <svg {...iconProps}>
    <path d="M5 6V4h14v2" />
    <path d="M12 4v16" />
    <path d="M9 20h6" />
  </svg>
);

export const ApiIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14.5 14.5 0 0 1 0 18a14.5 14.5 0 0 1 0-18" />
  </svg>
);

export const FilterIcon = () => (
  <svg {...iconProps}>
    <path d="M4 5h16l-6.5 8v5.5L10.5 20v-7L4 5z" />
  </svg>
);

export const TransformIcon = () => (
  <svg {...iconProps}>
    <path d="M20 8H7" />
    <path d="M10 4L6 8l4 4" />
    <path d="M4 16h13" />
    <path d="M14 12l4 4-4 4" />
  </svg>
);

export const ConditionIcon = () => (
  <svg {...iconProps}>
    <path d="M4 12h6" />
    <path d="M10 12c4 0 4-6 8-6h2" />
    <path d="M10 12c4 0 4 6 8 6h2" />
    <path d="M17 3l3 3-3 3" />
    <path d="M17 15l3 3-3 3" />
  </svg>
);

export const MergeIcon = () => (
  <svg {...iconProps}>
    <path d="M4 6h2c4 0 4 6 8 6h6" />
    <path d="M4 18h2c4 0 4-6 8-6" />
    <path d="M17 9l3 3-3 3" />
  </svg>
);

export const nodeIcons = {
  customInput: InputIcon,
  llm: LlmIcon,
  customOutput: OutputIcon,
  text: TextIcon,
  api: ApiIcon,
  filter: FilterIcon,
  transform: TransformIcon,
  condition: ConditionIcon,
  merge: MergeIcon,
};
