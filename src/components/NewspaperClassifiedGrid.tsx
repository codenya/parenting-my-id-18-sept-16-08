import React, { useState, useMemo } from 'react';
import { IklanBarisItem } from '../types';

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

export default function NewspaperClassifiedGrid({
  dynamicAds = [],
  onSelectCategory,
  onOpenForm,
  siteName = 'Portal Digital',
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
        wordCount: text.split(/\s+/).length,
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

  const buildPageUrl = (targetPage: number, catName?: string) => {
    const cat = catName || selectedKategori;
    const catParam = cat && cat !== 'Semua' ? `&kategori=${encodeURIComponent(cat)}` : '';
    return `?page=${targetPage}${catParam}`;
  };

  return (
    <div className="newspaper-classified-container bg-white text-black p-3 sm:p-6 border-2 border-black rounded-sm font-serif select-text shadow-xl">
      
      {/* PAGINATION BANNER TOP */}
      <div className="bg-gray-100 border border-black p-2.5 mb-4 font-sans text-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900 text-xs sm:text-sm uppercase tracking-tight">
            KORAN DIGITAL • {selectedKategori.toUpperCase()}
          </span>
        </div>

        {displayTotalPages > 1 && (
          <div className="pagination-simple flex items-center gap-2 shrink-0">
            <a
              href={buildPageUrl(Math.max(1, displayPage - 1))}
              onClick={(e) => {
                e.preventDefault();
                handlePrevPage();
              }}
              aria-label="Halaman Sebelumnya"
              className={`btn-nav px-3 py-1 bg-black text-white font-black text-xs uppercase transition-colors flex items-center justify-center border border-black rounded-sm ${!canPrev ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-800'}`}
            >
              &lt;
            </a>

            <span className="font-mono font-bold text-xs px-2.5 bg-white border border-gray-400 py-1 rounded-sm">
              {displayPage} / {displayTotalPages}
            </span>

            <a
              href={buildPageUrl(Math.min(displayTotalPages, displayPage + 1))}
              onClick={(e) => {
                e.preventDefault();
                handleNextPage();
              }}
              aria-label="Halaman Selanjutnya"
              className={`btn-nav px-3 py-1 bg-black text-white font-black text-xs uppercase transition-colors flex items-center justify-center border border-black rounded-sm ${!canNext ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-800'}`}
            >
              &gt;
            </a>
          </div>
        )}
      </div>

      {/* MULTI-COLUMN DENSE PRINT NEWSPAPER GRID WITH LEFT-TO-RIGHT COLUMN FLOW */}
      <style>{`
        .newspaper-columns-flow {
          column-gap: 16px;
          column-fill: auto;
        }

        /* 1. SMARTPHONE VERTICAL (PORTRAIT): 1 KOLOM WITH ENLARGED PRINT TYPOGRAPHY */
        @media screen and (max-width: 639px) and (orientation: portrait) {
          .newspaper-columns-flow {
            column-count: 1 !important;
            max-height: none !important;
          }
          .newspaper-ad-item {
            font-size: 0.95rem !important; /* ~15.2px */
            line-height: 1.5 !important;
            padding: 8px 6px !important;
          }
          .kategori-title {
            font-size: 0.95rem !important;
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
            font-size: 0.9rem !important;
            line-height: 1.45 !important;
            padding: 6px 5px !important;
          }
          .kategori-title {
            font-size: 0.875rem !important;
          }
        }

        /* 3. TABLET & DESKTOP READABLE TYPE ENLARGEMENT (0.95rem - 1rem) */
        @media screen and (min-width: 640px) {
          .newspaper-ad-item {
            font-size: 0.95rem !important; /* ~15.2px to 16px */
            line-height: 1.55 !important;
            padding: 6px 6px !important;
          }
          .kategori-title {
            font-size: 0.9rem !important;
            padding: 6px 10px !important;
          }
        }

        .newspaper-block {
          break-inside: auto !important;
          page-break-inside: auto !important;
          -webkit-column-break-inside: auto !important;
          margin-bottom: 14px;
        }

        .kategori-title {
          break-inside: avoid !important;
          page-break-inside: avoid !important;
          -webkit-column-break-inside: avoid !important;
          break-after: avoid !important;
          background-color: #111111;
          color: #ffffff;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid #000000;
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

        .kode-db {
          font-family: monospace;
          font-size: 0.7rem;
          color: #666666;
          float: right;
          font-weight: 700;
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
          <div key={catName} className="kategori-block newspaper-block mb-4">
            
            {/* CLEAN CATEGORY HEADER TITLE WITHOUT AD COUNT NUMBERS */}
            <h3 
              onClick={() => onSelectCategory && onSelectCategory(catName)}
              className="kategori-title cursor-pointer hover:bg-gray-800 transition-colors block m-0"
            >
              {catName}
            </h3>

            {/* AD ITEMS LIST IN THIS CATEGORY */}
            <div className="iklan-list koran-style">
              {blocks.map((block) => (
                <article
                  key={block.id}
                  className="iklan-item newspaper-ad-item bg-white text-black border-b border-dashed border-gray-400 py-1.5 px-1 my-0.5"
                >
                  <p className="iklan-teks m-0">
                    <span>{block.text}</span>
                    <span className="kode-db block text-right mt-0.5 font-bold">
                      {block.ref}
                    </span>
                  </p>
                </article>
              ))}
            </div>

            {/* RINGKAS CATEGORY PAGINATION (ONLY ARROWS < AND >) */}
            {displayTotalPages > 1 && (
              <div className="pagination-simple mt-2 pt-1.5 border-t border-gray-300 flex items-center justify-end gap-1.5 font-sans">
                <a
                  href={buildPageUrl(Math.max(1, displayPage - 1), catName)}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePrevPage();
                  }}
                  aria-label="Halaman Sebelumnya"
                  className={`btn-nav inline-flex items-center justify-center w-7 h-7 bg-black text-white font-black text-xs rounded border border-black transition-opacity ${!canPrev ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-800'}`}
                >
                  &lt;
                </a>
                <a
                  href={buildPageUrl(Math.min(displayTotalPages, displayPage + 1), catName)}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNextPage();
                  }}
                  aria-label="Halaman Selanjutnya"
                  className={`btn-nav inline-flex items-center justify-center w-7 h-7 bg-black text-white font-black text-xs rounded border border-black transition-opacity ${!canNext ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-800'}`}
                >
                  &gt;
                </a>
              </div>
            )}
          </div>
        ))}

      </div>

      {/* BOTTOM PAGINATOR CONTROLS (< AND > ARROWS ONLY) */}
      {displayTotalPages > 1 && (
        <div className="pagination-simple border-t-2 border-black pt-3 mt-4 flex items-center justify-between gap-3 bg-gray-50 p-3 font-sans rounded-sm">
          <div className="text-xs font-extrabold text-gray-900 font-mono">
            Halaman {displayPage} / {displayTotalPages}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={buildPageUrl(Math.max(1, displayPage - 1))}
              onClick={(e) => {
                e.preventDefault();
                handlePrevPage();
              }}
              aria-label="Halaman Sebelumnya"
              className={`btn-nav px-4 py-2 bg-black text-white font-black text-xs uppercase transition-colors flex items-center justify-center gap-1 border border-black rounded-sm shadow-sm ${!canPrev ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-800'}`}
            >
              &lt;
            </a>

            <span className="font-mono text-xs font-black px-3 py-1.5 bg-white border border-black rounded-sm">
              {displayPage} / {displayTotalPages}
            </span>

            <a
              href={buildPageUrl(Math.min(displayTotalPages, displayPage + 1))}
              onClick={(e) => {
                e.preventDefault();
                handleNextPage();
              }}
              aria-label="Halaman Selanjutnya"
              className={`btn-nav px-4 py-2 bg-black text-white font-black text-xs uppercase transition-colors flex items-center justify-center gap-1 border border-black rounded-sm shadow-sm ${!canNext ? 'opacity-30 pointer-events-none' : 'hover:bg-gray-800'}`}
            >
              &gt;
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

