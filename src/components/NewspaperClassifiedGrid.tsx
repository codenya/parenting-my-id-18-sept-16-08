import React, { useState, useMemo } from 'react';
import { IklanBarisItem } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NewspaperClassifiedGridProps {
  dynamicAds?: IklanBarisItem[];
  onSelectCategory?: (kategori: string) => void;
  onOpenForm?: () => void;
  siteName?: string;
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
}: NewspaperClassifiedGridProps) {

  const [activePageIndex, setActivePageIndex] = useState(0);
  const MAX_WORDS_PER_PAGE = 2000;

  // 1. Convert Database Items (`dynamicAds`) into Unified Ad Blocks (ONLY real DB ads)
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

  // 3. Paginate Categories & Blocks strictly by MAX 2000 Words Per Page
  const pages = useMemo(() => {
    const pageList: Array<{
      pageNumber: number;
      categories: Record<string, RenderedAdBlock[]>;
      totalWords: number;
      totalItems: number;
    }> = [];

    let currentCategories: Record<string, RenderedAdBlock[]> = {};
    let currentWords = 0;
    let currentItemsCount = 0;

    // Header masthead words (~50 words)
    const mastheadWords = 45;
    currentWords += mastheadWords;

    const categoriesList = Object.keys(categoryGroups);

    categoriesList.forEach((catName) => {
      const catBlocks = categoryGroups[catName];
      const categoryHeaderWords = countWords(catName) + 3;

      catBlocks.forEach((block) => {
        const itemWords = block.wordCount;

        // Check if adding this block exceeds 2000 words limit for current page
        if (currentWords + itemWords > MAX_WORDS_PER_PAGE && currentItemsCount > 0) {
          // Push current page
          pageList.push({
            pageNumber: pageList.length + 1,
            categories: currentCategories,
            totalWords: currentWords,
            totalItems: currentItemsCount,
          });

          // Reset for new page
          currentCategories = {};
          currentWords = mastheadWords;
          currentItemsCount = 0;
        }

        if (!currentCategories[catName]) {
          currentCategories[catName] = [];
          currentWords += categoryHeaderWords;
        }

        currentCategories[catName].push(block);
        currentWords += itemWords;
        currentItemsCount += 1;
      });
    });

    if (currentItemsCount > 0) {
      pageList.push({
        pageNumber: pageList.length + 1,
        categories: currentCategories,
        totalWords: currentWords,
        totalItems: currentItemsCount,
      });
    }

    return pageList.length > 0
      ? pageList
      : [
          {
            pageNumber: 1,
            categories: {},
            totalWords: mastheadWords,
            totalItems: 0,
          },
        ];
  }, [categoryGroups]);

  // Ensure active page is within bounds
  const currentPageData = pages[activePageIndex] || pages[0];
  const totalPagesCount = pages.length;

  return (
    <div className="newspaper-classified-container bg-white text-black p-2 sm:p-5 border-2 border-black rounded-sm font-serif select-text shadow-xl">
      
      {/* PAGINATION BANNER */}
      <div className="bg-gray-100 border border-black p-2 mb-4 font-sans text-xs flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="font-bold text-slate-800 text-[11px]">
          Halaman {currentPageData.pageNumber} dari {totalPagesCount}
        </span>

        {totalPagesCount > 1 && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              disabled={activePageIndex === 0}
              onClick={() => setActivePageIndex((prev) => Math.max(0, prev - 1))}
              className="px-2.5 py-1 bg-white border border-black text-black font-black text-xs uppercase disabled:opacity-40 hover:bg-black hover:text-white transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Sblmnya
            </button>
            
            <span className="font-mono font-bold text-xs px-2">
              {activePageIndex + 1} / {totalPagesCount}
            </span>

            <button
              disabled={activePageIndex >= totalPagesCount - 1}
              onClick={() => setActivePageIndex((prev) => Math.min(totalPagesCount - 1, prev + 1))}
              className="px-2.5 py-1 bg-white border border-black text-black font-black text-xs uppercase disabled:opacity-40 hover:bg-black hover:text-white transition-colors flex items-center gap-1"
            >
              Lanjut
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* MULTI-COLUMN DENSE PRINT NEWSPAPER GRID WITH LEFT-TO-RIGHT COLUMN FLOW (column-fill: auto) */}
      <style>{`
        .newspaper-columns-flow {
          column-gap: 12px;
          column-fill: auto;
        }

        /* 1. SMARTPHONE VERTICAL (PORTRAIT): MAX 2 KOLOM */
        @media screen and (max-width: 639px) and (orientation: portrait) {
          .newspaper-columns-flow {
            column-count: 2 !important;
            max-height: none !important;
          }
        }

        /* 2. SMARTPHONE HORIZONTAL (LANDSCAPE): MAX 2 KOLOM */
        @media screen and (max-width: 639px) and (orientation: landscape) {
          .newspaper-columns-flow {
            column-count: 2 !important;
            max-height: 850px;
          }
        }

        /* 3. TABLET VERTICAL (PORTRAIT): MAX 2 KOLOM */
        @media screen and (min-width: 640px) and (max-width: 1023px) and (orientation: portrait) {
          .newspaper-columns-flow {
            column-count: 2 !important;
            max-height: 900px;
          }
        }

        /* 4. TABLET HORIZONTAL (LANDSCAPE): MAX 4 KOLOM */
        @media screen and (min-width: 640px) and (max-width: 1023px) and (orientation: landscape) {
          .newspaper-columns-flow {
            column-count: 4 !important;
            max-height: 720px;
          }
        }

        /* 5. DESKTOP VERTICAL (PORTRAIT DISPLAY): MAX 3 KOLOM */
        @media screen and (min-width: 1024px) and (orientation: portrait) {
          .newspaper-columns-flow {
            column-count: 3 !important;
            max-height: 1100px;
          }
        }

        /* 6. DESKTOP HORIZONTAL (LANDSCAPE DISPLAY): MAX 5 KOLOM */
        @media screen and (min-width: 1024px) and (orientation: landscape) {
          .newspaper-columns-flow {
            column-count: 5 !important;
            max-height: 750px;
          }
        }

        /* DEFAULT FALLBACKS */
        @media screen and (max-width: 639px) {
          .newspaper-columns-flow {
            column-count: 2;
          }
        }
        @media screen and (min-width: 640px) and (max-width: 1023px) {
          .newspaper-columns-flow {
            column-count: 2;
          }
        }
        @media screen and (min-width: 1024px) {
          .newspaper-columns-flow {
            column-count: 5;
          }
        }

        /* SMART WORD BREAKING FOR STRINGS WITHOUT SPACES & EASY READABILITY FOR ELDERLY EYES */
        .newspaper-ad-item, .newspaper-block {
          overflow-wrap: anywhere !important;
          word-break: break-all !important;
          word-wrap: break-word !important;
          hyphens: auto !important;
        }
      `}</style>

      <div className="newspaper-columns-flow text-black overflow-hidden py-1">

        {Object.keys(currentPageData.categories).length === 0 && (
          <div className="py-12 text-center text-gray-500 font-sans text-sm font-semibold">
            Belum ada iklan baris di database.
          </div>
        )}

        {/* CATEGORY & AD BLOCKS FLOW */}
        {(Object.entries(currentPageData.categories) as Array<[string, RenderedAdBlock[]]>).map(([catName, blocks]) => (
          <div key={catName} className="newspaper-block mb-3 break-inside-avoid">
            
            {/* CATEGORY HEADER BANNER (SOLID BLACK, INVERTED WHITE TEXT) */}
            <div 
              onClick={() => onSelectCategory && onSelectCategory(catName)}
              className="newspaper-cat-header cursor-pointer hover:bg-gray-800 transition-colors flex items-center justify-between"
            >
              <span>{catName}</span>
              <span className="text-[9px] font-sans font-normal opacity-80">({blocks.length})</span>
            </div>

            {/* AD ITEMS IN THIS CATEGORY */}
            {blocks.map((block) => (
              <div
                key={block.id}
                className="newspaper-ad-item bg-white text-black border-b border-dashed border-gray-400 py-1 px-1 my-0.5"
              >
                <span>{block.text}</span>
                <span className="newspaper-ref-code text-[9px] text-right font-mono text-gray-500 block mt-0.5">
                  {block.ref}
                </span>
              </div>
            ))}
          </div>
        ))}

      </div>

      {/* BOTTOM PAGINATOR CONTROLS */}
      {totalPagesCount > 1 && (
        <div className="border-t-2 border-black pt-3 mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-gray-50 p-2 font-sans">
          <div className="text-xs font-bold text-gray-800">
            Halaman {currentPageData.pageNumber} / {totalPagesCount}
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={activePageIndex === 0}
              onClick={() => {
                setActivePageIndex((prev) => Math.max(0, prev - 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-black text-white font-black text-xs uppercase disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center gap-1 border border-black"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Halaman Sebelumnya
            </button>

            <div className="flex items-center gap-1">
              {pages.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePageIndex(idx);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className={`w-7 h-7 font-mono text-xs font-bold border ${
                    activePageIndex === idx
                      ? 'bg-black text-yellow-300 border-black'
                      : 'bg-white text-black border-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            <button
              disabled={activePageIndex >= totalPagesCount - 1}
              onClick={() => {
                setActivePageIndex((prev) => Math.min(totalPagesCount - 1, prev + 1));
                window.scrollTo({ top: 400, behavior: 'smooth' });
              }}
              className="px-3 py-1.5 bg-black text-white font-black text-xs uppercase disabled:opacity-30 hover:bg-gray-800 transition-colors flex items-center gap-1 border border-black"
            >
              Halaman Berikutnya
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
