'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  className?: string;
  headerClassName?: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  onRowClick?: (row: T) => void;
  emptyState?: React.ReactNode;
  pageSize?: number;
  enablePagination?: boolean;
  enableSort?: boolean;
  className?: string;
  dense?: boolean;
}

type SortState = { key: string; direction: 'asc' | 'desc' } | null;

export function DataTable<T>({
  columns,
  data,
  rowKey,
  onRowClick,
  emptyState,
  pageSize = 10,
  enablePagination = false,
  enableSort = false,
  className,
  dense,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null);
  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    setPage(0);
  }, [data.length]);

  const sortedData = React.useMemo(() => {
    if (!sort || !enableSort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;
    const getVal = col.sortValue ?? ((row: T) => String((row as Record<string, unknown>)[col.key]));
    return [...data].sort((a, b) => {
      const va = getVal(a);
      const vb = getVal(b);
      if (typeof va === 'number' && typeof vb === 'number') {
        return sort.direction === 'asc' ? va - vb : vb - va;
      }
      const sa = String(va);
      const sb = String(vb);
      return sort.direction === 'asc' ? sa.localeCompare(sb) : sb.localeCompare(sa);
    });
  }, [data, sort, columns, enableSort]);

  const pagedData = React.useMemo(() => {
    if (!enablePagination) return sortedData;
    const start = page * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, page, pageSize, enablePagination]);

  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));

  function handleSort(key: string) {
    if (!enableSort) return;
    setSort((current) => {
      if (!current || current.key !== key) return { key, direction: 'asc' };
      if (current.direction === 'asc') return { key, direction: 'desc' };
      return null;
    });
  }

  function renderSortIcon(col: Column<T>) {
    if (!col.sortable || !enableSort) return null;
    if (!sort || sort.key !== col.key) {
      return <ChevronsUpDown className="size-3.5 opacity-50" />;
    }
    return sort.direction === 'asc' ? (
      <ChevronUp className="size-3.5 text-[var(--color-brand-500)]" />
    ) : (
      <ChevronDown className="size-3.5 text-[var(--color-brand-500)]" />
    );
  }

  const alignClass = {
    left: 'text-left',
    right: 'text-right',
    center: 'text-center',
  };

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="overflow-x-auto modern-scrollbar">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-muted)]',
                    alignClass[col.align ?? 'left'],
                    col.headerClassName,
                  )}
                  style={{ width: col.width }}
                >
                  {col.sortable && enableSort ? (
                    <button
                      type="button"
                      onClick={() => handleSort(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1.5 transition hover:text-[var(--text-strong)]',
                        col.align === 'right' && 'flex-row-reverse',
                      )}
                    >
                      <span>{col.header}</span>
                      {renderSortIcon(col)}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-4 py-10 text-center">
                  {emptyState ?? (
                    <p className="text-sm font-medium text-[var(--text-muted)]">No records found.</p>
                  )}
                </td>
              </tr>
            ) : (
              pagedData.map((row) => (
                <tr
                  key={rowKey(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'border-b border-[var(--border-subtle)] transition-colors',
                    onRowClick && 'cursor-pointer',
                    'hover:bg-[var(--surface-sunken)]',
                  )}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        dense ? 'px-4 py-2.5' : 'px-4 py-3.5',
                        'text-[var(--text-body)]',
                        alignClass[col.align ?? 'left'],
                        col.className,
                      )}
                    >
                      {col.cell(row)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {enablePagination && sortedData.length > pageSize && (
        <div className="flex items-center justify-between gap-3 border-t border-[var(--border-subtle)] px-4 py-3">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Showing{' '}
            <span className="font-medium text-[var(--text-strong)]">
              {page * pageSize + 1}–{Math.min((page + 1) * pageSize, sortedData.length)}
            </span>{' '}
            of <span className="font-medium text-[var(--text-strong)]">{sortedData.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="px-2 text-xs font-medium text-[var(--text-body)]">
              {page + 1} / {totalPages}
            </span>
            <button
              type="button"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              className="inline-flex size-8 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text-muted)] transition hover:bg-[var(--surface-sunken)] hover:text-[var(--text-strong)] disabled:opacity-40 disabled:hover:bg-transparent"
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
