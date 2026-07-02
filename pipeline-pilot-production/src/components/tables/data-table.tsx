'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Download,
  SlidersHorizontal,
  Inbox,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortAccessor?: (row: T) => string | number;
  width?: string;
  align?: 'left' | 'right' | 'center';
  hideable?: boolean;
  defaultHidden?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  getRowId: (row: T) => string;
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchKeys?: (keyof T)[];
  selectable?: boolean;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: React.ReactNode;
  toolbar?: React.ReactNode;
  exportFilename?: string;
  className?: string;
  initialSort?: { key: string; dir: 'asc' | 'desc' };
}

export function DataTable<T>({
  data,
  columns,
  getRowId,
  onRowClick,
  searchable = true,
  searchPlaceholder = 'Search…',
  searchKeys,
  selectable = true,
  pageSize = 10,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search or filters.',
  emptyAction,
  toolbar,
  exportFilename = 'export.csv',
  className,
  initialSort,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<{ key: string; dir: 'asc' | 'desc' } | null>(initialSort || null);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());
  const [hiddenCols, setHiddenCols] = React.useState<Set<string>>(
    new Set(columns.filter((c) => c.defaultHidden).map((c) => c.key))
  );

  // Filter
  const filtered = React.useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.filter((row) => {
      if (searchKeys) {
        return searchKeys.some((k) =>
          String(row[k] ?? '').toLowerCase().includes(q)
        );
      }
      return Object.values(row as Record<string, unknown>).some((v) =>
        String(v ?? '').toLowerCase().includes(q)
      );
    });
  }, [data, search, searchKeys]);

  // Sort
  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortAccessor) return filtered;
    return [...filtered].sort((a, b) => {
      const av = col.sortAccessor!(a);
      const bv = col.sortAccessor!(b);
      if (typeof av === 'number' && typeof bv === 'number') {
        return sort.dir === 'asc' ? av - bv : bv - av;
      }
      return sort.dir === 'asc'
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [filtered, sort, columns]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (prev?.key === key) {
        return { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
      }
      return { key, dir: 'asc' };
    });
  };

  const toggleSelectAll = () => {
    if (selected.size === paginated.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(paginated.map(getRowId)));
    }
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleColumn = (key: string) => {
    setHiddenCols((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const exportCsv = () => {
    const visibleCols = columns.filter((c) => !hiddenCols.has(c.key));
    const header = visibleCols.map((c) => `"${c.header}"`).join(',');
    const rows = sorted.map((row) =>
      visibleCols
        .map((c) => {
          const cellContent = c.cell(row);
          // Try to get string content from cell
          const text =
            typeof cellContent === 'string' || typeof cellContent === 'number'
              ? String(cellContent)
              : '';
          return `"${text.replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = exportFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const visibleColumns = columns.filter((c) => !hiddenCols.has(c.key));
  const allOnPageSelected = paginated.length > 0 && selected.size === paginated.length;

  return (
    <div className={cn('bg-card border border-border rounded-xl overflow-hidden', className)}>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-9 w-56 h-9 bg-secondary border-border"
              />
            </div>
          )}
          {toolbar}
        </div>
        <div className="flex items-center gap-2">
          {selectable && selected.size > 0 && (
            <span className="text-xs text-muted-foreground mr-2">
              {selected.size} selected
            </span>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 bg-transparent">
                <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {columns
                .filter((c) => c.hideable !== false)
                .map((c) => (
                  <DropdownMenuCheckboxItem
                    key={c.key}
                    checked={!hiddenCols.has(c.key)}
                    onCheckedChange={() => toggleColumn(c.key)}
                  >
                    {c.header}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm" onClick={exportCsv} className="h-9 bg-transparent">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectable && selected.size > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 bg-accent/5 border-b border-accent/20 animate-in slide-in-from-top-2 duration-200">
          <span className="text-xs font-medium text-accent">{selected.size} selected</span>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="ghost" className="h-7 text-xs">Bulk edit</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs">Assign</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs text-destructive hover:text-destructive">Delete</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40">
              {selectable && (
                <th className="w-10 py-3 px-4">
                  <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all"
                  />
                </th>
              )}
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'py-3 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap',
                    col.align === 'right' && 'text-right',
                    col.align === 'center' && 'text-center',
                    !col.align && 'text-left'
                  )}
                  style={{ width: col.width }}
                >
                  {col.sortable ? (
                    <button
                      onClick={() => toggleSort(col.key)}
                      className={cn(
                        'inline-flex items-center gap-1 hover:text-foreground transition-colors',
                        col.align === 'right' && 'flex-row-reverse'
                      )}
                    >
                      {col.header}
                      {sort?.key === col.key ? (
                        sort.dir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                      ) : (
                        <ArrowUpDown className="w-3 h-3 opacity-40" />
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              ))}
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectable ? 2 : 1)} className="py-16">
                  <div className="flex flex-col items-center text-center px-6">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
                      <Inbox className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground">{emptyTitle}</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-xs">{emptyDescription}</p>
                    {emptyAction && <div className="mt-4">{emptyAction}</div>}
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => {
                const id = getRowId(row);
                const isSelected = selected.has(id);
                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick?.(row)}
                    className={cn(
                      'border-b border-border last:border-0 hover:bg-secondary/30 transition-colors duration-150 group',
                      onRowClick && 'cursor-pointer',
                      isSelected && 'bg-accent/5',
                      'animate-in fade-in slide-in-from-bottom-1'
                    )}
                    style={{ animationDelay: `${Math.min(i, 8) * 30}ms`, animationFillMode: 'both' }}
                  >
                    {selectable && (
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(id)}
                          aria-label={`Select row ${id}`}
                        />
                      </td>
                    )}
                    {visibleColumns.map((col) => (
                      <td
                        key={col.key}
                        className={cn(
                          'py-3 px-4 text-foreground',
                          col.align === 'right' && 'text-right tabular-nums',
                          col.align === 'center' && 'text-center'
                        )}
                      >
                        {col.cell(row)}
                      </td>
                    ))}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className="w-7 h-7 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-4 py-3 border-t border-border bg-secondary/30">
        <span className="text-xs text-muted-foreground">
          Showing <span className="font-medium text-foreground">{paginated.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</span>
          {' '}to{' '}
          <span className="font-medium text-foreground">{Math.min(currentPage * pageSize, sorted.length)}</span>
          {' '}of{' '}
          <span className="font-medium text-foreground">{sorted.length}</span>
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-transparent"
            disabled={currentPage === 1}
            onClick={() => setPage(1)}
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-transparent"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground px-2">
            Page <span className="font-medium text-foreground">{currentPage}</span> of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-transparent"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 bg-transparent"
            disabled={currentPage === totalPages}
            onClick={() => setPage(totalPages)}
          >
            <ChevronsRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
