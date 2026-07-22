import type { ArchitectureConnection, ArchitectureNode } from "@/types/portfolio";

type ArchitectureDiagramVariant = "standard" | "compact";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  connections: ArchitectureConnection[];
  /**
   * "standard" (default) is the original fixed-size layout, used by diagrams
   * with several columns (e.g. deployment) that already make good use of the
   * canvas. "compact" sizes each node to its own label/sublabel length
   * instead of a large fixed box, for mostly single-column diagrams whose
   * narrow natural width would otherwise get stretched to fill the container.
   */
  variant?: ArchitectureDiagramVariant;
}

interface PositionedNode extends ArchitectureNode {
  x: number;
  y: number;
  width: number;
}

interface DiagramSizing {
  nodeHeight: number;
  colGap: number;
  rowGap: number;
  padding: number;
  titleFontSize: number;
  sublabelFontSize: number;
  titleYOffsetWithSublabel: number;
  titleYOffsetNoSublabel: number;
  sublabelYOffset: number;
  /** Fixed width for every node. Ignored when contentDriven is true. */
  nodeWidth: number;
  /** Size each node from its own text instead of using a fixed nodeWidth. */
  contentDriven: boolean;
  minNodeWidth: number;
  maxNodeWidth: number;
  /** Rough average glyph advance width (px) used to estimate text width. */
  titleCharWidth: number;
  sublabelCharWidth: number;
  /** Total horizontal padding (both sides combined) around the text. */
  horizontalPadding: number;
}

const SIZING: Record<ArchitectureDiagramVariant, DiagramSizing> = {
  standard: {
    nodeWidth: 168,
    nodeHeight: 56,
    colGap: 56,
    rowGap: 72,
    padding: 32,
    titleFontSize: 13,
    sublabelFontSize: 10,
    titleYOffsetWithSublabel: 6,
    titleYOffsetNoSublabel: -2,
    sublabelYOffset: 12,
    contentDriven: false,
    minNodeWidth: 168,
    maxNodeWidth: 168,
    titleCharWidth: 0,
    sublabelCharWidth: 0,
    horizontalPadding: 0,
  },
  compact: {
    nodeWidth: 0,
    nodeHeight: 48,
    colGap: 32,
    rowGap: 32,
    padding: 28,
    titleFontSize: 13,
    sublabelFontSize: 10,
    titleYOffsetWithSublabel: 5,
    titleYOffsetNoSublabel: -2,
    sublabelYOffset: 10,
    contentDriven: true,
    minNodeWidth: 140,
    maxNodeWidth: 240,
    titleCharWidth: 7.4,
    sublabelCharWidth: 6.4,
    horizontalPadding: 28,
  },
};

function measureNodeWidth(node: ArchitectureNode, sizing: DiagramSizing): number {
  if (!sizing.contentDriven) return sizing.nodeWidth;
  const titlePx = node.label.length * sizing.titleCharWidth;
  const sublabelPx = node.sublabel ? node.sublabel.length * sizing.sublabelCharWidth : 0;
  const contentPx = Math.max(titlePx, sublabelPx) + sizing.horizontalPadding;
  return Math.min(sizing.maxNodeWidth, Math.max(sizing.minNodeWidth, contentPx));
}

function layout(
  nodes: ArchitectureNode[],
  sizing: DiagramSizing
): { positioned: PositionedNode[]; width: number; height: number } {
  const { nodeHeight, colGap, rowGap, padding } = sizing;
  const tiers = new Map<number, ArchitectureNode[]>();
  nodes.forEach((node) => {
    const tier = node.tier ?? 0;
    if (!tiers.has(tier)) tiers.set(tier, []);
    tiers.get(tier)!.push(node);
  });

  const sortedTiers = Array.from(tiers.keys()).sort((a, b) => a - b);
  const nodeWidths = new Map(nodes.map((n) => [n.id, measureNodeWidth(n, sizing)]));
  const rowWidth = (row: ArchitectureNode[]) =>
    row.reduce((sum, n) => sum + nodeWidths.get(n.id)!, 0) + (row.length - 1) * colGap;

  const contentWidth = Math.max(...sortedTiers.map((tier) => rowWidth(tiers.get(tier)!)));
  const width = padding * 2 + contentWidth;
  const height = padding * 2 + sortedTiers.length * nodeHeight + (sortedTiers.length - 1) * rowGap;

  const positioned: PositionedNode[] = [];
  sortedTiers.forEach((tier, rowIndex) => {
    const row = tiers.get(tier)!;
    let cursorX = padding + (contentWidth - rowWidth(row)) / 2;
    row.forEach((node) => {
      const w = nodeWidths.get(node.id)!;
      positioned.push({
        ...node,
        x: cursorX,
        y: padding + rowIndex * (nodeHeight + rowGap),
        width: w,
      });
      cursorX += w + colGap;
    });
  });

  return { positioned, width, height };
}

export function ArchitectureDiagram({ nodes, connections, variant = "standard" }: ArchitectureDiagramProps) {
  if (nodes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-fg-subtle">
        Architecture diagram will be added.
      </div>
    );
  }

  const sizing = SIZING[variant];
  const { positioned, width, height } = layout(nodes, sizing);
  const byId = new Map(positioned.map((n) => [n.id, n]));

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-bg-subtle p-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="System architecture diagram"
        className={variant === "compact" ? "mx-auto h-auto w-full" : "mx-auto h-auto w-full max-w-lg"}
        style={variant === "compact" ? { maxWidth: `${width}px` } : undefined}
      >
        <defs>
          <marker id="arch-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 Z" className="fill-fg-subtle" />
          </marker>
        </defs>

        {connections.map((conn, i) => {
          const from = byId.get(conn.from);
          const to = byId.get(conn.to);
          if (!from || !to) return null;
          const x1 = from.x + from.width / 2;
          const y1 = from.y + sizing.nodeHeight;
          const x2 = to.x + to.width / 2;
          const y2 = to.y;
          const midY = (y1 + y2) / 2;
          const path =
            Math.abs(x1 - x2) < 1
              ? `M${x1},${y1} L${x2},${y2}`
              : `M${x1},${y1} C${x1},${midY} ${x2},${midY} ${x2},${y2}`;
          return (
            <path
              key={`${conn.from}-${conn.to}-${i}`}
              d={path}
              fill="none"
              className="stroke-fg-subtle animate-flow-dash motion-reduce:animate-none"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              markerEnd="url(#arch-arrow)"
            />
          );
        })}

        {positioned.map((node) => (
          <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
            <rect
              width={node.width}
              height={sizing.nodeHeight}
              rx={8}
              className="fill-bg stroke-border-strong"
              strokeWidth={1}
            />
            <circle cx={14} cy={14} r={3} className="fill-accent animate-pulse-dot motion-reduce:animate-none" />
            <text
              x={node.width / 2}
              y={sizing.nodeHeight / 2 - (node.sublabel ? sizing.titleYOffsetWithSublabel : sizing.titleYOffsetNoSublabel)}
              textAnchor="middle"
              className="fill-fg font-medium"
              style={{ fontFamily: "var(--font-geist-sans)", fontSize: sizing.titleFontSize }}
            >
              {node.label}
            </text>
            {node.sublabel && (
              <text
                x={node.width / 2}
                y={sizing.nodeHeight / 2 + sizing.sublabelYOffset}
                textAnchor="middle"
                className="fill-fg-subtle uppercase"
                style={{ fontFamily: "var(--font-geist-mono)", letterSpacing: "0.04em", fontSize: sizing.sublabelFontSize }}
              >
                {node.sublabel}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
