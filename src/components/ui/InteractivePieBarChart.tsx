'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DataItem {
  name: string;
  amount: number;
  percentage: number;
  color: string;
}

interface InteractivePieBarChartProps {
  data: DataItem[];
  height?: number;
}

/**
 * Interactive Pie-to-Bar Chart
 * - Hover: Other segments fade out
 * - Click: Toggles between pie and bar view
 */
export function InteractivePieBarChart({ data, height = 180 }: InteractivePieBarChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'pie' | 'bar'>('pie');

  const total = useMemo(() => data.reduce((sum, d) => sum + d.amount, 0), [data]);
  const maxAmount = useMemo(() => Math.max(...data.map(d => d.amount)), [data]);

  // Click toggles between pie and bar view
  const handleClick = () => {
    setViewMode(viewMode === 'pie' ? 'bar' : 'pie');
  };

  // Calculate pie slices
  const pieSlices = useMemo(() => {
    let currentAngle = -90; // Start from top
    return data.map((item, index) => {
      const angle = (item.amount / total) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      // Calculate path for pie slice
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      const radius = 70;
      const innerRadius = 40;
      const cx = 90;
      const cy = 90;

      const x1 = cx + radius * Math.cos(startRad);
      const y1 = cy + radius * Math.sin(startRad);
      const x2 = cx + radius * Math.cos(endRad);
      const y2 = cy + radius * Math.sin(endRad);
      const x3 = cx + innerRadius * Math.cos(endRad);
      const y3 = cy + innerRadius * Math.sin(endRad);
      const x4 = cx + innerRadius * Math.cos(startRad);
      const y4 = cy + innerRadius * Math.sin(startRad);

      const largeArc = angle > 180 ? 1 : 0;

      const path = `
        M ${x1} ${y1}
        A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
        L ${x3} ${y3}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
        Z
      `;

      // Label position (middle of arc, outside)
      const midAngle = (startAngle + endAngle) / 2;
      const midRad = (midAngle * Math.PI) / 180;
      const labelRadius = radius + 15;
      const labelX = cx + labelRadius * Math.cos(midRad);
      const labelY = cy + labelRadius * Math.sin(midRad);

      return { path, labelX, labelY, midAngle, item, index };
    });
  }, [data, total]);

  // Sort data for bar view by amount (descending)
  const sortedForBar = useMemo(() => {
    return [...data]
      .map((item, originalIndex) => ({ item, originalIndex }))
      .sort((a, b) => b.item.amount - a.item.amount);
  }, [data]);

  // Only fade non-hovered items on hover
  const isItemActive = (index: number) => {
    return hoveredIndex === null || hoveredIndex === index;
  };

  return (
    <div className="relative flex flex-col" style={{ height }}>
      <AnimatePresence mode="wait">
        {viewMode === 'pie' ? (
          <motion.div
            key="pie"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-full"
          >
            <svg width="280" height="180" viewBox="0 0 280 180">
              {/* Donut chart centered at 140, 90 */}
              <g transform="translate(50, 0)">
                {pieSlices.map(({ path, item, index }) => (
                  <motion.path
                    key={index}
                    d={path}
                    fill={item.color}
                    stroke="white"
                    strokeWidth={2}
                    style={{ cursor: 'pointer' }}
                    initial={{ opacity: 1 }}
                    animate={{
                      opacity: isItemActive(index) ? 1 : 0.25,
                      scale: hoveredIndex === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={handleClick}
                  />
                ))}
                {/* Center text */}
                <text
                  x="90"
                  y="85"
                  textAnchor="middle"
                  className="text-xs fill-[var(--text-muted)]"
                >
                  Total
                </text>
                <text
                  x="90"
                  y="100"
                  textAnchor="middle"
                  className="text-sm font-bold fill-[var(--text-primary)]"
                >
                  ${(total / 1000).toFixed(1)}B
                </text>
              </g>

              {/* Labels around the donut */}
              {pieSlices.map(({ labelX, labelY, midAngle, item, index }) => {
                // Determine text anchor based on position (left or right of center)
                const isRightSide = midAngle > -90 && midAngle < 90;
                const adjustedX = labelX + 50; // Account for the g transform

                return (
                  <g key={`label-${index}`}>
                    <text
                      x={adjustedX}
                      y={labelY - 5}
                      textAnchor={isRightSide ? 'start' : 'end'}
                      className="text-[9px] fill-[var(--text-body)] font-medium"
                      style={{ pointerEvents: 'none' }}
                    >
                      {item.name}
                    </text>
                    <text
                      x={adjustedX}
                      y={labelY + 6}
                      textAnchor={isRightSide ? 'start' : 'end'}
                      className="text-[8px] fill-[var(--text-muted)]"
                      style={{ pointerEvents: 'none' }}
                    >
                      {item.percentage}%
                    </text>
                  </g>
                );
              })}
            </svg>
          </motion.div>
        ) : (
          <motion.div
            key="bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="h-full overflow-y-auto pr-2"
          >
            <div className="space-y-1.5">
              {sortedForBar.map(({ item, originalIndex }, sortedIndex) => {
                const barWidth = (item.amount / maxAmount) * 100;

                return (
                  <motion.div
                    key={originalIndex}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isItemActive(originalIndex) ? 1 : 0.3,
                      x: 0,
                    }}
                    transition={{ duration: 0.3, delay: sortedIndex * 0.03 }}
                    className="cursor-pointer group"
                    onMouseEnter={() => setHoveredIndex(originalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={handleClick}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-[10px] w-24 truncate text-[var(--text-muted)]">
                        {item.name}
                      </span>
                      <div className="flex-1 h-4 bg-[var(--bg-secondary)] relative overflow-hidden">
                        <motion.div
                          className="h-full"
                          style={{ backgroundColor: item.color }}
                          initial={{ width: 0 }}
                          animate={{ width: `${barWidth}%` }}
                          transition={{ duration: 0.5, delay: sortedIndex * 0.05 }}
                        />
                        <span className="absolute left-1 top-0 h-full flex items-center text-[9px] font-serif text-white">
                          ${item.amount}M
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View mode toggle hint - below chart */}
      <div className="text-center text-[10px] text-[var(--text-muted)] mt-2">
        {viewMode === 'pie' ? 'Click to compare' : 'Click to return'}
      </div>
    </div>
  );
}
