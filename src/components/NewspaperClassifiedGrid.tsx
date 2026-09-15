import React, { useState, useMemo } from 'react';
import { IklanBarisItem } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewspaperClassifiedGridProps {
  dynamicAds?: IklanBarisItem[];
  onSelectCategory?: (kategori: string) => void;
  onOpenForm?: () => void;
  siteName?: string;
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
  selectedKategori?: string;
  onPageChange?: (newPage: number) => void;
}

interface RenderedAdBlock {
  id: string;
  category: string;
  isDbItem?: boolean;
  dbData?: IklanBarisItem;
  text: string;
  ref: string;
  isHot?: boolean;
  wordCount: number;
}

// Utility to count words accurately
function countWords(str: string): number {
  if (!str) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function NewspaperClassifiedGrid({
  dynamicAds = [],
  onSelectCategory,
  onOpenForm,
  siteName = 'Parenting',
  currentPage = 1,
  totalPages = 1,
  totalCount = 0,
  selectedKategori = 'Semua',
  onPageChange,
}: NewspaperClassifiedGridProps) {

  const [activePageIndex, setActivePageIndex] = useState(0);

  // 1. Convert Database Items (`dynamicAds`) into Unified Ad Blocks
  const allBlocks = useMemo(() => {
    const blocks: RenderedAdBlock[] = [];

    dynamicAds.forEach((item) => {
      const kat = (item.kategori || 'LAIN-LAIN').toUpperCase();
      const text = `${item.keteranganBarang} Hrg: ${item.harga}. Hub: ${item.phone} (${item.nama} • ${item.kota})`;
      const ref = `DB/${String(item.id).padStart(5, '0')}/${new Date(item.createdAt || Date.now()).getFullYear()}`;
      
      blocks.push({
        id: `db-${item.id}`,
        category: kat,
        isDbItem: true,
        dbData: item,
        text,
        ref,
        isHot: item.status === 'published',
        wordCount: countWords(text) + 6,
      });
    });

    return blocks;
  }, [dynamicAds]);

  // 2. Group Ads by Category
  const categoryGroups = useMemo(() => {
    const groups: Record<string, RenderedAdBlock[]> = {};
    allBlocks.forEach((block) => {
      if (!groups[block.category]) groups[block.category] = [];
      groups[block.category].push(block);
    });
    return groups;
  }, [allBlocks]);

  const handlePrevPage = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } else if (activePageIndex > 0) {
      setActivePageIndex((prev) => Math.max(0, prev - 1));
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (onPageChange && currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    } else if (activePageIndex < totalPages - 1) {
      setActivePageIndex((prev) => prev + 1);
      window.scrollTo({ top: 350, behavior: 'smooth' });
    }
  };

  const canPrev = onPageChange ? currentPage > 1 : activePageIndex > 0;
  const canNext = onPageChange ? currentPage < totalPages : activePageIndex < totalPages - 1;
  const displayPage = onPageChange ? currentPage : activePageIndex + 1;
  const displayTotalPages = onPageChange ? totalPages : 1;

  return (
    <div className="newspaper-classified-container bg-white text-black p-3 sm:p-6 border-2 border-black rounded-sm font-serif select-text shadow-xl">
      
      {/* PAGINATION BANNER TOP */}
      <div className="bg-gray-100 border border-black p-2.5 mb-4 font-sans text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-tight">
            KORAN DIGITAL • {selectedKategori.toUpperCase()}
          </span>
          <span className="text-[11px] font-mono text-gray-600 font-semibold">
            (Halaman {displayPage} dari {displayTotalPages} • Max 20 Iklan/Hlm)
          </span>
        </div>

        {displayTotalPages > 1 && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              disabled={!canPrev}
              onClick={handlePrevPage}
              aria-label="Halaman Sebelumnya"
              className="px-3 py-1.5 bg-black text-white font-black text-xs uppercase disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center gap-1 border border-black rounded-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>&lt; Sblm</span>
            </button>

            <span className="font-mono font-bold text-xs px-2 bg-white border border-gray-400 py-1 rounded-sm">
              {displayPage} / {displayTotalPages}
            </span>

            <button
              disabled={!canNext}
              onClick={handleNextPage}
              aria-label="Halaman Selanjutnya"
              className="px-3 py-1.5 bg-black text-white font-black text-xs uppercase disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center gap-1 border border-black rounded-sm"
            >
              <span>Lanjut &gt;</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* MULTI-COLUMN DENSE PRINT NEWSPAPER GRID WITH LEFT-TO-RIGHT COLUMN FLOW */}
      <style>{`
        .newspaper-columns-flow {
          column-gap: 16px;
          column-fill: auto;
        }

        /* 1. SMARTPHONE VERTICAL (PORTRAIT): STRICTLY 1 KOLOM WITH ENLARGED READABLE TYPE */
        @media screen and (max-width: 639px) and (orientation: portrait) {
          .newspaper-columns-flow {
            column-count: 1 !important;
            max-height: none !important;
          }
          .newspaper-ad-item {
            font-size: 15.5px !important;
            line-height: 1.5 !important;
            padding: 7px 5px !important;
          }
          .newspaper-cat-header {
            font-size: 14.5px !important;
            padding: 6px 8px !important;
          }
        }

        /* 2. SMARTPHONE HORIZONTAL (LANDSCAPE): 2 KOLOM */
        @media screen and (max-width: 639px) and (orientation: landscape) {
          .newspaper-columns-flow {
            column-count: 2 !important;
            max-height: none !important;
          }
          .newspaper-ad-item {
            font-size: 14.5px !important;
            line-height: 1.45 !important;
            padding: 5px 4px !important;
          }
          .newspaper-cat-header {
            font-size: 13.5px !important;
          }
        }

        /* 3. TABLET & DESKTOP READABLE TYPE ENLARGEMENT */
        @media screen and (min-width: 640px) {
          .newspaper-ad-item {
            font-size: 15px !important;
            line-height: 1.5 !important;
            padding: 5px 4px !important;
          }
          .newspaper-cat-header {
            font-size: 14px !important;
            padding: 5px 8px !important;
          }
        }

        /* PREVENT AD ITEMS FROM SPLITTING HALFWAY ACROSS COLUMNS */
        .newspaper-block {
          break-inside: auto !important;
          page-break-inside: auto !important;
          -webkit-column-break-inside: auto !important;
          margin-bottom: 12px;
        }

        .newspaper-cat-header {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          -webkit-column-break-inside: avoid !important;
          break-after: avoid !important;
          background-color: #111111;
          color: #ffffff;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .newspaper-ad-item {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          -webkit-column-break-inside: avoid !important;
          border-bottom: 1px dotted #444444;
          color: #111111;
          background-color: #ffffff;
          overflow-wrap: anywhere !important;
          word-break: break-word !important;
          word-wrap: break-word !important;
          hyphens: auto !important;
        }
      `}</style>

      <div className="newspaper-columns-flow text-black overflow-hidden py-1">

        {Object.keys(categoryGroups).length === 0 && (
          <div className="py-12 text-center text-gray-500 font-sans text-sm font-semibold">
            Belum ada iklan baris di database.
          </div>
        )}

        {/* CATEGORY & AD BLOCKS FLOW */}
        {(Object.entries(categoryGroups) as Array<[string, RenderedAdBlock[]]>).map(([catName, blocks]) => (
          <div key={catName} className="newspaper-block mb-4">
            
            {/* CATEGORY HEADER BANNER */}
            <div 
              onClick={() => onSelectCategory && onSelectCategory(catName)}
              className="newspaper-cat-header cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-between"
            >
              <span>{catName}</span>
              <span className="text-xs font-sans font-normal opacity-90 font-mono">({blocks.length} iklan)</span>
            </div>

            {/* AD ITEMS IN THIS CATEGORY */}
            {blocks.map((block) => (
              <article
                key={block.id}
                className="newspaper-ad-item bg-white text-black border-b border-dashed border-gray-400 py-1.5 px-1 my-0.5"
              >
                <span>{block.text}</span>
                <span className="newspaper-ref-code text-[10px] text-right font-mono text-gray-500 block mt-0.5 font-bold">
                  {block.ref}
                </span>
              </article>
            ))}

            {/* PAGINATION PER CATEGORY SECTION AT THE BOTTOM */}
            {displayTotalPages > 1 && (
              <div className="mt-2 pt-1 border-t border-gray-300 flex items-center justify-between font-sans text-[11px] font-bold text-gray-700 bg-gray-50 p-1">
                <span>Paginasi [{catName}]</span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={!canPrev}
                    onClick={handlePrevPage}
                    aria-label={`Halaman sebelumnya ${catName}`}
                    className="px-2 py-0.5 bg-black text-white rounded text-[10px] disabled:opacity-30 hover:bg-gray-700"
                  >
                    &lt; Sblm
                  </button>
                  <span className="font-mono text-[10px] px-1">{displayPage}/{displayTotalPages}</span>
                  <button
                    disabled={!canNext}
                    onClick={handleNextPage}
                    aria-label={`Halaman selanjutnya ${catName}`}
                    className="px-2 py-0.5 bg-black text-white rounded text-[10px] disabled:opacity-30 hover:bg-gray-700"
                  >
                    Lanjut &gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

      </div>

      {/* BOTTOM PAGINATOR CONTROLS (< AND > ARROWS) */}
      {displayTotalPages > 1 && (
        <div className="border-t-2 border-black pt-3 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 p-3 font-sans rounded-sm">
          <div className="text-xs font-extrabold text-gray-900 font-mono">
            Halaman {displayPage} dari {displayTotalPages} (Total {totalCount || dynamicAds.length} Iklan)
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={!canPrev}
              onClick={handlePrevPage}
              aria-label="Halaman Sebelumnya"
              className="px-4 py-2 bg-black text-white font-black text-xs uppercase disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center gap-1.5 border border-black rounded-sm shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>&lt; Halaman Sebelumnya</span>
            </button>

            <span className="font-mono text-xs font-black px-3 py-1.5 bg-white border border-black rounded-sm">
              {displayPage} / {displayTotalPages}
            </span>

            <button
              disabled={!canNext}
              onClick={handleNextPage}
              aria-label="Halaman Selanjutnya"
              className="px-4 py-2 bg-black text-white font-black text-xs uppercase disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center gap-1.5 border border-black rounded-sm shadow-sm"
            >
              <span>Halaman Selanjutnya &gt;</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
